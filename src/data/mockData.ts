export interface MockUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "farmer" | "consumer" | "buyer" | "admin";
  avatar: string;
  location: string;
  state: string;
  farmName?: string;
  rating?: number;
  isVerified?: boolean;
}

export interface MockProduct {
  id: string;
  name: string;
  category: "vegetables" | "fruits" | "grains" | "dairy" | "spices" | "pulses";
  description: string;
  images: string[];
  pricePerUnit: number;
  unit: string;
  availableQty: number;
  minOrderQty: number;
  harvestDate: string;
  isOrganic: boolean;
  farmerId: string;
  farmerName: string;
  farmerLocation: string;
  rating: number;
  mandiBenchmarkPrice: number;
  aiSuggestedPrice: number;
}

export interface MockMandiPrice {
  id: string;
  crop: string;
  category: string;
  mandi: string;
  state: string;
  modalPrice: number;
  unit: string;
  change: string;
  trend: "up" | "down" | "stable";
}

export const MOCK_USERS: MockUser[] = [
  {
    id: "user-farmer-1",
    name: "Ramesh Patel",
    email: "farmer@farmconnect.in",
    phone: "+91 98765 43210",
    role: "farmer",
    avatar: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80",
    location: "Nashik, Maharashtra",
    state: "Maharashtra",
    farmName: "Sahyadri Agro Organic Farms",
    rating: 4.9,
    isVerified: true,
  },
  {
    id: "user-farmer-2",
    name: "Harpreet Singh",
    email: "harpreet@farmconnect.in",
    phone: "+91 98123 45678",
    role: "farmer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
    location: "Ludhiana, Punjab",
    state: "Punjab",
    farmName: "Green Harvest Punjab FPO",
    rating: 4.8,
    isVerified: true,
  },
  {
    id: "user-consumer-1",
    name: "Priya Sharma",
    email: "consumer@farmconnect.in",
    phone: "+91 91234 56789",
    role: "consumer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80",
    location: "Koramangala, Bengaluru",
    state: "Karnataka",
  },
  {
    id: "user-buyer-1",
    name: "Rajesh Mittal (FreshBite Foods)",
    email: "buyer@farmconnect.in",
    phone: "+91 99887 76655",
    role: "buyer",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
    location: "Andheri East, Mumbai",
    state: "Maharashtra",
  },
  {
    id: "user-admin-1",
    name: "FarmConnect Operations",
    email: "admin@farmconnect.in",
    phone: "+91 1800 123 456",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80",
    location: "National Agri Hub, New Delhi",
    state: "Delhi",
  },
];

