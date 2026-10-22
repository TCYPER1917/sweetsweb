"use client";

import { CheckCircle2, Heart, Award, Sparkles, History } from "lucide-react";
import type { ShopInfo } from "@/types";

export default function About({ data }: { data: ShopInfo }) {
  const highlights = data.aboutHighlights;

  return (
    <section id="about" className="py-20 bg-[#FAF7F2] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#4A0E17]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src={data.aboutImage}
                  alt={data.aboutTitle}
                  className="w-full h-96 object-cover transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#29060B]/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 right-6 text-white">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#F4E5A1] block mb-1">
                    جودة لا تضاهى
                  </span>
                  <p className="text-xl font-bold">صنعت بحب وإتقان كل يوم</p>
                </div>
              </div>

              <div className="absolute -top-6 -left-4 sm:left-6 bg-gradient-to-br from-[#4A0E17] to-[#29060B] text-white p-4 rounded-2xl shadow-xl border border-[#D4AF37]/40 flex items-center gap-3">
                <div className="p-2.5 bg-[#D4AF37] text-[#29060B] rounded-xl font-black">
                  <History className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-2xl font-black text-[#F4E5A1]">
                    {data.aboutStatYear}
                  </span>
                  <span className="block text-xs text-white/80">{data.aboutStatLabel}</span>
                </div>
              </div>

              <div className="absolute -bottom-6 right-8 bg-white p-3.5 rounded-2xl shadow-lg border border-[#D4AF37]/30 flex items-center gap-3">
                <div className="p-2 bg-[#FAF7F2] text-[#4A0E17] rounded-xl">
                  <Heart className="w-5 h-5 fill-[#4A0E17]" />
                </div>
                <div>
                  <span className="block text-sm font-bold text-[#29060B]">
                    {data.aboutBadge}
                  </span>
                  <span className="block text-xs text-gray-500">{data.aboutBadgeSub}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 bg-[#4A0E17]/10 text-[#4A0E17] px-3.5 py-1.5 rounded-full text-xs font-bold border border-[#4A0E17]/20">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>قصتنا وشغفنا</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#29060B] leading-tight">
              {data.aboutTitle}
            </h2>

            <p className="text-gray-700 leading-relaxed text-base sm:text-lg">
              {data.aboutStory}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-gray-800">{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <div className="bg-gradient-to-r from-[#4A0E17] to-[#380A11] p-5 rounded-2xl text-white flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#D4AF37]/30">
                <div className="flex items-center gap-3 text-center sm:text-right">
                  <Award className="w-8 h-8 text-[#D4AF37] shrink-0 hidden sm:block" />
                  <div>
                    <p className="font-bold text-sm sm:text-base text-[#F4E5A1]">
                      جاهزون لتلبية مناسباتكم وحفلاتكم
                    </p>
                    <p className="text-xs text-white/70">صواني وضيافة خاصة للأفراح والاجتماعات</p>
                  </div>
                </div>
                <a
                  href={`tel:${data.phone1.replace(/-/g, "")}`}
                  className="bg-[#D4AF37] hover:bg-[#F4E5A1] text-[#29060B] font-bold px-5 py-2.5 rounded-full text-xs sm:text-sm transition-colors whitespace-nowrap shadow-md"
                >
                  احجز لمناسبتك الآن
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
