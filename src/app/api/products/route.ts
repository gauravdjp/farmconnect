import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Product } from "@/models/Product";
import { MOCK_PRODUCTS } from "@/data/mockData";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const organic = searchParams.get("organic");

    const db = await connectDB();

    if (!db) {
      let filtered = [...MOCK_PRODUCTS];
      if (category && category !== "all") {
        filtered = filtered.filter((p) => p.category === category);
      }
      if (organic === "true") {
        filtered = filtered.filter((p) => p.isOrganic);
      }
      if (search) {
        const query = search.toLowerCase();
        filtered = filtered.filter(
          (p) =>
            p.name.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query) ||
            p.farmerName.toLowerCase().includes(query)
        );
      }
      return NextResponse.json({ products: filtered, total: filtered.length });
    }

    const query: any = { status: "active" };
    if (category && category !== "all") {
      query.category = category;
    }
    if (organic === "true") {
      query.isOrganic = true;
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { farmerName: { $regex: search, $options: "i" } },
      ];
    }

    const products = await Product.find(query).sort({ createdAt: -1 });

    // Fallback to mock data if MongoDB is empty
    if (products.length === 0 && !category && !search) {
      return NextResponse.json({ products: MOCK_PRODUCTS, total: MOCK_PRODUCTS.length });
    }

    return NextResponse.json({ products, total: products.length });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("farmconnect_token")?.value;
    const user = token ? verifyToken(token) : null;

    if (!user || (user.role !== "farmer" && user.role !== "admin")) {
      return NextResponse.json(
        { error: "Unauthorized. Farmer role required." },
        { status: 403 }
      );
    }

    const body = await req.json();
    const db = await connectDB();

    if (!db) {
      const newProduct = {
        id: "prod-" + Date.now(),
        ...body,
        farmerId: user.id,
        farmerName: user.name,
      };
      return NextResponse.json({ product: newProduct, message: "Product listed (Demo mode)" }, { status: 201 });
    }

    const product = await Product.create({
      ...body,
      farmerId: user.id,
      farmerName: user.name,
    });

    return NextResponse.json({ product, message: "Product listed successfully" }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to create product" },
      { status: 500 }
    );
  }
}
