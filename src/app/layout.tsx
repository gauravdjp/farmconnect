import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";

export const metadata: Metadata = {
  title: "MetroSense OIML R-76 — Legal Metrology Test Report System",
  description:
    "Software Application for Generation of Test Reports for Non-Automatic Weighing Instruments (NAWI) as per OIML Recommendation R-76. Ministry of Consumer Affairs, Food & Public Distribution, Department of Consumer Affairs (DoCA).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground antialiased font-sans">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
