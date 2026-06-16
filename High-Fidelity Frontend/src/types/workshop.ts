export interface WorkshopGalleryItemData {
  type: "image" | "video";
  url: string;
}

export interface WorkshopData {
  hero_title: string;
  hero_description: string;
  hero_image: string | null;
  hero_cta_text: string;
  hero_cta_link: string;
  usp_image: string | null;
  usp_badge: string;
  usp_badge_text: string;
  usp_title: string;
  usp_description_1: string;
  usp_description_2: string;
  usp_bullets: string[];
  services: Array<{ title: string; desc: string }>;
  gallery_images: string[];
  gallery_items?: WorkshopGalleryItemData[];
  cta_title: string;
  cta_description: string;
  cta_whatsapp_link: string;
  seo_title?: string;
  search_description?: string;
  og_image?: string | null;
}
