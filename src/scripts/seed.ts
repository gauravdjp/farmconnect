import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { User } from "../models/User";
import { Product } from "../models/Product";
import { MandiPrice } from "../models/MandiPrice";
import { MOCK_PRODUCTS, MOCK_MANDI_PRICES } from "../data/mockData";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/farmconnect";

async function seed() {
  console.log("Connecting to MongoDB for seeding...");
  await mongoose.connect(MONGODB_URI);
  console.log("Connected successfully.");

  // Clear existing collections
  await User.deleteMany({});
  await Product.deleteMany({});
  await MandiPrice.deleteMany({});

  console.log("Cleared existing data.");

  // Create Users
  const hashedPassword = await bcrypt.hash("farmer123", 10);
  const consumerPassword = await bcrypt.hash("consumer123", 10);
  const buyerPassword = await bcrypt.hash("buyer123", 10);
  const adminPassword = await bcrypt.hash("admin123", 10);

  const farmer1 = await User.create({
    name: "Ramesh Patel",
    email: "farmer@farmconnect.in",
    password: hashedPassword,
    phone: "+91 98765 43210",
    role: "farmer",
    avatar: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80",
    farmDetails: {
      farmName: "Sahyadri Agro Organic Farms",
      locationName: "Dindori Road, Nashik",
      state: "Maharashtra",
      district: "Nashik",
      sizeInAcres: 14,
      primaryCrops: ["Onion", "Tomato", "Grapes", "Pomegranate"],
      isFpo: true,
      fpoName: "Godavari Valley Farmers Producer Co.",
    },
    rating: 4.9,
    isVerified: true,
  });

  const farmer2 = await User.create({
    name: "Harpreet Singh",
    email: "harpreet@farmconnect.in",
    password: hashedPassword,
    phone: "+91 98123 45678",
    role: "farmer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
    farmDetails: {
      farmName: "Green Harvest Punjab FPO",
      locationName: "Samrala, Ludhiana",
      state: "Punjab",
      district: "Ludhiana",
      sizeInAcres: 28,
      primaryCrops: ["Sharbati Wheat", "Basmati Paddy", "Mustard"],
      isFpo: true,
      fpoName: "Malwa Agri Collective FPO",
    },
    rating: 4.8,
    isVerified: true,
  });

  await User.create({
    name: "Priya Sharma",
    email: "consumer@farmconnect.in",
    password: consumerPassword,
    phone: "+91 91234 56789",
    role: "consumer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80",
  });

  await User.create({
    name: "Rajesh Mittal (FreshBite Foods)",
    email: "buyer@farmconnect.in",
    password: buyerPassword,
    phone: "+91 99887 76655",
    role: "buyer",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
    businessDetails: {
      companyName: "FreshBite Cloud Kitchens & Retail Pvt Ltd",
      gstNumber: "27AABCF1234F1Z9",
      businessType: "Food Processing / Restaurant Chain",
    },
  });

  await User.create({
    name: "FarmConnect Operations Admin",
    email: "admin@farmconnect.in",
    password: adminPassword,
    phone: "+91 1800 123 456",
    role: "admin",
  });

  console.log("Demo users created for all roles.");

  // Create Products
  for (let i = 0; i < MOCK_PRODUCTS.length; i++) {
    const p = MOCK_PRODUCTS[i];
    const farmer = i % 2 === 0 ? farmer1 : farmer2;

    await Product.create({
      farmerId: farmer._id,
      farmerName: farmer.name,
      farmerLocation: farmer.farmDetails?.locationName || "Maharashtra",
      name: p.name,
      category: p.category,
      description: p.description,
      images: p.images,
      pricePerUnit: p.pricePerUnit,
      unit: p.unit,
      availableQty: p.availableQty,
      minOrderQty: p.minOrderQty,
      harvestDate: new Date(p.harvestDate),
      isOrganic: p.isOrganic,
      location: {
        state: farmer.farmDetails?.state || "Maharashtra",
        district: farmer.farmDetails?.district || "Nashik",
      },
      status: "active",
      rating: p.rating,
      mandiBenchmarkPrice: p.mandiBenchmarkPrice,
      aiSuggestedPrice: p.aiSuggestedPrice,
    });
  }
  console.log(`Created ${MOCK_PRODUCTS.length} produce listings.`);

  // Create Mandi Prices
  for (const m of MOCK_MANDI_PRICES) {
    await MandiPrice.create({
      crop: m.crop,
      category: m.category,
      mandi: m.mandi,
      district: m.mandi.split(" ")[0],
      state: m.state,
      minPrice: Math.round(m.modalPrice * 0.9),
      maxPrice: Math.round(m.modalPrice * 1.1),
      modalPrice: m.modalPrice,
      unit: m.unit,
      trend: m.trend,
    });
  }
  console.log(`Created ${MOCK_MANDI_PRICES.length} live mandi benchmark price records.`);

  console.log("Database seeded successfully!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
