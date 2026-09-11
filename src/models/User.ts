import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  phone: string;
  role: "farmer" | "consumer" | "buyer" | "admin";
  avatar?: string;
  farmDetails?: {
    farmName?: string;
    locationName?: string;
    state?: string;
    district?: string;
    sizeInAcres?: number;
    primaryCrops?: string[];
    isFpo?: boolean;
    fpoName?: string;
  };
  businessDetails?: {
    companyName?: string;
    gstNumber?: string;
    businessType?: string;
  };
  bankDetails?: {
    accountNumber?: string;
    ifscCode?: string;
    upiId?: string;
  };
  kyc?: {
    aadhaarNumber?: string;
    panNumber?: string;
    isVerified?: boolean;
  };
  rating?: number;
  isVerified?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, select: false },
    phone: { type: String, required: true },
    role: {
      type: String,
      enum: ["farmer", "consumer", "buyer", "admin"],
      default: "consumer",
      required: true,
      index: true,
    },
    avatar: { type: String },
    farmDetails: {
      farmName: String,
      locationName: String,
      state: String,
      district: String,
      sizeInAcres: Number,
      primaryCrops: [String],
      isFpo: { type: Boolean, default: false },
      fpoName: String,
    },
    businessDetails: {
      companyName: String,
      gstNumber: String,
      businessType: String,
    },
    bankDetails: {
      accountNumber: String,
      ifscCode: String,
      upiId: String,
    },
    kyc: {
      aadhaarNumber: String,
      panNumber: String,
      isVerified: { type: Boolean, default: false },
    },
    rating: { type: Number, default: 4.8 },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
