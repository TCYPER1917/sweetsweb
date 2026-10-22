import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getShopInfo } from "@/lib/shop";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const shop = await getShopInfo();
  return {
    title: shop.metaTitle || shop.name,
    description: shop.metaDescription,
    keywords: [shop.name, ...shop.categories, "حلويات", "كنافة", "بقلاوة"].join(", "),
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const shop = await getShopInfo();

  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} antialiased`}>
      <body className="min-h-full flex flex-col font-[var(--font-cairo)]">
        {shop.announcement && (
          <div
            className={`text-center text-xs sm:text-sm font-bold px-4 py-2 ${
              shop.is_open
                ? "bg-gradient-to-l from-[#D4AF37] to-[#F4E5A1] text-[#29060B]"
                : "bg-red-700 text-white"
            }`}
          >
            {shop.announcement}
            {!shop.is_open && <span className="mr-2">— المحل مغلق حالياً</span>}
          </div>
        )}
        <Header name={shop.name} phone={shop.phone1} />
        <main className="flex-1">{children}</main>
        <Footer shop={shop} />
      </body>
    </html>
  );
}
