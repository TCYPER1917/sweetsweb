import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "حلويات أبو بشار | Abu Bashar Sweets",
  description:
    "حلويات شرقية وغربية أصيلة، محضرة يومياً بأجود المكونات. كنافة، بقلاوة، هريسة، ومشروبات ساخنة.",
  keywords: "حلويات, كنافة, بقلاوة, هريسة, حلويات شرقية, أبو بشار",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} antialiased`}>
      <body className="min-h-full flex flex-col font-[var(--font-cairo)]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
