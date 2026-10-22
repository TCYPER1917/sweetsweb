import { Product, ShopInfo } from "@/types";

export const INITIAL_PRODUCTS: Product[] = [
  // 1. كنافة (Kunafeh & Kullaj)
  {
    id: "prod-1",
    name: "الكنافة الناعمة النابلسية",
    category: "كنافة",
    price: 45,
    unit: "₪ / كغم",
    image_url: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=800&q=80",
    description: "كنافة ناعمة تقليدية بالسمن البلدي الفاخر والجبنة النابلسية البلدية المطاطية مع الفستق الحلبي.",
    is_available: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "prod-2",
    name: "كنافة أصابع ذهبية",
    category: "كنافة",
    price: 50,
    unit: "₪ / كغم",
    image_url: "https://images.unsplash.com/photo-1596504285810-7217316715f5?auto=format&fit=crop&w=800&q=80",
    description: "أصابع الكنافة المقرمشة المحشوة بالقشطة الطازجة أو الجبنة والمغطاة بالفستق الأخضر.",
    is_available: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "prod-3",
    name: "الكلاج البلدي بالجبنة",
    category: "كنافة",
    price: 40,
    unit: "₪ / كغم",
    image_url: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80",
    description: "رقائق كلاج مقرمشة وذهبية محشوة بجبنة نابلسية منقوعة بالسمن البلدي والقطر الفاخر.",
    is_available: true,
    created_at: new Date().toISOString(),
  },

  // 2. حلويات شرقية (Oriental Sweets)
  {
    id: "prod-4",
    name: "بقلاوة مشكلة بالفستق والجوز",
    category: "حلويات شرقية",
    price: 65,
    unit: "₪ / كغم",
    image_url: "https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=800&q=80",
    description: "تشكيلة فاخرة من أصناف البقلاوة المورقة بالسمن البلدي ومحشوة بأجود أنواع الفستق الحلبي والجوز.",
    is_available: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "prod-5",
    name: "هريسة بالسمن البلدي واللوز",
    category: "حلويات شرقية",
    price: 30,
    unit: "₪ / كغم",
    image_url: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
    description: "هريسة سميد أصيلة ذهبية اللون مزينة باللوز المحمص ومغمورة بالقطر الخفيف والسمن البلدي.",
    is_available: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "prod-6",
    name: "حلبة فلسطينية تقليدية",
    category: "حلويات شرقية",
    price: 25,
    unit: "₪ / كغم",
    image_url: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
    description: "حلوى الحلبة البيتية المغذية مع حبوب السمسم وزيت الزيتون والسمن بنكهة الأجداد.",
    is_available: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "prod-7",
    name: "فطير مشلتت بالعسل والجبن",
    category: "حلويات شرقية",
    price: 35,
    unit: "₪ / قطعة",
    image_url: "https://images.unsplash.com/photo-1621236378699-8597fee6a1ce?auto=format&fit=crop&w=800&q=80",
    description: "فطير مورق خفيف ومقرمش يخبز طازجاً ويقدم مع القشطة أو العسل أو الجبن حسب الرغبة.",
    is_available: true,
    created_at: new Date().toISOString(),
  },

  // 3. مشروبات ساخنة (Hot Beverages)
  {
    id: "prod-8",
    name: "قهوة عربية بالهيل والزعفران",
    category: "مشروبات ساخنة",
    price: 8,
    unit: "₪ / فنجان",
    image_url: "https://images.unsplash.com/photo-1514432324607-a09d9b4a45a3?auto=format&fit=crop&w=800&q=80",
    description: "قهوة عربية أصيلة معدّة من حبوب البن المحمصة الفاخرة المتبلة بالهيل والزعفران لمرافقة الكنافة.",
    is_available: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "prod-9",
    name: "شاي أحمر بالميرمية والنعناع",
    category: "مشروبات ساخنة",
    price: 5,
    unit: "₪ / كوب",
    image_url: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80",
    description: "شاي دافئ مروق على الأصول بنكهة الميرمية الجبلية الفلسطينية أو النعناع الطازج.",
    is_available: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "prod-10",
    name: "سحلب بلدي بالقرفة والمكسرات",
    category: "مشروبات ساخنة",
    price: 12,
    unit: "₪ / كوب",
    image_url: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80",
    description: "سحلب كثيف دافئ مصنوع من الحليب الطازج والمستكة مع رشّة قرفة وجوز هند ومكسرات.",
    is_available: true,
    created_at: new Date().toISOString(),
  },
];

export const INITIAL_SHOP_INFO: ShopInfo = {
  id: "shop-main",
  name: "حلويات أبو بشار",
  heroTitle: "نكهة لا تُنسى من حلويات أبو بشار",
  heroSubtitle: "نقدم لكم ألذ أنواع الكنافة النابلسية بالسمن البلدي الفاخر، والبقلاوة والكلاج وحلوياتنا الشرقية والغربية المحضرة طازجة يومياً بأعلى معايير الجودة والنظافة.",
  aboutTitle: "حكاية نكهة مميزة بدأت في حلويات أبو بشار",
  aboutStory: "منذ انطلاقتنا في عام 2022، وضعنا في حلويات أبو بشار هدفاً واحداً نصب أعيننا: تقديم الحلويات الشرقية والغربية كما يجب أن تكون. أصيلة في نكهتها، فاخرة في مكوناتها، وطازجة تُخبز يومياً لتصلكم ساخنة وتلامس قلوبكم قبل حواسكم.",
  phone1: "0569-553350",
  phone2: "0595-861525",
  whatsapp: "972569553350",
  hours: "يومياً من الساعة 9:00 صباحاً حتى 11:00 مساءً",
  address: "حلويات أبو بشار - المركز الرئيسي",
  announcement: "نستقبل حجوزات صواني الكنافة والحلويات للأفراح والمناسبات الخاصة مع خدمة التوصيل!",
  is_open: true,
};

// Global in-memory data store for live updates during session
// In production, syncs with Supabase if SUPABASE_URL and SUPABASE_ANON_KEY are present
let inMemoryProducts: Product[] = [...INITIAL_PRODUCTS];
let inMemoryShopInfo: ShopInfo = { ...INITIAL_SHOP_INFO };

export function getInMemoryProducts(): Product[] {
  return inMemoryProducts;
}

export function setInMemoryProducts(products: Product[]): void {
  inMemoryProducts = products;
}

export function addInMemoryProduct(product: Product): Product {
  inMemoryProducts = [product, ...inMemoryProducts];
  return product;
}

export function updateInMemoryProduct(id: string, updates: Partial<Product>): Product | null {
  const index = inMemoryProducts.findIndex((p) => p.id === id);
  if (index === -1) return null;
  inMemoryProducts[index] = {
    ...inMemoryProducts[index],
    ...updates,
  };
  return inMemoryProducts[index];
}

export function deleteInMemoryProduct(id: string): boolean {
  const initialLength = inMemoryProducts.length;
  inMemoryProducts = inMemoryProducts.filter((p) => p.id !== id);
  return inMemoryProducts.length < initialLength;
}

export function getInMemoryShopInfo(): ShopInfo {
  return inMemoryShopInfo;
}

export function updateInMemoryShopInfo(updates: Partial<ShopInfo>): ShopInfo {
  inMemoryShopInfo = {
    ...inMemoryShopInfo,
    ...updates,
  };
  return inMemoryShopInfo;
}
