export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  description: string;
  image_url: string;
  is_available: boolean;
  created_at: string;
}

export interface HeroFeature {
  title: string;
  subtitle: string;
}

export interface ShopInfo {
  id: string;
  name: string;
  heroTitle: string;
  heroSubtitle: string;
  heroBadge: string;
  heroImage: string;
  heroFeaturedName: string;
  heroFeaturedDesc: string;
  heroFeaturedBadge: string;
  heroHoursNote: string;
  heroDeliveryNote: string;
  heroCtaText: string;
  heroFeatures: HeroFeature[];
  aboutTitle: string;
  aboutStory: string;
  aboutImage: string;
  aboutHighlights: string[];
  aboutStatYear: string;
  aboutStatLabel: string;
  aboutBadge: string;
  aboutBadgeSub: string;
  catalogTitle: string;
  catalogSubtitle: string;
  catalogBadge: string;
  categories: string[];
  phone1: string;
  phone2: string;
  whatsapp: string;
  hours: string;
  hoursNote: string;
  address: string;
  addressNote: string;
  mapUrl: string;
  announcement: string;
  footerAbout: string;
  facebookUrl: string;
  instagramUrl: string;
  metaTitle: string;
  metaDescription: string;
  is_open: boolean;
}
