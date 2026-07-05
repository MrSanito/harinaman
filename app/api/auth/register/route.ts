import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { signJWT } from "@/lib/jwt";

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, number, address } = await request.json();

    if (!email || !password || !number) {
      return NextResponse.json(
        { success: false, error: "Email, password, and phone number are required" },
        { status: 400 }
      );
    }

    // Normalizing email
    const cleanEmail = email.trim().toLowerCase();

    // Check if email already in use
    const existingEmail = await prisma.user.findFirst({
      where: { email: cleanEmail }
    });
    if (existingEmail) {
      return NextResponse.json(
        { success: false, error: "ઈમેલ પહેલેથી જ ઉપયોગમાં છે (Email is already in use)" },
        { status: 400 }
      );
    }

    // Check if phone number already in use
    const existingNumber = await prisma.user.findUnique({
      where: { number: number.trim() }
    });
    if (existingNumber) {
      return NextResponse.json(
        { success: false, error: "મોબાઇલ નંબર પહેલેથી જ ઉપયોગમાં છે (Phone number is already in use)" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new customer
    const user = await prisma.user.create({
      data: {
        email: cleanEmail,
        password: hashedPassword,
        name: name ? name.trim() : null,
        number: number.trim(),
        address: address ? address.trim() : null,
        role: "Customer" // Default role
      }
    });

    const sessionData = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      number: user.number,
      address: user.address
    };

    const token = await signJWT(sessionData);

    const response = NextResponse.json({
      success: true,
      user: sessionData
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
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
