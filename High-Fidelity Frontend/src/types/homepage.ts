import { Product } from "./product";

export interface HomePageData {
  hero_subtitle: string;
  hero_title: string;
  hero_description: string;
  hero_primary_cta_text: string;
  hero_primary_cta_link: string;
  hero_secondary_cta_text: string;
  hero_secondary_cta_link: string;
  hero_stats: Array<{ val: string; label: string }>;
  pillars: Array<{ title: string; desc: string; link: string; icon_name: string }>;
  why_cards: Array<{
    card_number: string;
    label: string;
    title: string;
    body: string;
    image: string | null;
    video_url: string;
  }>;
  featured_products: Product[];
  custom_bats_image: string | null;
  custom_bats_title: string;
  custom_bats_description: string;
  custom_bats_primary_cta_text: string;
  custom_bats_primary_cta_link: string;
  custom_bats_secondary_cta_text: string;
  custom_bats_secondary_cta_link: string;
  custom_bats_tags: string;
  visit_title: string;
  visit_address: string;
  visit_phone: string;
  visit_whatsapp: string;
  visit_directions_link: string;
  visit_image: string | null;
  operating_hours: Array<{ day: string; time: string }>;
  footer_text: string;
  footer_address: string;
  footer_phone: string;
  footer_email: string;
  footer_whatsapp: string;
  footer_copyright: string;
  seo_title?: string;
  search_description?: string;
  og_image?: string | null;
}
