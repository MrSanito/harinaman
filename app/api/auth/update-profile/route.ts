import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyJWT, signJWT } from "@/lib/jwt";

export async function POST(request: NextRequest) {
  try {
    const sessionCookie = request.cookies.get("session")?.value;

    if (!sessionCookie) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const sessionData = await verifyJWT(sessionCookie);
    if (!sessionData) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { name, number, address } = await request.json();

    if (!number) {
      return NextResponse.json(
        { success: false, error: "Phone number is required" },
        { status: 400 }
      );
    }

    // Check if phone number is already in use by another user
    const existingUser = await prisma.user.findFirst({
      where: {
        number,
        NOT: {
          id: sessionData.id as string,
        },
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, error: "Phone number is already in use" },
        { status: 400 }
      );
    }

    // Update user in database
    const updatedUser = await prisma.user.update({
      where: { id: sessionData.id as string },
      data: {
        name,
        number,
        address,
      },
    });

    // Create new session payload
    const newSessionData = {
      id: updatedUser.id,
      email: updatedUser.email,
      name: updatedUser.name,
      role: updatedUser.role,
      number: updatedUser.number,
      address: updatedUser.address,
    };

    const token = await signJWT(newSessionData);

    const response = NextResponse.json({
      success: true,
      user: newSessionData,
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
    console.error("Update profile API error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
