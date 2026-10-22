import type { ShopInfo } from "@/types";
import { DEFAULT_SHOP_INFO } from "@/lib/site-defaults";

export function dbToShopInfo(row: any): ShopInfo {
  if (!row) return { ...DEFAULT_SHOP_INFO };

  const str = (value: unknown, fallback: string) =>
    typeof value === "string" && value.length > 0 ? value : fallback;

  const arr = <T,>(value: unknown, fallback: T[]): T[] =>
    Array.isArray(value) && value.length > 0 ? (value as T[]) : fallback;

  return {
    id: str(row.id, DEFAULT_SHOP_INFO.id),
    name: str(row.name, DEFAULT_SHOP_INFO.name),

    heroTitle: str(row.hero_title, DEFAULT_SHOP_INFO.heroTitle),
    heroSubtitle: str(row.hero_subtitle, DEFAULT_SHOP_INFO.heroSubtitle),
    heroBadge: str(row.hero_badge, DEFAULT_SHOP_INFO.heroBadge),
    heroImage: str(row.hero_image, DEFAULT_SHOP_INFO.heroImage),
    heroFeaturedName: str(row.hero_featured_name, DEFAULT_SHOP_INFO.heroFeaturedName),
    heroFeaturedDesc: str(row.hero_featured_desc, DEFAULT_SHOP_INFO.heroFeaturedDesc),
    heroFeaturedBadge: str(row.hero_featured_badge, DEFAULT_SHOP_INFO.heroFeaturedBadge),
    heroHoursNote: str(row.hero_hours_note, DEFAULT_SHOP_INFO.heroHoursNote),
    heroDeliveryNote: str(row.hero_delivery_note, DEFAULT_SHOP_INFO.heroDeliveryNote),
    heroCtaText: str(row.hero_cta_text, DEFAULT_SHOP_INFO.heroCtaText),
    heroFeatures: arr(row.hero_features, DEFAULT_SHOP_INFO.heroFeatures),

    aboutTitle: str(row.about_title, DEFAULT_SHOP_INFO.aboutTitle),
    aboutStory: str(row.about_story, DEFAULT_SHOP_INFO.aboutStory),
    aboutImage: str(row.about_image, DEFAULT_SHOP_INFO.aboutImage),
    aboutHighlights: arr(row.about_highlights, DEFAULT_SHOP_INFO.aboutHighlights),
    aboutStatYear: str(row.about_stat_year, DEFAULT_SHOP_INFO.aboutStatYear),
    aboutStatLabel: str(row.about_stat_label, DEFAULT_SHOP_INFO.aboutStatLabel),
    aboutBadge: str(row.about_badge, DEFAULT_SHOP_INFO.aboutBadge),
    aboutBadgeSub: str(row.about_badge_sub, DEFAULT_SHOP_INFO.aboutBadgeSub),

    catalogTitle: str(row.catalog_title, DEFAULT_SHOP_INFO.catalogTitle),
    catalogSubtitle: str(row.catalog_subtitle, DEFAULT_SHOP_INFO.catalogSubtitle),
    catalogBadge: str(row.catalog_badge, DEFAULT_SHOP_INFO.catalogBadge),
    categories: arr(row.categories, DEFAULT_SHOP_INFO.categories),

    phone1: str(row.phone1, DEFAULT_SHOP_INFO.phone1),
    phone2: str(row.phone2, DEFAULT_SHOP_INFO.phone2),
    whatsapp: str(row.whatsapp, DEFAULT_SHOP_INFO.whatsapp),
    hours: str(row.hours, DEFAULT_SHOP_INFO.hours),
    hoursNote: str(row.hours_note, DEFAULT_SHOP_INFO.hoursNote),
    address: str(row.address, DEFAULT_SHOP_INFO.address),
    addressNote: str(row.address_note, DEFAULT_SHOP_INFO.addressNote),
    mapUrl: str(row.map_url, DEFAULT_SHOP_INFO.mapUrl),

    announcement: typeof row.announcement === "string" ? row.announcement : DEFAULT_SHOP_INFO.announcement,
    footerAbout: str(row.footer_about, DEFAULT_SHOP_INFO.footerAbout),
    facebookUrl: str(row.facebook_url, DEFAULT_SHOP_INFO.facebookUrl),
    instagramUrl: str(row.instagram_url, DEFAULT_SHOP_INFO.instagramUrl),

    metaTitle: str(row.meta_title, DEFAULT_SHOP_INFO.metaTitle),
    metaDescription: str(row.meta_description, DEFAULT_SHOP_INFO.metaDescription),

    is_open: typeof row.is_open === "boolean" ? row.is_open : DEFAULT_SHOP_INFO.is_open,
  };
}

export function shopInfoToDb(input: any): Record<string, any> {
  const fields: Array<[string, string]> = [
    ["name", "name"],
    ["heroTitle", "hero_title"],
    ["heroSubtitle", "hero_subtitle"],
    ["heroBadge", "hero_badge"],
    ["heroImage", "hero_image"],
    ["heroFeaturedName", "hero_featured_name"],
    ["heroFeaturedDesc", "hero_featured_desc"],
    ["heroFeaturedBadge", "hero_featured_badge"],
    ["heroHoursNote", "hero_hours_note"],
    ["heroDeliveryNote", "hero_delivery_note"],
    ["heroCtaText", "hero_cta_text"],
    ["heroFeatures", "hero_features"],
    ["aboutTitle", "about_title"],
    ["aboutStory", "about_story"],
    ["aboutImage", "about_image"],
    ["aboutHighlights", "about_highlights"],
    ["aboutStatYear", "about_stat_year"],
    ["aboutStatLabel", "about_stat_label"],
    ["aboutBadge", "about_badge"],
    ["aboutBadgeSub", "about_badge_sub"],
    ["catalogTitle", "catalog_title"],
    ["catalogSubtitle", "catalog_subtitle"],
    ["catalogBadge", "catalog_badge"],
    ["categories", "categories"],
    ["phone1", "phone1"],
    ["phone2", "phone2"],
    ["whatsapp", "whatsapp"],
    ["hours", "hours"],
    ["hoursNote", "hours_note"],
    ["address", "address"],
    ["addressNote", "address_note"],
    ["mapUrl", "map_url"],
    ["announcement", "announcement"],
    ["footerAbout", "footer_about"],
    ["facebookUrl", "facebook_url"],
    ["instagramUrl", "instagram_url"],
    ["metaTitle", "meta_title"],
    ["metaDescription", "meta_description"],
    ["is_open", "is_open"],
  ];

  const updates: Record<string, any> = {};
  for (const [key, column] of fields) {
    if (input[key] !== undefined) updates[column] = input[key];
  }
  return updates;
}

export function dbRowToDefaultShopInfo(input: any): Record<string, any> {
  const merged = { ...DEFAULT_SHOP_INFO, ...input };
  return shopInfoToDb(merged);
}
