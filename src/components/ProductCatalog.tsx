"use client";

import { useState, useMemo, useEffect } from "react";
import { MessageCircle, Search, Sparkles, Filter, Check, AlertCircle } from "lucide-react";
import { Product } from "@/types";

interface ProductCatalogProps {
  initialProducts?: Product[];
}

const CATEGORIES = [
  { id: "all", label: "جميع الأصناف" },
  { id: "كنافة", label: "كنافة وكلاج" },
  { id: "حلويات شرقية", label: "حلويات شرقية" },
  { id: "مشروبات ساخنة", label: "مشروبات ساخنة" },
];

export default function ProductCatalog({ initialProducts = [] }: ProductCatalogProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Fetch updated products from API on mount
  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch("/api/products");
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setProducts(data);
          }
        }
      } catch (err) {
        console.error("Error fetching live products:", err);
      }
    }
    loadProducts();
  }, []);

  // Filter products by category and search query
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  // Generate WhatsApp prefilled message
  const getWhatsAppLink = (product: Product) => {
    const message = `مرحباً حلويات أبو بشار، أرغب بطلب:\n- الصنف: ${product.name}\n- السعر: ${product.price} ${product.unit || "شيكل"}\n- الرجاء تزويدي بالتفاصيل والتوصيل.`;
    return `https://wa.me/972569553350?text=${encodeURIComponent(message)}`;
  };

  return (
    <section id="catalog" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#4A0E17]/10 text-[#4A0E17] px-4 py-1.5 rounded-full text-xs font-bold border border-[#4A0E17]/20">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>قائمة الأصناف الطازجة</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#29060B]">
            اختر ما تشتهيه من أطيب الحلويات
          </h2>

          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            جميع أصنافنا تُحضر يومياً بأفخر أنواع السمن البلدي والمكسرات الطازجة والجبنة البلدية. اضغط على أي صنف للطلب السريع عبر واتساب.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 bg-[#FAF7F2] p-4 rounded-2xl border border-[#D4AF37]/20 shadow-sm">
          {/* Categories Buttons */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    active
                      ? "bg-[#4A0E17] text-[#F4E5A1] shadow-md border border-[#D4AF37]"
                      : "bg-white text-gray-700 hover:bg-[#FAF7F2] border border-gray-200"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن صنفك المفضل..."
              className="w-full pr-10 pl-4 py-2 text-xs sm:text-sm bg-white rounded-xl border border-gray-200 focus:outline-none focus:border-[#4A0E17] focus:ring-1 focus:ring-[#4A0E17] transition-all text-gray-800 placeholder-gray-400"
            />
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-[#FAF7F2] rounded-3xl border border-dashed border-[#D4AF37]/40 max-w-md mx-auto">
            <AlertCircle className="w-12 h-12 text-[#D4AF37] mx-auto mb-3" />
            <h3 className="text-lg font-bold text-gray-800">لا توجد نتائج مطابقة</h3>
            <p className="text-xs text-gray-500 mt-1">
              جرب تغيير عبارة البحث أو اختيار تصنيف آخر.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const isAvailable = product.is_available !== false;
              return (
                <div
                  key={product.id}
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-[#D4AF37]/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Image Container */}
                  <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-gradient-to-br from-[#FAF7F2] to-gray-100">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        // Fallback image if broken
                        (e.target as HTMLImageElement).src =
                          "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=600&q=80";
                      }}
                    />

                    {/* Category Tag */}
                    <div className="absolute top-3 right-3 bg-[#4A0E17]/90 backdrop-blur-md text-[#F4E5A1] text-[11px] font-bold px-2.5 py-1 rounded-full border border-[#D4AF37]/30">
                      {product.category}
                    </div>

                    {/* Availability Tag */}
                    {!isAvailable && (
                      <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center">
                        <span className="bg-red-600 text-white font-bold text-xs px-3 py-1.5 rounded-full shadow">
                          نفذت الكمية حالياً
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-bold text-base text-[#29060B] group-hover:text-[#4A0E17] transition-colors">
                          {product.name}
                        </h3>
                      </div>
                      <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    {/* Price & Action */}
                    <div className="pt-2 border-t border-gray-100 flex items-center justify-between gap-2">
                      <div>
                        <span className="text-xs text-gray-400 block">السعر</span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-lg font-black text-[#4A0E17]">
                            {product.price}
                          </span>
                          <span className="text-xs font-semibold text-gray-600">
                            {product.unit || "₪"}
                          </span>
                        </div>
                      </div>

                      {/* WhatsApp Order Button */}
                      <a
                        href={isAvailable ? getWhatsAppLink(product) : undefined}
                        target={isAvailable ? "_blank" : undefined}
                        rel={isAvailable ? "noopener noreferrer" : undefined}
                        className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                          isAvailable
                            ? "bg-[#25D366] hover:bg-[#1fa952] text-white shadow hover:shadow-md hover:scale-102"
                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                        }`}
                        title={isAvailable ? "اطلب عبر الواتساب" : "غير متوفر حالياً"}
                      >
                        <MessageCircle className="w-3.5 h-3.5 fill-current" />
                        <span>اطلب الآن</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
