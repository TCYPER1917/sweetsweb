"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, Phone, MapPin, Clock, MessageCircle, Shield, Heart } from "lucide-react";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(2026);
  
  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const whatsappUrl =
    "https://wa.me/972569553350?text=" +
    encodeURIComponent("مرحباً حلويات أبو بشار، أرغب بالطلب.");

  return (
    <>
      <footer className="bg-gradient-to-b from-[#380A11] to-[#200407] text-white pt-16 pb-12 border-t border-[#D4AF37]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Col 1: Brand & Bio */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#F4E5A1] p-0.5">
                  <div className="w-full h-full bg-[#4A0E17] rounded-full flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                </div>
                <div>
                  <span className="block text-xl font-extrabold text-white">
                    حلويات أبو بشار
                  </span>
                  <span className="block text-xs text-[#D4AF37]">تأسس عام 2022</span>
                </div>
              </div>

              <p className="text-xs text-white/70 leading-relaxed">
                رمز الأصالة والذوق الرفيع. نقدم لكم أشهى الحلويات الشرقية والغربية والكنافة النابلسية بالسمن البلدي مع إمكانية التوصيل وتلبية المناسبات.
              </p>

              <div className="flex items-center gap-2 pt-2">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#D4AF37] hover:text-[#29060B] transition-colors flex items-center justify-center text-xs"
                  aria-label="فيسبوك"
                >
                  f
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#D4AF37] hover:text-[#29060B] transition-colors flex items-center justify-center text-xs"
                  aria-label="انستغرام"
                >
                  in
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-[#25D366] text-white hover:bg-[#1fa952] transition-colors flex items-center justify-center text-xs shadow-md"
                  aria-label="واتساب"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                </a>
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div>
              <h4 className="text-sm font-bold text-[#F4E5A1] uppercase tracking-wider mb-4 pb-2 border-b border-white/10">
                روابط سريعة
              </h4>
              <ul className="space-y-2 text-xs text-white/80">
                <li>
                  <a href="#hero" className="hover:text-[#D4AF37] transition-colors">
                    الرئيسية
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-[#D4AF37] transition-colors">
                    عن حلويات أبو بشار
                  </a>
                </li>
                <li>
                  <a href="#catalog" className="hover:text-[#D4AF37] transition-colors">
                    قائمة الحلويات والأصناف
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-[#D4AF37] transition-colors">
                    الفروع والموقع على الخريطة
                  </a>
                </li>
                <li>
                  <Link
                    href="/admin/login"
                    className="hover:text-[#D4AF37] transition-colors inline-flex items-center gap-1 text-white/50 hover:text-[#D4AF37]"
                  >
                    <Shield className="w-3 h-3" />
                    <span>لوحة تحكم الإدارة</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 3: Categories */}
            <div>
              <h4 className="text-sm font-bold text-[#F4E5A1] uppercase tracking-wider mb-4 pb-2 border-b border-white/10">
                أبرز أصنافنا
              </h4>
              <ul className="space-y-2 text-xs text-white/80">
                <li>كنافة نابلسية ناعمة وخشنة</li>
                <li>كنافة أصابع ذهبية</li>
                <li>كلاج بلدي بالجبنة والجوز</li>
                <li>بقلاوة بالفستق الحلبي</li>
                <li>هريسة وحلبة بالسمن البلدي</li>
                <li>قهوة ومشروبات دافئة</li>
              </ul>
            </div>

            {/* Col 4: Contact Info */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-[#F4E5A1] uppercase tracking-wider mb-4 pb-2 border-b border-white/10">
                معلومات الاتصال
              </h4>

              <div className="flex items-center gap-2.5 text-xs text-white/80">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <div className="flex gap-2" dir="ltr">
                  <a href="tel:0569553350" className="hover:text-[#D4AF37]">
                    0569-553350
                  </a>
                  <span>/</span>
                  <a href="tel:0595861525" className="hover:text-[#D4AF37]">
                    0595-861525
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-xs text-white/80">
                <Clock className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>يومياً من 9:00 ص حتى 11:00 م</span>
              </div>

              <div className="flex items-start gap-2.5 text-xs text-white/80">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>موقعنا الرئيسي يرحب بكم دائماً</span>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 mt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-white/60 gap-4">
            <p>
              © {currentYear} حلويات أبو بشار. جميع الحقوق محفوظة.
            </p>
            <p className="flex items-center gap-1">
              صُنع بكل <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" /> لخدمة عشاق الحلويات الأصيلة
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Action WhatsApp Button for Quick Mobile Order */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="اطلب عبر واتساب مباشرة"
        className="fixed bottom-6 left-6 z-40 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center gap-2.5 border-2 border-white/40 gold-glow"
      >
        <MessageCircle className="w-6 h-6 fill-current" />
        <span className="hidden sm:inline-block font-bold text-xs tracking-wide">
          اطلب عبر الواتساب
        </span>
      </a>
    </>
  );
}
