"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Loader2,
  Plus,
  Edit2,
  Trash2,
  LogOut,
  Home,
  X,
  AlertCircle,
  Settings,
  Package,
  UploadCloud,
  CheckCircle2,
  ImageIcon,
} from "lucide-react";
import type { Product, ShopInfo } from "@/types";
import { DEFAULT_SHOP_INFO } from "@/lib/site-defaults";

type Tab = "products" | "settings";

const inputClass =
  "w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#4A0E17] bg-white";
const labelClass = "block text-xs font-bold text-gray-700 mb-1";

function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      {children}
      {hint && <p className="text-[10px] text-gray-400 mt-1">{hint}</p>}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-[#FAF7F2]/60 border border-gray-100 rounded-2xl p-4 sm:p-5 space-y-4">
      <h3 className="text-sm font-black text-[#4A0E17]">{title}</h3>
      {children}
    </div>
  );
}

function ImageField({
  label,
  value,
  onChange,
  onUpload,
  uploading,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onUpload: (file: File) => void;
  uploading: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <label className={labelClass}>{label}</label>
      <div className="flex items-start gap-3">
        <div className="w-20 h-20 rounded-xl border border-gray-200 bg-white overflow-hidden shrink-0 flex items-center justify-center">
          {value ? (
            <img src={value} alt={label} className="w-full h-full object-cover" />
          ) : (
            <ImageIcon className="w-6 h-6 text-gray-300" />
          )}
        </div>
        <div className="flex-1 space-y-2">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="رابط الصورة (https://...)"
            className={inputClass}
            dir="ltr"
          />
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onUpload(file);
              e.target.value = "";
            }}
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center gap-2 bg-white border border-gray-200 hover:border-[#4A0E17] text-gray-700 px-3 py-2 rounded-xl text-xs font-bold transition-colors disabled:opacity-60"
          >
            {uploading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <UploadCloud className="w-3.5 h-3.5" />
            )}
            <span>{uploading ? "جارٍ الرفع..." : "رفع صورة من الجهاز"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [tab, setTab] = useState<Tab>("products");
  const [products, setProducts] = useState<Product[]>([]);
  const [shopInfo, setShopInfo] = useState<ShopInfo>({ ...DEFAULT_SHOP_INFO });
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const [settings, setSettings] = useState<ShopInfo>({ ...DEFAULT_SHOP_INFO });
  const [heroFeaturesText, setHeroFeaturesText] = useState("");
  const [highlightsText, setHighlightsText] = useState("");
  const [categoriesText, setCategoriesText] = useState("");

  const router = useRouter();

  const showNotice = (type: "ok" | "err", text: string) => {
    setNotice({ type, text });
    setTimeout(() => setNotice(null), 5000);
  };

  const applySettings = useCallback((info: ShopInfo) => {
    setShopInfo(info);
    setSettings(info);
    setHeroFeaturesText(
      (info.heroFeatures || []).map((f) => `${f.title} | ${f.subtitle}`).join("\n")
    );
    setHighlightsText((info.aboutHighlights || []).join("\n"));
    setCategoriesText((info.categories || []).join("\n"));
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const [productsRes, shopRes] = await Promise.all([
        fetch("/api/admin/dashboard", { cache: "no-store" }),
        fetch("/api/admin/shop-info", { cache: "no-store" }),
      ]);

      if (productsRes.status === 401 || shopRes.status === 401) {
        router.push("/admin/login");
        return;
      }

      if (!productsRes.ok || !shopRes.ok) {
        showNotice("err", "تعذر تحميل بيانات اللوحة. حاول تحديث الصفحة.");
        return;
      }

      const productsData = await productsRes.json();
      const shopData = await shopRes.json();

      setProducts(Array.isArray(productsData.products) ? productsData.products : []);
      applySettings({ ...DEFAULT_SHOP_INFO, ...shopData });
    } catch {
      showNotice("err", "حدث خطأ في الاتصال بالخادم");
    } finally {
      setLoading(false);
    }
  }, [applySettings, router]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) {
        showNotice("err", data.error || "تعذر رفع الصورة");
        return null;
      }
      showNotice("ok", "تم رفع الصورة بنجاح");
      return data.url as string;
    } catch {
      showNotice("err", "حدث خطأ أثناء رفع الصورة");
      return null;
    } finally {
      setUploading(false);
    }
  };

  const openAddModal = () => {
    setIsEditing(false);
    setCurrentProduct({
      name: "",
      category: shopInfo.categories?.[0] || "كنافة",
      price: 0,
      unit: "₪ / كغم",
      description: "",
      image_url: "",
      is_available: true,
    });
    setModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setIsEditing(true);
    setCurrentProduct({ ...product });
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا الصنف نهائياً؟")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/products?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
        cache: "no-store",
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        showNotice("err", data.error || "تعذر حذف المنتج");
        return;
      }
      setProducts((prev) => prev.filter((p) => p.id !== id));
      showNotice("ok", "تم حذف الصنف بنجاح");
    } catch {
      showNotice("err", "حدث خطأ في الاتصال");
    } finally {
      setDeletingId(null);
    }
  };

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const isEdit = isEditing && Boolean(currentProduct.id);
      const payload = {
        ...currentProduct,
        price: Number(currentProduct.price),
        is_available: currentProduct.is_available !== false,
      };
      const res = await fetch("/api/products", {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        showNotice("err", data.error || "حدث خطأ أثناء حفظ الصنف");
        return;
      }
      setModalOpen(false);
      showNotice("ok", isEdit ? "تم تحديث الصنف بنجاح" : "تمت إضافة الصنف بنجاح");
      await fetchData();
    } catch {
      showNotice("err", "حدث خطأ في الاتصال");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSettingsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const heroFeatures = heroFeaturesText
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => {
          const [title, ...rest] = line.split("|");
          return { title: title.trim(), subtitle: rest.join("|").trim() };
        });

      const payload = {
        ...settings,
        heroFeatures,
        aboutHighlights: highlightsText
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
        categories: categoriesText
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
      };

      const res = await fetch("/api/admin/shop-info", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        showNotice("err", data.error || "تعذر حفظ إعدادات الموقع");
        return;
      }
      applySettings({ ...DEFAULT_SHOP_INFO, ...data.shopInfo });
      showNotice("ok", "تم حفظ إعدادات الموقع بنجاح");
    } catch {
      showNotice("err", "حدث خطأ أثناء حفظ الإعدادات");
    } finally {
      setSubmitting(false);
    }
  };

  const setSetting = <K extends keyof ShopInfo>(key: K, value: ShopInfo[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const updateProduct = <K extends keyof Product>(key: K, value: Product[K]) => {
    setCurrentProduct((prev) => ({ ...prev, [key]: value }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]">
        <Loader2 className="w-10 h-10 animate-spin text-[#4A0E17]" />
      </div>
    );
  }

  const productCategories = Array.from(
    new Set([
      ...(shopInfo.categories || []),
      ...(currentProduct.category ? [currentProduct.category] : []),
    ])
  );

  return (
    <div className="min-h-screen bg-[#FAF7F2] p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#29060B]">
              لوحة إدارة {shopInfo.name}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              تحكم كامل بكل محتوى الموقع: المنتجات، النصوص، الصور وبيانات التواصل
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link
              href="/"
              target="_blank"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>الموقع</span>
            </Link>

            <button
              onClick={handleLogout}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>خروج</span>
            </button>
          </div>
        </header>

        {notice && (
          <div
            className={`flex items-center gap-2 p-3 mb-4 rounded-xl text-xs font-bold ${
              notice.type === "ok"
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {notice.type === "ok" ? (
              <CheckCircle2 className="w-4 h-4 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0" />
            )}
            <span>{notice.text}</span>
          </div>
        )}

        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setTab("products")}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-colors ${
              tab === "products"
                ? "bg-[#4A0E17] text-white shadow-md"
                : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-100"
            }`}
          >
            <Package className="w-4 h-4" />
            <span>المنتجات ({products.length})</span>
          </button>
          <button
            onClick={() => setTab("settings")}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-colors ${
              tab === "settings"
                ? "bg-[#4A0E17] text-white shadow-md"
                : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-100"
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>محتوى الموقع</span>
          </button>
        </div>

        {tab === "products" && (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-6 border-b border-gray-100">
              <div>
                <h2 className="text-xl font-bold text-[#29060B]">قائمة المنتجات المعروضة</h2>
                <p className="text-xs text-gray-500 mt-0.5">إجمالي الأصناف: {products.length}</p>
              </div>

              <button
                onClick={openAddModal}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#4A0E17] hover:bg-[#62141F] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all"
              >
                <Plus className="w-5 h-5" />
                <span>إضافة صنف جديد</span>
              </button>
            </div>

            {products.length === 0 ? (
              <div className="text-center py-14 text-gray-400">
                <Package className="w-10 h-10 mx-auto mb-2" />
                <p className="text-sm font-bold">لا توجد أصناف حالياً — أضف أول صنف</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-4 p-4 border border-gray-100 rounded-2xl hover:border-[#D4AF37]/40 hover:bg-[#FAF7F2]/50 transition-all"
                  >
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-20 h-20 rounded-xl object-cover border border-gray-100 shrink-0"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=600&q=80";
                      }}
                    />

                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-base text-[#29060B] truncate">
                        {product.name}
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5 truncate">
                        {product.category} • {product.price} {product.unit}
                      </p>
                      <span
                        className={`inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          product.is_available
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {product.is_available ? "متوفر" : "غير متوفر"}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => openEditModal(product)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                        title="تعديل"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        disabled={deletingId === product.id}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors disabled:opacity-50"
                        title="حذف"
                      >
                        {deletingId === product.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === "settings" && (
          <form
            onSubmit={handleSettingsSubmit}
            className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-8 space-y-5"
          >
            <Section title="الهوية العامة">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="اسم المحل">
                  <input
                    type="text"
                    value={settings.name}
                    onChange={(e) => setSetting("name", e.target.value)}
                    className={inputClass}
                  />
                </Field>
                <Field label="عنوان SEO">
                  <input
                    type="text"
                    value={settings.metaTitle}
                    onChange={(e) => setSetting("metaTitle", e.target.value)}
                    className={inputClass}
                  />
                </Field>
              </div>
              <Field label="وصف SEO">
                <textarea
                  rows={2}
                  value={settings.metaDescription}
                  onChange={(e) => setSetting("metaDescription", e.target.value)}
                  className={inputClass}
                />
              </Field>
              <Field label="شريط الإعلان أعلى الموقع">
                <input
                  type="text"
                  value={settings.announcement}
                  onChange={(e) => setSetting("announcement", e.target.value)}
                  className={inputClass}
                />
              </Field>
              <label className="inline-flex items-center gap-2 text-xs font-bold text-gray-700">
                <input
                  type="checkbox"
                  checked={settings.is_open}
                  onChange={(e) => setSetting("is_open", e.target.checked)}
                  className="w-4 h-4 accent-[#4A0E17]"
                />
                المحل مفتوح الآن
              </label>
            </Section>

            <Section title="القسم الرئيسي (Hero)">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="العنوان الرئيسي">
                  <input
                    type="text"
                    value={settings.heroTitle}
                    onChange={(e) => setSetting("heroTitle", e.target.value)}
                    className={inputClass}
                  />
                </Field>
                <Field label="الشريط العلوي (Badge)">
                  <input
                    type="text"
                    value={settings.heroBadge}
                    onChange={(e) => setSetting("heroBadge", e.target.value)}
                    className={inputClass}
                  />
                </Field>
              </div>
              <Field label="الوصف الفرعي">
                <textarea
                  rows={2}
                  value={settings.heroSubtitle}
                  onChange={(e) => setSetting("heroSubtitle", e.target.value)}
                  className={inputClass}
                />
              </Field>
              <Field label="نص زر الواتساب">
                <input
                  type="text"
                  value={settings.heroCtaText}
                  onChange={(e) => setSetting("heroCtaText", e.target.value)}
                  className={inputClass}
                />
              </Field>
              <ImageField
                label="صورة البطاقة الجانبية"
                value={settings.heroImage}
                onChange={(v) => setSetting("heroImage", v)}
                uploading={uploading}
                onUpload={async (file) => {
                  const url = await uploadImage(file);
                  if (url) setSetting("heroImage", url);
                }}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="اسم الصنف المميز">
                  <input
                    type="text"
                    value={settings.heroFeaturedName}
                    onChange={(e) => setSetting("heroFeaturedName", e.target.value)}
                    className={inputClass}
                  />
                </Field>
                <Field label="شارة الصنف المميز">
                  <input
                    type="text"
                    value={settings.heroFeaturedBadge}
                    onChange={(e) => setSetting("heroFeaturedBadge", e.target.value)}
                    className={inputClass}
                  />
                </Field>
              </div>
              <Field label="وصف الصنف المميز">
                <input
                  type="text"
                  value={settings.heroFeaturedDesc}
                  onChange={(e) => setSetting("heroFeaturedDesc", e.target.value)}
                  className={inputClass}
                />
              </Field>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="ملاحظة ساعات العمل (بطاقة)">
                  <input
                    type="text"
                    value={settings.heroHoursNote}
                    onChange={(e) => setSetting("heroHoursNote", e.target.value)}
                    className={inputClass}
                  />
                </Field>
                <Field label="ملاحظة التوصيل (بطاقة)">
                  <input
                    type="text"
                    value={settings.heroDeliveryNote}
                    onChange={(e) => setSetting("heroDeliveryNote", e.target.value)}
                    className={inputClass}
                  />
                </Field>
              </div>
              <Field
                label="مزايا القسم الرئيسي"
                hint="كل سطر: العنوان | الوصف الفرعي — مثال: سمن بلدي | مكونات نقية 100%"
              >
                <textarea
                  rows={3}
                  value={heroFeaturesText}
                  onChange={(e) => setHeroFeaturesText(e.target.value)}
                  className={inputClass}
                />
              </Field>
            </Section>

            <Section title="قسم عن المحل">
              <Field label="العنوان">
                <input
                  type="text"
                  value={settings.aboutTitle}
                  onChange={(e) => setSetting("aboutTitle", e.target.value)}
                  className={inputClass}
                />
              </Field>
              <Field label="القصة">
                <textarea
                  rows={4}
                  value={settings.aboutStory}
                  onChange={(e) => setSetting("aboutStory", e.target.value)}
                  className={inputClass}
                />
              </Field>
              <ImageField
                label="صورة المحل"
                value={settings.aboutImage}
                onChange={(v) => setSetting("aboutImage", v)}
                uploading={uploading}
                onUpload={async (file) => {
                  const url = await uploadImage(file);
                  if (url) setSetting("aboutImage", url);
                }}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="سنة التأسيس">
                  <input
                    type="text"
                    value={settings.aboutStatYear}
                    onChange={(e) => setSetting("aboutStatYear", e.target.value)}
                    className={inputClass}
                  />
                </Field>
                <Field label="وصف سنة التأسيس">
                  <input
                    type="text"
                    value={settings.aboutStatLabel}
                    onChange={(e) => setSetting("aboutStatLabel", e.target.value)}
                    className={inputClass}
                  />
                </Field>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="الشارة الصغيرة">
                  <input
                    type="text"
                    value={settings.aboutBadge}
                    onChange={(e) => setSetting("aboutBadge", e.target.value)}
                    className={inputClass}
                  />
                </Field>
                <Field label="وصف الشارة">
                  <input
                    type="text"
                    value={settings.aboutBadgeSub}
                    onChange={(e) => setSetting("aboutBadgeSub", e.target.value)}
                    className={inputClass}
                  />
                </Field>
              </div>
              <Field label="نقاط المزايا" hint="كل سطر = نقطة مستقلة">
                <textarea
                  rows={4}
                  value={highlightsText}
                  onChange={(e) => setHighlightsText(e.target.value)}
                  className={inputClass}
                />
              </Field>
            </Section>

            <Section title="قسم القائمة">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="عنوان القسم">
                  <input
                    type="text"
                    value={settings.catalogTitle}
                    onChange={(e) => setSetting("catalogTitle", e.target.value)}
                    className={inputClass}
                  />
                </Field>
                <Field label="الشارة العلوية">
                  <input
                    type="text"
                    value={settings.catalogBadge}
                    onChange={(e) => setSetting("catalogBadge", e.target.value)}
                    className={inputClass}
                  />
                </Field>
              </div>
              <Field label="وصف القسم">
                <textarea
                  rows={2}
                  value={settings.catalogSubtitle}
                  onChange={(e) => setSetting("catalogSubtitle", e.target.value)}
                  className={inputClass}
                />
              </Field>
              <Field label="التصنيفات" hint="كل سطر = تصنيف. تُستخدم في فلاتر الموقع وفي نموذج المنتج">
                <textarea
                  rows={3}
                  value={categoriesText}
                  onChange={(e) => setCategoriesText(e.target.value)}
                  className={inputClass}
                />
              </Field>
            </Section>

            <Section title="التواصل والموقع">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Field label="الهاتف الأول">
                  <input
                    type="text"
                    value={settings.phone1}
                    onChange={(e) => setSetting("phone1", e.target.value)}
                    className={inputClass}
                    dir="ltr"
                  />
                </Field>
                <Field label="الهاتف الثاني">
                  <input
                    type="text"
                    value={settings.phone2}
                    onChange={(e) => setSetting("phone2", e.target.value)}
                    className={inputClass}
                    dir="ltr"
                  />
                </Field>
                <Field label="رقم واتساب" hint="بصيغة دولية بدون + مثال: 972569553350">
                  <input
                    type="text"
                    value={settings.whatsapp}
                    onChange={(e) => setSetting("whatsapp", e.target.value)}
                    className={inputClass}
                    dir="ltr"
                  />
                </Field>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="ساعات العمل">
                  <input
                    type="text"
                    value={settings.hours}
                    onChange={(e) => setSetting("hours", e.target.value)}
                    className={inputClass}
                  />
                </Field>
                <Field label="ملاحظة ساعات العمل">
                  <input
                    type="text"
                    value={settings.hoursNote}
                    onChange={(e) => setSetting("hoursNote", e.target.value)}
                    className={inputClass}
                  />
                </Field>
              </div>
              <Field label="العنوان">
                <input
                  type="text"
                  value={settings.address}
                  onChange={(e) => setSetting("address", e.target.value)}
                  className={inputClass}
                />
              </Field>
              <Field label="ملاحظة العنوان">
                <input
                  type="text"
                  value={settings.addressNote}
                  onChange={(e) => setSetting("addressNote", e.target.value)}
                  className={inputClass}
                />
              </Field>
              <Field
                label="رابط خريطة Google Maps (Embed)"
                hint="من خرائط جوجل: مشاركة ← تضمين خريطة ← انسخ رابط src فقط"
              >
                <textarea
                  rows={3}
                  value={settings.mapUrl}
                  onChange={(e) => setSetting("mapUrl", e.target.value)}
                  className={inputClass}
                  dir="ltr"
                />
              </Field>
            </Section>

            <Section title="الفوتر والتواصل الاجتماعي">
              <Field label="نبذة الفوتر">
                <textarea
                  rows={3}
                  value={settings.footerAbout}
                  onChange={(e) => setSetting("footerAbout", e.target.value)}
                  className={inputClass}
                />
              </Field>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="رابط فيسبوك">
                  <input
                    type="text"
                    value={settings.facebookUrl}
                    onChange={(e) => setSetting("facebookUrl", e.target.value)}
                    className={inputClass}
                    dir="ltr"
                  />
                </Field>
                <Field label="رابط انستغرام">
                  <input
                    type="text"
                    value={settings.instagramUrl}
                    onChange={(e) => setSetting("instagramUrl", e.target.value)}
                    className={inputClass}
                    dir="ltr"
                  />
                </Field>
              </div>
            </Section>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => applySettings(shopInfo)}
                className="px-4 py-2.5 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded-xl"
              >
                استعادة القيم المحفوظة
              </button>
              <button
                type="submit"
                disabled={submitting || uploading}
                className="px-6 py-2.5 text-xs font-bold bg-[#4A0E17] hover:bg-[#62141F] text-white rounded-xl shadow flex items-center gap-2 disabled:opacity-60"
              >
                {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>حفظ كل الإعدادات</span>
              </button>
            </div>
          </form>
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-[#29060B]">
                {isEditing ? "تعديل الصنف" : "إضافة صنف جديد"}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleProductSubmit} className="space-y-4">
              <Field label="اسم الصنف">
                <input
                  type="text"
                  required
                  value={currentProduct.name || ""}
                  onChange={(e) => updateProduct("name", e.target.value)}
                  className={inputClass}
                />
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field label="التصنيف">
                  <select
                    value={currentProduct.category || ""}
                    onChange={(e) => updateProduct("category", e.target.value)}
                    className={inputClass}
                  >
                    {productCategories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="الوحدة">
                  <input
                    type="text"
                    value={currentProduct.unit || ""}
                    onChange={(e) => updateProduct("unit", e.target.value)}
                    className={inputClass}
                    placeholder="₪ / كغم"
                  />
                </Field>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Field label="السعر (₪)">
                  <input
                    type="number"
                    min={0}
                    step="0.5"
                    required
                    value={currentProduct.price ?? 0}
                    onChange={(e) => updateProduct("price", Number(e.target.value))}
                    className={inputClass}
                  />
                </Field>
                <Field label="الحالة">
                  <label className="flex items-center gap-2 h-[42px] px-3.5 rounded-xl border border-gray-200 bg-white text-sm">
                    <input
                      type="checkbox"
                      checked={currentProduct.is_available !== false}
                      onChange={(e) => updateProduct("is_available", e.target.checked)}
                      className="w-4 h-4 accent-[#4A0E17]"
                    />
                    <span>متوفر للبيع</span>
                  </label>
                </Field>
              </div>

              <Field label="الوصف">
                <textarea
                  rows={3}
                  value={currentProduct.description || ""}
                  onChange={(e) => updateProduct("description", e.target.value)}
                  className={inputClass}
                />
              </Field>

              <ImageField
                label="صورة المنتج"
                value={currentProduct.image_url || ""}
                onChange={(v) => updateProduct("image_url", v)}
                uploading={uploading}
                onUpload={async (file) => {
                  const url = await uploadImage(file);
                  if (url) updateProduct("image_url", url);
                }}
              />

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded-xl"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={submitting || uploading}
                  className="px-5 py-2.5 text-xs font-bold bg-[#4A0E17] hover:bg-[#62141F] text-white rounded-xl shadow flex items-center gap-2 disabled:opacity-60"
                >
                  {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{isEditing ? "حفظ التعديلات" : "إضافة الصنف"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
