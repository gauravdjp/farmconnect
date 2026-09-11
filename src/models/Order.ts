import mongoose, { Schema, Document, Model } from "mongoose";

export interface IOrderItem {
  productId: mongoose.Types.ObjectId;
  productName: string;
  farmerId: mongoose.Types.ObjectId;
  quantity: number;
  unit: string;
  pricePerUnit: number;
  subtotal: number;
}

export interface IOrder extends Document {
  orderNumber: string;
  buyerId: mongoose.Types.ObjectId;
  buyerName: string;
  buyerPhone: string;
  items: IOrderItem[];
  totalAmount: number;
  deliveryFee: number;
  platformFee: number;
  status: "pending" | "confirmed" | "picked" | "intransit" | "delivered" | "cancelled";
  paymentStatus: "pending" | "escrow_held" | "settled_to_farmer" | "refunded";
  paymentMethod: "razorpay_upi" | "cash_on_delivery" | "bank_transfer";
  paymentId?: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  deliverySlot?: {
    date: Date;
    timeWindow: string;
  };
  trackingNumber?: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema<IOrderItem>({
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  productName: { type: String, required: true },
  farmerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, default: "kg" },
  pricePerUnit: { type: Number, required: true },
  subtotal: { type: Number, required: true },
});

const OrderSchema = new Schema<IOrder>(
  {
    orderNumber: { type: String, required: true, unique: true, index: true },
    buyerId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    buyerName: { type: String, required: true },
    buyerPhone: { type: String, required: true },
    items: [OrderItemSchema],
    totalAmount: { type: Number, required: true },
    deliveryFee: { type: Number, default: 40 },
    platformFee: { type: Number, default: 10 },
    status: {
      type: String,
      enum: ["pending", "confirmed", "picked", "intransit", "delivered", "cancelled"],
      default: "pending",
      index: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "escrow_held", "settled_to_farmer", "refunded"],
      default: "escrow_held",
    },
    paymentMethod: {
      type: String,
      enum: ["razorpay_upi", "cash_on_delivery", "bank_transfer"],
      default: "razorpay_upi",
    },
    paymentId: { type: String },
    shippingAddress: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
    },
    deliverySlot: {
      date: Date,
      timeWindow: String,
    },
    trackingNumber: String,
  },
  { timestamps: true }
);

export const Order: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);

export default Order;
