import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const products = await prisma.product.findMany({
      orderBy: { id: "asc" }
    });

    const formattedProducts = products.map((prod) => {
      return {
        id: prod.id,
        nameEn: prod.nameEn,
        nameGu: prod.nameGu,
        category: prod.categoryId, // backward compatibility
        svgType: prod.svgType,
        imageUrl: prod.imageUrl || undefined,
        prices: prod.prices || {},
      };
    });

    return NextResponse.json({ products: formattedProducts });
  } catch (error: any) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
