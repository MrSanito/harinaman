import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyJWT } from "@/lib/jwt";

export async function POST(request: NextRequest) {
  const sessionCookie = request.cookies.get("session")?.value;

  if (!sessionCookie) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const sessionData = await verifyJWT(sessionCookie);

    // Verify Admin role
    if (!sessionData || sessionData.role !== "Admin") {
      return NextResponse.json({ error: "Forbidden: Admin access required" }, { status: 403 });
    }

    const { id, nameEn, nameGu, categoryId, svgType, imageUrl, prices } = await request.json();

    if (!id || !nameEn || !nameGu || !categoryId || !prices) {
      return NextResponse.json({ error: "Missing required product parameters" }, { status: 400 });
    }

    // Verify the category exists
    const category = await prisma.category.findUnique({
      where: { id: categoryId }
    });
    if (!category) {
      return NextResponse.json({ error: "Invalid categoryId" }, { status: 400 });
    }

    // Update the product record in PostgreSQL
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        nameEn,
        nameGu,
        categoryId,
        svgType,
        imageUrl: imageUrl || null,
        prices,
      },
    });

    return NextResponse.json({ success: true, product: updatedProduct });
  } catch (error: any) {
    console.error("Error updating product:", error);
    return NextResponse.json({ error: "Failed to update product details" }, { status: 500 });
  }
}
