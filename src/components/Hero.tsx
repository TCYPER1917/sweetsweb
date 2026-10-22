"use client";

import { MessageCircle, ArrowLeft, Award, Clock, Sparkles } from "lucide-react";

export default function Hero({ data }: { data: any }) {
  const whatsappUrl =
    `https://wa.me/${data.whatsapp}?text=` +
    encodeURIComponent("مرحباً حلويات أبو بشار، أرغب بالاستفسار عن الطلب والتوصيل.");

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-gradient-to-b from-[#29060B] via-[#380A11] to-[#4A0E17] text-white"
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute top-1/4 -right-24 w-96 h-96 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-24 w-96 h-96 bg-[#811B29]/40 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Right column: Text content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-right">
            {/* Tag badge */}
            <div className="inline-flex items-center gap-2 bg-[#FAF7F2]/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-[#D4AF37]/30 text-xs sm:text-sm text-[#F4E5A1] font-medium shadow-inner">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>أصالة المذاق الشرقي منذ عام 2022</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              {data.heroTitle}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-white/80 max-w-2xl leading-relaxed mx-auto lg:mx-0">
              {data.heroSubtitle}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#20bd5a] hover:to-[#0f7a6d] text-white font-bold px-7 py-3.5 rounded-full shadow-lg hover:shadow-green-500/30 transition-all transform hover:-translate-y-0.5 text-base"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>اطلب الآن عبر واتساب</span>
              </a>

              <a
                href="#catalog"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-transparent hover:bg-white/10 text-[#F4E5A1] font-semibold px-7 py-3.5 rounded-full border border-[#D4AF37]/50 hover:border-[#D4AF37] transition-all text-base"
              >
                <span>استكشف القائمة</span>
                <ArrowLeft className="w-4 h-4" />
              </a>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-[#D4AF37]/20 max-w-lg mx-auto lg:mx-0">
              <div className="text-center lg:text-right">
                <div className="flex items-center justify-center lg:justify-start gap-1.5 text-[#D4AF37] mb-1">
                  <Award className="w-4 h-4" />
                  <span className="font-bold text-sm sm:text-base text-white">سمن بلدي</span>
                </div>
                <span className="text-xs text-white/60">مكونات نقية 100%</span>
              </div>

              <div className="text-center lg:text-right">
                <div className="flex items-center justify-center lg:justify-start gap-1.5 text-[#D4AF37] mb-1">
                  <Clock className="w-4 h-4" />
                  <span className="font-bold text-sm sm:text-base text-white">طازج يومياً</span>
                </div>
                <span className="text-xs text-white/60">يُخبز على مدار الساعة</span>
              </div>

              <div className="text-center lg:text-right">
                <div className="flex items-center justify-center lg:justify-start gap-1.5 text-[#D4AF37] mb-1">
                  <Sparkles className="w-4 h-4" />
                  <span className="font-bold text-sm sm:text-base text-white">خدمة سريعة</span>
                </div>
                <span className="text-xs text-white/60">ضيافة وتجهيز مناسبات</span>
              </div>
            </div>
          </div>

          {/* Left column: Visual Showcase Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Gold glowing border container */}
              <div className="relative rounded-3xl p-1 bg-gradient-to-b from-[#D4AF37] via-[#D4AF37]/30 to-transparent shadow-2xl">
                <div className="bg-[#380A11] rounded-[22px] overflow-hidden p-6 border border-[#D4AF37]/20">
                  {/* Featured Product Preview */}
                  <div className="relative h-64 rounded-xl overflow-hidden bg-gradient-to-br from-[#4A0E17] to-[#29060B] flex items-center justify-center border border-[#D4AF37]/20">
                    <img
                      src="https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=800&q=80"
                      alt="كنافة أبو بشار الفاخرة"
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-[#4A0E17]/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#F4E5A1] border border-[#D4AF37]/40">
                      الأكثر طلباً ⭐
                    </div>
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
                      <p className="text-lg font-bold text-white">كنافة نابلسية ناعمة</p>
                      <p className="text-xs text-[#F4E5A1]">جبنة بلدية فاخرة بالقطر الذهبي والفستق الحلبي</p>
                    </div>
                  </div>

                  {/* Highlights Mini Grid */}
                  <div className="mt-4 grid grid-cols-2 gap-3 text-center">
                    <div className="bg-[#4A0E17]/60 p-3 rounded-lg border border-[#D4AF37]/15">
                      <span className="block text-xs text-white/60">فروعنا ترحب بكم</span>
                      <span className="block text-sm font-bold text-[#D4AF37]">يومياً 9:00 ص - 11:00 م</span>
                    </div>
                    <div className="bg-[#4A0E17]/60 p-3 rounded-lg border border-[#D4AF37]/15">
                      <span className="block text-xs text-white/60">توصيل سريع</span>
                      <span className="block text-sm font-bold text-[#D4AF37]">لكافة المناطق القريبة</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating decorative badge */}
              <div className="absolute -bottom-6 -right-4 bg-gradient-to-r from-[#D4AF37] to-[#F4E5A1] text-[#29060B] font-bold px-4 py-2 rounded-2xl shadow-xl flex items-center gap-2 border border-white/40">
                <span className="text-lg">🍯</span>
                <div className="text-xs">
                  <p className="font-extrabold">حلويات بالسمن البلدي</p>
                  <p className="text-[10px] opacity-80">نكهة زمان الأصيلة</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
