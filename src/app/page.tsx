import Hero from "@/components/Hero";
import About from "@/components/About";
import ProductCatalog from "@/components/ProductCatalog";
import ContactLocation from "@/components/ContactLocation";
import { getProducts, getShopInfo } from "@/lib/shop";

export default async function Home() {
  const [shopInfo, products] = await Promise.all([getShopInfo(), getProducts()]);

  return (
    <div className="flex flex-col min-h-screen">
      <Hero data={shopInfo} />
      <About data={shopInfo} />
      <ProductCatalog
        initialProducts={products}
        categories={shopInfo.categories}
        title={shopInfo.catalogTitle}
        subtitle={shopInfo.catalogSubtitle}
        badge={shopInfo.catalogBadge}
        whatsapp={shopInfo.whatsapp}
        shopName={shopInfo.name}
      />
      <ContactLocation data={shopInfo} />
    </div>
  );
}
