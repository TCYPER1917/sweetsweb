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

export interface ShopInfo {
  id: string;
  name: string;
  heroTitle: string;
  heroSubtitle: string;
  aboutTitle: string;
  aboutStory: string;
  phone1: string;
  phone2: string;
  whatsapp: string;
  hours: string;
  address: string;
  announcement: string;
  is_open: boolean;
}
