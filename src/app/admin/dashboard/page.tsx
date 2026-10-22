"use client";

import { useEffect, useState } from "react";
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
  Save
} from "lucide-react";
import { Product, ShopInfo } from "@/types";

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [shopInfo, setShopInfo] = useState<ShopInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [shopModalOpen, setShopModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  // Product state
  const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({
    name: "",
    category: "كنافة",
    price: 0,
    unit: "₪ / كغم",
    description: "",
    image_url: "",
    is_available: true,
  });

  // Shop info state
  const [editShopInfo, setEditShopInfo] = useState<Partial<ShopInfo>>({});

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [productsRes, shopRes] = await Promise.all([
        fetch("/api/admin/dashboard"),
        fetch("/api/admin/shop-info")
      ]);
      
      if (productsRes.ok && shopRes.ok) {
        const productsData = await productsRes.json();
        const shopData = await shopRes.json();
        setProducts(productsData.products);
        setShopInfo(shopData);
      } else {
        router.push("/admin/login");
      }
    } catch {
      router.push("/admin/login");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const openAddModal = () => {
    setIsEditing(false);
    setCurrentProduct({
      name: "",
      category: "كنافة",
      price: 0,
      unit: "₪ / كغم",
      description: "",
      image_url: "",
      is_available: true,
    });
    setErrorMsg("");
    setModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setIsEditing(true);
    setCurrentProduct(product);
    setErrorMsg("");
    setModalOpen(true);
  };

  const openShopModal = () => {
    setEditShopInfo(shopInfo || {});
    setShopModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا الصنف نهائياً؟")) return;

    try {
      const res = await fetch(`/api/products?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setProducts(products.filter((p) => p.id !== id));
      } else {
        const data = await res.json();
        alert(data.error || "تعذر حذف المنتج");
      }
    } catch {
      alert("حدث خطأ في الاتصال");
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg("");

    try {
      const method = isEditing ? "PUT" : "POST";
      const res = await fetch("/api/products", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentProduct),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "حدث خطأ أثناء حفظ الصنف");
      }

      setModalOpen(false);
      fetchData();
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleShopSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/admin/shop-info", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editShopInfo),
      });

      if (!res.ok) throw new Error("تعذر حفظ إعدادات الموقع");

      const data = await res.json();
      setShopInfo(data.shopInfo);
      setShopModalOpen(false);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]">
        <Loader2 className="w-10 h-10 animate-spin text-[#4A0E17]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#29060B]">
              لوحة إدارة {shopInfo?.name}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              تحكم بمنتجاتك وتفاصيل محلك بكل سهولة
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={openShopModal}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 text-[#29060B] px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span>إعدادات الموقع</span>
            </button>
            <Link
              href="/"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>الرئيسية</span>
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

        {/* Products Management Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-6 border-b border-gray-100">
            <div>
              <h2 className="text-xl font-bold text-[#29060B]">قائمة المنتجات المعروضة</h2>
              <p className="text-xs text-gray-500 mt-0.5">
                إجمالي الأصناف: {products.length}
              </p>
            </div>

            <button
              onClick={openAddModal}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#4A0E17] hover:bg-[#62141F] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all hover:scale-102"
            >
              <Plus className="w-5 h-5" />
              <span>إضافة صنف جديد</span>
            </button>
          </div>

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
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-base text-[#29060B] truncate">
                      {product.name}
                    </h3>
                  </div>

                  <p className="text-xs text-gray-500 mt-0.5 truncate">
                    {product.category}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => openEditModal(product)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal for Add / Edit Product */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-[#29060B]">
                {isEditing ? "تعديل الصنف" : "إضافة صنف جديد"}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-gray-600 p-1 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            {errorMsg && (
              <div className="flex items-center gap-2 p-3 mb-4 bg-red-50 text-red-700 rounded-xl text-xs font-semibold">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">اسم الصنف</label>
                <input
                  type="text"
                  required
                  value={currentProduct.name || ""}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#4A0E17]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">صورة المنتج</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setCurrentProduct({ ...currentProduct, image_url: reader.result as string });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#4A0E17] file:text-white hover:file:bg-[#62141F]"
                />
                {currentProduct.image_url && <img src={currentProduct.image_url} alt="Preview" className="mt-2 w-20 h-20 object-cover rounded-lg" />}
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2.5 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded-xl">إلغاء</button>
                <button type="submit" disabled={submitting} className="px-5 py-2.5 text-xs font-bold bg-[#4A0E17] hover:bg-[#62141F] text-white rounded-xl shadow flex items-center gap-2">
                  {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{isEditing ? "حفظ التعديلات" : "إضافة الصنف"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal for Shop Info */}
      {shopModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-[#29060B]">إعدادات الموقع</h3>
              <button onClick={() => setShopModalOpen(false)} className="text-gray-400 hover:text-gray-600 p-1 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleShopSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">اسم المحل</label>
                <input
                  type="text"
                  value={editShopInfo.name || ""}
                  onChange={(e) => setEditShopInfo({...editShopInfo, name: e.target.value})}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#4A0E17]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">العنوان الرئيسي</label>
                <input
                  type="text"
                  value={editShopInfo.heroTitle || ""}
                  onChange={(e) => setEditShopInfo({...editShopInfo, heroTitle: e.target.value})}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#4A0E17]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">الوصف الفرعي</label>
                <textarea
                  rows={3}
                  value={editShopInfo.heroSubtitle || ""}
                  onChange={(e) => setEditShopInfo({...editShopInfo, heroSubtitle: e.target.value})}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#4A0E17]"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setShopModalOpen(false)} className="px-4 py-2.5 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded-xl">إلغاء</button>
                <button type="submit" disabled={submitting} className="px-5 py-2.5 text-xs font-bold bg-[#4A0E17] hover:bg-[#62141F] text-white rounded-xl shadow flex items-center gap-2">
                  {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>حفظ التعديلات</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
