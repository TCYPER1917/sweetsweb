"use client";

import { Phone, MapPin, Clock, MessageCircle, Navigation, ExternalLink } from "lucide-react";

export default function ContactLocation({ data }: { data: any }) {
  const phone1 = data.phone1;
  const phone2 = data.phone2;
  const cleanPhone1 = data.phone1.replace(/-/g, "");
  const cleanPhone2 = data.phone2.replace(/-/g, "");

  const whatsappUrl =
    `https://wa.me/${data.whatsapp}?text=` +
    encodeURIComponent("مرحباً حلويات أبو بشار، أرغب بالاستفسار عن موقع المحل والطلبات.");

  return (
    <section id="contact" className="py-20 bg-[#FAF7F2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#4A0E17]/10 text-[#4A0E17] px-4 py-1.5 rounded-full text-xs font-bold border border-[#4A0E17]/20">
            <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>تفضلوا بزيارتنا أو تواصلوا معنا</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#29060B]">
            موقعنا ومعلومات التواصل
          </h2>

          <p className="text-gray-600 text-sm sm:text-base">
            يسعدنا استقبالكم في محلنا لتقديم أشهى صواني الكنافة والحلويات الساخنة، أو تلبية طلباتكم عبر الهاتف والواتساب.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Details Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Phone Card */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#4A0E17] text-[#D4AF37] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="space-y-2 flex-1">
                  <h3 className="font-bold text-base text-[#29060B]">أرقام الهاتف والطلب السريع</h3>
                  <p className="text-xs text-gray-500">جاهزون لاستقبال مكالماتكم وتجهيز طلباتكم</p>
                  <div className="flex flex-col sm:flex-row gap-2 pt-1">
                    <a
                      href={`tel:${cleanPhone1}`}
                      className="inline-flex items-center justify-center gap-2 bg-[#FAF7F2] hover:bg-[#4A0E17] text-[#4A0E17] hover:text-[#F4E5A1] px-4 py-2 rounded-xl text-xs font-bold border border-[#D4AF37]/40 transition-colors"
                      dir="ltr"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{phone1}</span>
                    </a>
                    <a
                      href={`tel:${cleanPhone2}`}
                      className="inline-flex items-center justify-center gap-2 bg-[#FAF7F2] hover:bg-[#4A0E17] text-[#4A0E17] hover:text-[#F4E5A1] px-4 py-2 rounded-xl text-xs font-bold border border-[#D4AF37]/40 transition-colors"
                      dir="ltr"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{phone2}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp Card */}
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
                    className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1fa952] text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md transition-all hover:scale-102"
                  >
                    <span>فتح محادثة واتساب</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Hours Card */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#FAF7F2] text-[#4A0E17] border border-[#D4AF37]/30 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#29060B]">ساعات العمل</h3>
                  <p className="text-xs text-gray-500 mt-1">طيلة أيام الأسبوع</p>
                  <p className="text-sm font-bold text-[#4A0E17] mt-1">
                    {data.hours}
                  </p>
                  <span className="inline-block mt-2 text-[11px] bg-green-100 text-green-800 font-semibold px-2.5 py-0.5 rounded-full">
                    مفتوح الآن لاستقبالكم
                  </span>
                </div>

              </div>
            </div>

            {/* Address Card */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#FAF7F2] text-[#4A0E17] border border-[#D4AF37]/30 flex items-center justify-center shrink-0">
                  <Navigation className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#29060B]">العنوان</h3>
                  <p className="text-sm text-gray-700 mt-1 font-medium">
                    حلويات أبو بشار - سنجل , بجانب استوديو فرح 
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    موقع مميز وسهل الوصول مع توفر أماكن للاصطفاف
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Google Map (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white p-3 rounded-3xl border border-[#D4AF37]/30 shadow-xl overflow-hidden">
              <div className="relative h-96 sm:h-[430px] rounded-2xl overflow-hidden bg-gray-100">
                {/* Embed OpenStreetMap / Google Maps iframe */}
                <iframe
                  title="موقع حلويات أبو بشار"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d108846.54160410777!2d35.203764!3d31.903764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1502d50e828d011d%3A0xb36b3dbba9b14e6b!2sRamallah!5e0!3m2!1sar!2s!4v1700000000000!5m2!1sar!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />

                {/* Overlay card */}
                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-[#D4AF37]/30 shadow-lg max-w-xs">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] animate-pulse" />
                    <span className="text-xs font-bold text-[#4A0E17]">حلويات أبو بشار</span>
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