export const MOCK_PRODUCTS: MockProduct[] = [
  {
    id: "prod-1",
    name: "Farm-Fresh Red Onions (Garwa)",
    category: "vegetables",
    description: "Naturally cured, Grade-A Nashik red onions. Excellent storage shelf life, pungent flavour, harvested directly from Sahyadri valley.",
    images: [
      "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1508747703725-719777637510?w=600&auto=format&fit=crop&q=80",
    ],
    pricePerUnit: 28,
    unit: "kg",
    availableQty: 4500,
    minOrderQty: 5,
    harvestDate: "2026-09-04",
    isOrganic: true,
    farmerId: "user-farmer-1",
    farmerName: "Ramesh Patel",
    farmerLocation: "Nashik, Maharashtra",
    rating: 4.9,
    mandiBenchmarkPrice: 24,
    aiSuggestedPrice: 28,
  },
  {
    id: "prod-2",
    name: "Golden Sharbati Wheat (Unpolished)",
    category: "grains",
    description: "Premium sun-dried Sharbati whole grain wheat from fertile Punjab plains. Rich in fibre and natural wheat aroma.",
    images: [
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=80",
    ],
    pricePerUnit: 42,
    unit: "kg",
    availableQty: 8000,
    minOrderQty: 20,
    harvestDate: "2026-08-20",
    isOrganic: true,
    farmerId: "user-farmer-2",
    farmerName: "Harpreet Singh",
    farmerLocation: "Ludhiana, Punjab",
    rating: 4.95,
    mandiBenchmarkPrice: 38,
    aiSuggestedPrice: 42,
  },
  {
    id: "prod-3",
    name: "Vine-Ripened Desi Tomatoes",
    category: "vegetables",
    description: "Juicy, naturally ripened desi hybrid tomatoes. High lycopene, no artificial carbide ripening, picked at peak freshness.",
    images: [
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80",
    ],
    pricePerUnit: 34,
    unit: "kg",
    availableQty: 1200,
    minOrderQty: 2,
    harvestDate: "2026-09-09",
    isOrganic: false,
    farmerId: "user-farmer-1",
    farmerName: "Ramesh Patel",
    farmerLocation: "Nashik, Maharashtra",
    rating: 4.75,
    mandiBenchmarkPrice: 30,
    aiSuggestedPrice: 35,
  },
  {
    id: "prod-4",
    name: "Traditional Basmati Rice (Aged 2 Yrs)",
    category: "grains",
    description: "Extra-long grain authentic Himalayan foothills Basmati rice. Aged to perfection for exquisite fragrance and fluffiness.",
    images: [
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80",
    ],
    pricePerUnit: 115,
    unit: "kg",
    availableQty: 3200,
    minOrderQty: 5,
    harvestDate: "2026-06-15",
    isOrganic: true,
    farmerId: "user-farmer-2",
    farmerName: "Harpreet Singh",
    farmerLocation: "Ludhiana, Punjab",
    rating: 4.9,
    mandiBenchmarkPrice: 105,
    aiSuggestedPrice: 118,
  },
  {
    id: "prod-5",
    name: "Organic Guntur Dry Red Chillies (Teja)",
    category: "spices",
    description: "Fiery hot, authentic sun-dried Guntur Teja chillies. Vibrant natural deep red hue with rich pungent capsaicin content.",
    images: [
      "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=600&auto=format&fit=crop&q=80",
    ],
    pricePerUnit: 240,
    unit: "kg",
    availableQty: 850,
    minOrderQty: 1,
    harvestDate: "2026-08-30",
    isOrganic: true,
    farmerId: "user-farmer-1",
    farmerName: "Ramesh Patel",
    farmerLocation: "Nashik, Maharashtra",
    rating: 4.88,
    mandiBenchmarkPrice: 220,
    aiSuggestedPrice: 245,
  },
  {
    id: "prod-6",
    name: "A2 Gir Cow Desi Bilona Ghee",
    category: "dairy",
    description: "Handcrafted using traditional Vedic curd-churning method. Made from grass-fed Gir cows, free from preservatives.",
    images: [
      "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=600&auto=format&fit=crop&q=80",
    ],
    pricePerUnit: 1450,
    unit: "litre",
    availableQty: 120,
    minOrderQty: 1,
    harvestDate: "2026-09-08",
    isOrganic: true,
    farmerId: "user-farmer-2",
    farmerName: "Harpreet Singh",
    farmerLocation: "Ludhiana, Punjab",
    rating: 5.0,
    mandiBenchmarkPrice: 1350,
    aiSuggestedPrice: 1450,
  },
];

export const MOCK_MANDI_PRICES: MockMandiPrice[] = [
  {
    id: "m-1",
    crop: "Onion (Nashik Red)",
    category: "Vegetables",
    mandi: "Lasalgaon Mandi",
    state: "Maharashtra",
    modalPrice: 2400,
    unit: "quintal",
    change: "+4.2%",
    trend: "up",
  },
  {
    id: "m-2",
    crop: "Wheat (Sharbati)",
    category: "Grains",
    mandi: "Khanna Grain Market",
    state: "Punjab",
    modalPrice: 2850,
    unit: "quintal",
    change: "+1.5%",
    trend: "up",
  },
  {
    id: "m-3",
    crop: "Tomato (Hybrid)",
    category: "Vegetables",
    mandi: "Azadpur Mandi",
    state: "Delhi",
    modalPrice: 2900,
    unit: "quintal",
    change: "-2.1%",
    trend: "down",
  },
  {
    id: "m-4",
    crop: "Basmati Paddy (1121)",
    category: "Grains",
    mandi: "Karnal Mandi",
    state: "Haryana",
    modalPrice: 3800,
    unit: "quintal",
    change: "0.0%",
    trend: "stable",
  },
  {
    id: "m-5",
    crop: "Red Chilli (Teja)",
    category: "Spices",
    mandi: "Guntur Market Yard",
    state: "Andhra Pradesh",
    modalPrice: 18500,
    unit: "quintal",
    change: "+5.6%",
    trend: "up",
  },
];
