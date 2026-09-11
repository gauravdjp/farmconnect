import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { MandiPrice } from "@/models/MandiPrice";
import { MOCK_MANDI_PRICES } from "@/data/mockData";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const state = searchParams.get("state");

    const db = await connectDB();

    if (!db) {
      let prices = [...MOCK_MANDI_PRICES];
      if (state) {
        prices = prices.filter((p) => p.state.toLowerCase() === state.toLowerCase());
      }
      return NextResponse.json({ prices });
    }

    const query: any = {};
    if (state) {
      query.state = { $regex: state, $options: "i" };
    }

    const prices = await MandiPrice.find(query).sort({ modalPrice: -1 });

    if (prices.length === 0) {
      return NextResponse.json({ prices: MOCK_MANDI_PRICES });
    }

    return NextResponse.json({ prices });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch mandi prices" },
      { status: 500 }
    );
  }
}
