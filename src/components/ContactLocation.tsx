"use client";

import { Phone, MapPin, Clock, MessageCircle, Navigation, ExternalLink } from "lucide-react";
import type { ShopInfo } from "@/types";

export default function ContactLocation({ data }: { data: ShopInfo }) {
  const phone1 = data.phone1;
  const phone2 = data.phone2;
  const cleanPhone1 = data.phone1.replace(/-/g, "");
  const cleanPhone2 = data.phone2.replace(/-/g, "");

  const whatsappUrl =
    `https://wa.me/${data.whatsapp}?text=` +
    encodeURIComponent(`مرحباً ${data.name}، أرغب بالاستفسار عن موقع المحل والطلبات.`);

  return (
    <section id="contact" className="py-20 bg-[#FAF7F2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#4A0E17]/10 text-[#4A0E17] px-4 py-1.5 rounded-full text-xs font-bold border border-[#4A0E17]/20">
            <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>تفضلوا بزيارتنا أو تواصلوا معنا</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#29060B]">
            موقعنا ومعلومات التواصل
          </h2>

          <p className="text-gray-600 text-sm sm:text-base">
            يسعدنا استقبالكم في محلنا لتقديم أشهى صواني الكنافة والحلويات الساخنة، أو تلبية طلباتكم
            عبر الهاتف والواتساب.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#4A0E17] text-[#D4AF37] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="space-y-2 flex-1">
                  <h3 className="font-bold text-base text-[#29060B]">أرقام الهاتف والطلب السريع</h3>
                  <p className="text-xs text-gray-500">جاهزون لاستقبال مكالماتكم وتجهيز طلباتكم</p>
                  <div className="flex flex-col sm:flex-row gap-2 pt-1">
                    {phone1 && (
                      <a
                        href={`tel:${cleanPhone1}`}
                        className="inline-flex items-center justify-center gap-2 bg-[#FAF7F2] hover:bg-[#4A0E17] text-[#4A0E17] hover:text-[#F4E5A1] px-4 py-2 rounded-xl text-xs font-bold border border-[#D4AF37]/40 transition-colors"
                        dir="ltr"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>{phone1}</span>
                      </a>
                    )}
                    {phone2 && (
                      <a
                        href={`tel:${cleanPhone2}`}
                        className="inline-flex items-center justify-center gap-2 bg-[#FAF7F2] hover:bg-[#4A0E17] text-[#4A0E17] hover:text-[#F4E5A1] px-4 py-2 rounded-xl text-xs font-bold border border-[#D4AF37]/40 transition-colors"
                        dir="ltr"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>{phone2}</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#25D366]/10 to-transparent p-6 rounded-2xl border border-[#25D366]/30 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-md">
                  <MessageCircle className="w-6 h-6 fill-current" />
                </div>
                <div className="space-y-2 flex-1">
                  <h3 className="font-bold text-base text-[#29060B]">طلب وتوصيل عبر واتساب</h3>
                  <p className="text-xs text-gray-600">
                    أرسل لنا تفاصيل طلبك مباشرة وسنقوم بتأكيده وتجهيزه فوراً
                  </p>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1fa952] text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md transition-all"
                  >
                    <span>فتح محادثة واتساب</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#FAF7F2] text-[#4A0E17] border border-[#D4AF37]/30 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#29060B]">ساعات العمل</h3>
                  <p className="text-xs text-gray-500 mt-1">{data.hoursNote}</p>
                  <p className="text-sm font-bold text-[#4A0E17] mt-1">{data.hours}</p>
                  {data.is_open ? (
                    <span className="inline-block mt-2 text-[11px] bg-green-100 text-green-800 font-semibold px-2.5 py-0.5 rounded-full">
                      مفتوح الآن لاستقبالكم
                    </span>
                  ) : (
                    <span className="inline-block mt-2 text-[11px] bg-red-100 text-red-800 font-semibold px-2.5 py-0.5 rounded-full">
                      مغلق حالياً
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#FAF7F2] text-[#4A0E17] border border-[#D4AF37]/30 flex items-center justify-center shrink-0">
                  <Navigation className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#29060B]">العنوان</h3>
                  <p className="text-sm text-gray-700 mt-1 font-medium">{data.address}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{data.addressNote}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-white p-3 rounded-3xl border border-[#D4AF37]/30 shadow-xl overflow-hidden">
              <div className="relative h-96 sm:h-[430px] rounded-2xl overflow-hidden bg-gray-100">
                {data.mapUrl ? (
                  <iframe
                    title={`موقع ${data.name}`}
                    src={data.mapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <MapPin className="w-10 h-10" />
                  </div>
                )}

                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-[#D4AF37]/30 shadow-lg max-w-xs">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] animate-pulse" />
                    <span className="text-xs font-bold text-[#4A0E17]">{data.name}</span>
                  </div>
                  <p className="text-[11px] text-gray-600">
                    أهلاً وسهلاً بكم، نقدم لكم الكنافة الساخنة والحلويات الطازجة على مدار اليوم.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
