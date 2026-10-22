import Hero from "@/components/Hero";
import About from "@/components/About";
import ProductCatalog from "@/components/ProductCatalog";
import ContactLocation from "@/components/ContactLocation";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const SHOP_INFO_ID = "00000000-0000-0000-0000-000000000001";

async function getShopInfo() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("shop_info")
    .select("*")
    .eq("id", SHOP_INFO_ID)
    .single();

  if (error || !data) {
    return {
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
  }

  return {
    id: data.id,
    name: data.name,
    heroTitle: data.hero_title,
    heroSubtitle: data.hero_subtitle,
    aboutTitle: data.about_title,
    aboutStory: data.about_story,
    phone1: data.phone1,
    phone2: data.phone2,
    whatsapp: data.whatsapp,
    hours: data.hours,
    address: data.address,
    announcement: data.announcement,
    is_open: data.is_open,
  };
}

async function getProducts() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) {
    return [];
  }

  return data.map((p) => ({
    id: p.id,
    name: p.name,
    category: p.category,
    price: Number(p.price),
    unit: p.unit,
    description: p.description,
    image_url: p.image_url,
    is_available: p.is_available,
    created_at: p.created_at,
  }));
}

export default async function Home() {
  const [shopInfo, products] = await Promise.all([getShopInfo(), getProducts()]);

  return (
    <div className="flex flex-col min-h-screen">
      <Hero data={shopInfo} />
      <About data={shopInfo} />
      <ProductCatalog initialProducts={products} />
      <ContactLocation data={shopInfo} />
    </div>
  );
}