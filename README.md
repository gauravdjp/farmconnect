# 🌾 FarmConnect — Direct Farmer-to-Consumer Digital Marketplace

A comprehensive full-stack platform that eliminates intermediaries in the agricultural supply chain by connecting farmers & FPOs directly with consumers and bulk buyers, backed by AI demand forecasting and smart logistics.

Built for **Smart India Hackathon (SIH)** and national agrarian supply chain transformation.

---

## 🚀 Key Features

* **🌾 Farmer & FPO Dashboard**: List harvests with AI-assisted fair pricing, track orders, monitor live APMC mandi parity rates, and track escrow settlements.
* **🛒 Consumer Marketplace**: Direct-from-farm produce catalog with category filters, organic certificates, farmer traceability, and door-step delivery slots.
* **📦 Bulk Buyer & HORECA Portal**: High-volume procurement (quintals/tonnes), Request for Quotes (RFQ) price bidding, and automated GST invoices.
* **🚚 AI Route Logistics**: Vehicle Routing Problem (VRP) algorithms to bundle orders and reduce perishable transit miles by 30%+.
* **🛡️ Secure Escrow Settlement**: Consumer payments are held in escrow and released to farmers immediately upon delivery OTP verification.
* **🤖 Python AI Microservice**: Demand forecasting, dynamic pricing suggestions, and delivery route optimization with FastAPI.

---

## 🛠️ Tech Stack

* **Frontend**: Next.js 14 (App Router), React 18, Tailwind CSS, Lucide React
* **Backend**: Next.js Route Handlers (REST API), Mongoose (MongoDB)
* **Auth**: Multi-role JWT session management & role-based middleware
* **AI / ML**: Python 3.13, FastAPI, NumPy, Pandas, Scikit-Learn
* **Payment Flow**: Razorpay UPI test mode / FarmConnect Escrow

---

## ⚡ Quick Start

### 1. Run the Web Application

```bash
# In the project root:
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

### 2. Instant Demo Credentials (Pre-configured)

You can use the **Demo Switcher** in the top navigation bar or log in directly via `/auth/login`:

| Role | Demo Email | Password | Primary Feature |
|---|---|---|---|
| **🌾 Farmer** | `farmer@farmconnect.in` | `farmer123` | Producer dashboard, produce listing, AI price suggestions |
| **🛒 Consumer** | `consumer@farmconnect.in` | `consumer123` | Marketplace browsing, shopping cart, live order tracking |
| **📦 Bulk Buyer** | `buyer@farmconnect.in` | `buyer123` | B2B volume procurement, RFQ bidding, GST invoices |
| **🔧 Admin** | `admin@farmconnect.in` | `admin123` | Farmer KYC verification, GMV tracking, regional hubs |

---

### 3. Database Seeding (Optional with MongoDB)

To populate a local MongoDB or MongoDB Atlas instance with realistic Indian agricultural sample data:

```bash
npm run seed
```

*Note: If MongoDB is not running locally, FarmConnect automatically runs in resilient **Demo Mode** using comprehensive mock data so presentations and evaluations never fail.*

---

### 4. Running the Python AI Microservice (Optional)

```bash
cd ai-service
pip install -r requirements.txt
python main.py
```

The AI service runs at [http://localhost:8000](http://localhost:8000) with interactive Swagger documentation at [http://localhost:8000/docs](http://localhost:8000/docs).
