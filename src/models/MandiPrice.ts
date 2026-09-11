import mongoose, { Schema, Document, Model } from "mongoose";

export interface IMandiPrice extends Document {
  crop: string;
  category: string;
  mandi: string;
  district: string;
  state: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  unit: string;
  trend: "up" | "down" | "stable";
  date: Date;
}

const MandiPriceSchema = new Schema<IMandiPrice>(
  {
    crop: { type: String, required: true, index: true },
    category: { type: String, required: true },
    mandi: { type: String, required: true },
    district: { type: String, required: true },
    state: { type: String, required: true, index: true },
    minPrice: { type: Number, required: true },
    maxPrice: { type: Number, required: true },
    modalPrice: { type: Number, required: true },
    unit: { type: String, default: "quintal" },
    trend: { type: String, enum: ["up", "down", "stable"], default: "stable" },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const MandiPrice: Model<IMandiPrice> =
  mongoose.models.MandiPrice || mongoose.model<IMandiPrice>("MandiPrice", MandiPriceSchema);

export default MandiPrice;
