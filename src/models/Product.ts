import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProduct extends Document {
  farmerId: mongoose.Types.ObjectId;
  farmerName?: string;
  farmerLocation?: string;
  name: string;
  category: "vegetables" | "fruits" | "grains" | "dairy" | "spices" | "pulses";
  description: string;
  images: string[];
  pricePerUnit: number;
  unit: "kg" | "quintal" | "dozen" | "litre" | "packet";
  availableQty: number;
  minOrderQty: number;
  harvestDate: Date;
  isOrganic: boolean;
  certifications?: string[];
  location: {
    state: string;
    district?: string;
    pincode?: string;
  };
  status: "active" | "soldout" | "draft";
  rating: number;
  mandiBenchmarkPrice?: number;
  aiSuggestedPrice?: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    farmerId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    farmerName: { type: String },
    farmerLocation: { type: String },
    name: { type: String, required: true, index: true },
    category: {
      type: String,
      enum: ["vegetables", "fruits", "grains", "dairy", "spices", "pulses"],
      required: true,
      index: true,
    },
    description: { type: String, required: true },
    images: [{ type: String, required: true }],
    pricePerUnit: { type: Number, required: true },
    unit: {
      type: String,
      enum: ["kg", "quintal", "dozen", "litre", "packet"],
      default: "kg",
    },
    availableQty: { type: Number, required: true },
    minOrderQty: { type: Number, default: 1 },
    harvestDate: { type: Date, default: Date.now },
    isOrganic: { type: Boolean, default: false },
    certifications: [String],
    location: {
      state: { type: String, required: true },
      district: { type: String },
      pincode: { type: String },
    },
    status: {
      type: String,
      enum: ["active", "soldout", "draft"],
      default: "active",
      index: true,
    },
    rating: { type: Number, default: 4.9 },
    mandiBenchmarkPrice: { type: Number },
    aiSuggestedPrice: { type: Number },
  },
  { timestamps: true }
);

export const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
