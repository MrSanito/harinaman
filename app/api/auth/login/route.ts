import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { signJWT } from "@/lib/jwt";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required" },
        { status: 400 }
      )
    }

    // Try to find the user in the database
    let user = await prisma.user.findFirst({
      where: { email: email.toLowerCase() },
    });

    // Auto-create a default admin user on the fly if it doesn't exist yet, for easy testing
    if (!user && email.toLowerCase() === "admin@example.com") {
      const hashedPassword = await bcrypt.hash(password, 10);
      user = await prisma.user.create({
        data: {
          email: "admin@example.com",
          name: "Admin User",
          number: "1234567890",
          role: "Admin",
          password: hashedPassword,
        },
      });
    }

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json(
        { success: false, error: "Invalid email or password" },
        { status: 401 }
      )
    }

    // Create session payload
    const sessionData = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      number: user.number,
      address: user.address,
    };

    const token = await signJWT(sessionData);

    // Serialize session and set HttpOnly cookie
    const response = NextResponse.json({
      success: true,
      user: sessionData,
    });

    response.cookies.set({
      name: "session",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return response;
  } catch (error) {
    console.error("Login API error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    )
  }
}
