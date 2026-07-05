import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyJWT } from "@/lib/jwt";

export async function GET(request: NextRequest) {
  const sessionCookie = request.cookies.get("session")?.value;

  if (!sessionCookie) {
    return NextResponse.json({ user: null });
  }

  try {
    const sessionData = await verifyJWT(sessionCookie);
    
    if (!sessionData) {
      return NextResponse.json({ user: null });
    }
    
    // Fetch the fresh user details from the database
    const user = await prisma.user.findUnique({
      where: { id: sessionData.id as string },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        number: true,
        address: true,
      },
    });

    if (!user) {
      return NextResponse.json({ user: null });
    }

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ user: null });
  }
}
