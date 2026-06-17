export interface BusinessSettingsData {
  announcement_enabled: boolean;
  announcement_text: string;
  whatsapp_number: string;
  whatsapp_url: string;
  phone: string;
  email: string;
  store_name: string;
  address: string;
  google_maps_link: string;
  instagram_url: string;
  tiktok_url: string;
  youtube_url: string;
  custom_bat_orders_enabled: boolean;
  operating_hours: Array<{ day: string; time: string }>;
}
