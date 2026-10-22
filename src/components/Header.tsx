"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, Menu, X, Sparkles, Shield } from "lucide-react";

export default function Header({
  name = "حلويات أبو بشار",
  phone = "",
}: {
  name?: string;
  phone?: string;
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "الرئيسية", href: "#hero" },
    { name: "عن المحل", href: "#about" },
    { name: "قائمة الحلويات", href: "#catalog" },
    { name: "موقعنا والتواصل", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#380A11]/95 backdrop-blur-md shadow-lg border-b border-[#D4AF37]/20 py-3"
          : "bg-gradient-to-b from-[#29060B]/90 to-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#F4E5A1] p-0.5 shadow-md group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#4A0E17] rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#D4AF37]" />
              </div>
            </div>
            <div>
              <span className="block text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-[#F4E5A1] transition-colors">
                {name}
              </span>
              <span className="block text-xs text-[#D4AF37] font-medium tracking-wide">
                طعم الأصالة والمذاق الفاخر
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-white/90 hover:text-[#D4AF37] text-sm font-medium transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="hidden sm:flex items-center gap-4">
            {phone && (
              <a
                href={`tel:${phone.replace(/-/g, "")}`}
                className="flex items-center gap-2 bg-[#4A0E17] hover:bg-[#62141F] text-[#F4E5A1] px-4 py-2 rounded-full border border-[#D4AF37]/40 text-xs font-semibold transition-all shadow-sm hover:shadow"
              >
                <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span dir="ltr">{phone}</span>
              </a>
            )}
            <Link
              href="/admin/login"
              className="flex items-center gap-1.5 text-xs text-white/70 hover:text-[#D4AF37] px-3 py-1.5 rounded-md hover:bg-white/5 transition-colors"
              title="لوحة الإدارة"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>الإدارة</span>
            </Link>
          </div>

          <div className="flex sm:hidden items-center gap-2">
            {phone && (
              <a
                href={`tel:${phone.replace(/-/g, "")}`}
                className="p-2 bg-[#4A0E17] text-[#D4AF37] rounded-full border border-[#D4AF37]/30"
                aria-label="اتصل بنا"
              >
                <Phone className="w-4 h-4" />
              </a>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white hover:text-[#D4AF37] rounded-md focus:outline-none"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#380A11] border-b border-[#D4AF37]/30 px-4 pt-3 pb-6 mt-3 space-y-3 shadow-xl">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-white hover:text-[#D4AF37] py-2 text-base font-medium border-b border-white/5"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <Link
              href="/admin/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 text-white/80 hover:text-[#D4AF37] py-2 text-sm"
            >
              <Shield className="w-4 h-4 text-[#D4AF37]" />
              <span>دخول الإدارة</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
