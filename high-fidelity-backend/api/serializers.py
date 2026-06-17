from rest_framework import serializers
from wagtail.models import Site
from brands.models import Brand
from store_collections.models import Category
from products.models import Product
from homepage.models import HomePage, BusinessSettings, BusinessSettingsOperatingHour
from workshop.models import WorkshopPage, WorkshopGalleryItem

def get_image_url(image, request=None):
    if not image:
        return None
    url = image.file.url
    if url.startswith('/'):
        if request:
            return request.build_absolute_uri(url)
        return f"http://localhost:8000{url}"
    return url

class BrandSerializer(serializers.ModelSerializer):
    logo = serializers.SerializerMethodField()

    class Meta:
        model = Brand
        fields = ['id', 'name', 'slug', 'logo']

    def get_logo(self, obj):
        return get_image_url(obj.logo, self.context.get('request'))

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description']

class ProductSerializer(serializers.ModelSerializer):
    brand = serializers.CharField(source='brand.name')
    brand_slug = serializers.CharField(source='brand.slug')
    category = serializers.CharField(source='category.name')
    category_slug = serializers.CharField(source='category.slug')
    photo = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ['id', 'brand', 'brand_slug', 'name', 'sub', 'category', 'category_slug', 'type', 'price', 'photo', 'pos', 'is_featured']

    def get_photo(self, obj):
        return get_image_url(obj.photo, self.context.get('request'))

# Global Business Settings Serializers
class BusinessSettingsOperatingHourSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessSettingsOperatingHour
        fields = ['day', 'time']

class BusinessSettingsSerializer(serializers.ModelSerializer):
    operating_hours = BusinessSettingsOperatingHourSerializer(many=True, read_only=True)

    class Meta:
        model = BusinessSettings
        fields = [
            'announcement_enabled',
            'announcement_text',
            'whatsapp_number',
            'whatsapp_url',
            'phone',
            'email',
            'store_name',
            'address',
            'google_maps_link',
            'instagram_url',
            'tiktok_url',
            'youtube_url',
            'custom_bat_orders_enabled',
            'operating_hours'
        ]

# HomePage Serializer
class HomePageSerializer(serializers.ModelSerializer):
    # Dynamic settings-injected fields
    visit_address = serializers.SerializerMethodField()
    visit_phone = serializers.SerializerMethodField()
    visit_whatsapp = serializers.SerializerMethodField()
    visit_directions_link = serializers.SerializerMethodField()
    operating_hours = serializers.SerializerMethodField()
    footer_text = serializers.SerializerMethodField()
    footer_address = serializers.SerializerMethodField()
    footer_phone = serializers.SerializerMethodField()
    footer_email = serializers.SerializerMethodField()
    footer_whatsapp = serializers.SerializerMethodField()
    footer_copyright = serializers.SerializerMethodField()

    # Static/computed fields for compatibility
    hero_primary_cta_text = serializers.SerializerMethodField()
    hero_primary_cta_link = serializers.SerializerMethodField()
    hero_secondary_cta_text = serializers.SerializerMethodField()
    hero_secondary_cta_link = serializers.SerializerMethodField()
    hero_stats = serializers.SerializerMethodField()
    pillars = serializers.SerializerMethodField()
    why_cards = serializers.SerializerMethodField()
    featured_products = serializers.SerializerMethodField()

    custom_bats_title = serializers.SerializerMethodField()
    custom_bats_description = serializers.SerializerMethodField()
    custom_bats_image = serializers.SerializerMethodField()
    custom_bats_primary_cta_text = serializers.SerializerMethodField()
    custom_bats_primary_cta_link = serializers.SerializerMethodField()
    custom_bats_secondary_cta_text = serializers.SerializerMethodField()
    custom_bats_secondary_cta_link = serializers.SerializerMethodField()
    custom_bats_tags = serializers.SerializerMethodField()

    visit_title = serializers.SerializerMethodField()
    visit_image = serializers.SerializerMethodField()

    # SEO metadata fields
    seo_title = serializers.ReadOnlyField()
    search_description = serializers.ReadOnlyField()
    og_image = serializers.SerializerMethodField()

    class Meta:
        model = HomePage
        fields = [
            'hero_subtitle', 'hero_title', 'hero_description',
            'hero_primary_cta_text', 'hero_primary_cta_link',
            'hero_secondary_cta_text', 'hero_secondary_cta_link',
            'hero_stats', 'pillars', 'why_cards', 'featured_products',
            'custom_bats_title', 'custom_bats_description', 'custom_bats_image',
            'custom_bats_primary_cta_text', 'custom_bats_primary_cta_link',
            'custom_bats_secondary_cta_text', 'custom_bats_secondary_cta_link',
            'custom_bats_tags',
            'visit_title', 'visit_address', 'visit_phone', 'visit_whatsapp',
            'visit_directions_link', 'visit_image', 'operating_hours',
            'footer_text', 'footer_address', 'footer_phone', 'footer_email',
            'footer_whatsapp', 'footer_copyright',
            'seo_title', 'search_description', 'og_image'
        ]

    def get_business_settings(self, obj):
        try:
            site = obj.get_site()
        except Exception:
            site = None
        if not site:
            site = Site.objects.filter(is_default_site=True).first()
        return BusinessSettings.for_site(site)

    def get_visit_address(self, obj):
        return self.get_business_settings(obj).address

    def get_visit_phone(self, obj):
        return self.get_business_settings(obj).phone

    def get_visit_whatsapp(self, obj):
        return self.get_business_settings(obj).whatsapp_url

    def get_visit_directions_link(self, obj):
        return self.get_business_settings(obj).google_maps_link

    def get_operating_hours(self, obj):
        settings = self.get_business_settings(obj)
        return BusinessSettingsOperatingHourSerializer(settings.operating_hours.all(), many=True).data

    def get_footer_text(self, obj):
        settings = self.get_business_settings(obj)
        return f"{settings.store_name} - Johor Bahru's premier cricket destination. Equipment, training, and expertise for every player."

    def get_footer_address(self, obj):
        return self.get_business_settings(obj).address

    def get_footer_phone(self, obj):
        return self.get_business_settings(obj).phone

    def get_footer_email(self, obj):
        return self.get_business_settings(obj).email

    def get_footer_whatsapp(self, obj):
        return self.get_business_settings(obj).whatsapp_url

    def get_footer_copyright(self, obj):
        settings = self.get_business_settings(obj)
        return f"© 2024 {settings.store_name}. All rights reserved."

    def get_hero_primary_cta_text(self, obj):
        return "Visit Our Store"

    def get_hero_primary_cta_link(self, obj):
        return "/contact"

    def get_hero_secondary_cta_text(self, obj):
        return "Contact Us"

    def get_hero_secondary_cta_link(self, obj):
        return self.get_business_settings(obj).whatsapp_url

    def get_hero_stats(self, obj):
        return [
            {"val": "2018", "label": "Est."},
            {"val": "500+", "label": "Bats Knocked"},
            {"val": "#1", "label": "Cricket Store in JB"}
        ]

    def get_pillars(self, obj):
        return [
            {"title": "EQUIPMENT", "desc": "Bats, gear and accessories from trusted brands.", "link": "/collections", "icon_name": "Package"},
            {"title": "BAT KNOCKING", "desc": "Professional preparation for match-ready performance.", "link": "/services", "icon_name": "Hammer"},
            {"title": "REPAIRS", "desc": "Restore performance and extend equipment lifespan.", "link": "/services", "icon_name": "Wrench"},
            {"title": "CUSTOM BATS", "desc": "Built and prepared for your game.", "link": "/custom-bats", "icon_name": "Swords"},
            {"title": "TRAIN & PLAY", "desc": "Facilities, equipment and cricket essentials.", "link": "/training", "icon_name": "Users"}
        ]

    def get_why_cards(self, obj):
        return [
            {"card_number": "01", "label": "COMPLIMENTARY SERVICE", "title": "FREE BAT KNOCKING", "body": "Every bat purchased from MR WILLOW includes complimentary bat knocking, helping prepare it for match play while improving durability and performance.", "image": None, "video_url": "https://assets.mixkit.co/videos/preview/mixkit-cricket-player-batting-in-nets-practice-42211-large.mp4"},
            {"card_number": "02", "label": "IN-HOUSE EXPERTISE", "title": "OWN WORKSHOP", "body": "Repairs, maintenance and bat care handled in-house by people who understand cricket equipment.", "image": None, "video_url": ""},
            {"card_number": "03", "label": "PREMIUM SELECTION", "title": "TRUSTED BRANDS", "body": "Equipment from the brands players already know and trust.", "image": None, "video_url": ""},
            {"card_number": "04", "label": "PERSONALIZED SERVICE", "title": "EXPERT ADVICE", "body": "Get recommendations based on age, skill level, playing style and budget.", "image": None, "video_url": ""}
        ]

    def get_featured_products(self, obj):
        featured = Product.objects.filter(is_featured=True)[:5]
        return ProductSerializer(featured, many=True, context=self.context).data

    def get_custom_bats_title(self, obj):
        return "Crafted\nTo Your\nGame."

    def get_custom_bats_description(self, obj):
        return "Every MR.WILLOW custom bat begins with a conversation. Preferred weight, balance, handle type, and edge thickness — handcrafted for the way you play."

    def get_custom_bats_image(self, obj):
        return None

    def get_custom_bats_primary_cta_text(self, obj):
        return "Start Your Order"

    def get_custom_bats_primary_cta_link(self, obj):
        return "/custom-bats"

    def get_custom_bats_secondary_cta_text(self, obj):
        return "Ask Us"

    def get_custom_bats_secondary_cta_link(self, obj):
        return self.get_business_settings(obj).whatsapp_url

    def get_custom_bats_tags(self, obj):
        return "English Willow, Kashmir Willow, Custom Weight, Handle Preference, Grip Selection"

    def get_visit_title(self, obj):
        return "Come See Us In Johor Bahru."

    def get_visit_image(self, obj):
        return None

    def get_og_image(self, obj):
        return get_image_url(obj.og_image, self.context.get('request'))

# WorkshopGalleryItem Serializer
class WorkshopGalleryItemSerializer(serializers.ModelSerializer):
    type = serializers.SerializerMethodField()
    url = serializers.SerializerMethodField()

    class Meta:
        model = WorkshopGalleryItem
        fields = ['type', 'url']

    def get_type(self, obj):
        return "video" if obj.video_url else "image"

    def get_url(self, obj):
        if obj.video_url:
            return obj.video_url
        return get_image_url(obj.image, self.context.get('request'))

# WorkshopPage Serializer
class WorkshopPageSerializer(serializers.ModelSerializer):
    services = serializers.SerializerMethodField()
    usp_bullets = serializers.SerializerMethodField()
    gallery_images = serializers.SerializerMethodField()
    gallery_items = WorkshopGalleryItemSerializer(many=True, read_only=True)
    
    # Static copy fields for compatibility
    hero_title = serializers.SerializerMethodField()
    hero_description = serializers.SerializerMethodField()
    hero_image = serializers.SerializerMethodField()
    hero_cta_text = serializers.SerializerMethodField()
    hero_cta_link = serializers.SerializerMethodField()
    
    usp_image = serializers.SerializerMethodField()
    usp_badge = serializers.SerializerMethodField()
    usp_badge_text = serializers.SerializerMethodField()
    usp_title = serializers.SerializerMethodField()
    usp_description_1 = serializers.SerializerMethodField()
    usp_description_2 = serializers.SerializerMethodField()
    
    cta_title = serializers.SerializerMethodField()
    cta_description = serializers.SerializerMethodField()
    cta_whatsapp_link = serializers.SerializerMethodField()

    # SEO metadata fields
    seo_title = serializers.ReadOnlyField()
    search_description = serializers.ReadOnlyField()
    og_image = serializers.SerializerMethodField()

    class Meta:
        model = WorkshopPage
        fields = [
            'hero_title', 'hero_description', 'hero_image', 'hero_cta_text', 'hero_cta_link',
            'usp_image', 'usp_badge', 'usp_badge_text', 'usp_title', 'usp_description_1', 'usp_description_2',
            'usp_bullets', 'services', 'gallery_images', 'gallery_items',
            'cta_title', 'cta_description', 'cta_whatsapp_link',
            'seo_title', 'search_description', 'og_image'
        ]

    def get_business_settings(self, obj):
        try:
            site = obj.get_site()
        except Exception:
            site = None
        if not site:
            site = Site.objects.filter(is_default_site=True).first()
        return BusinessSettings.for_site(site)

    def get_hero_title(self, obj):
        return "Expert Care.\nPeak Performance."

    def get_hero_description(self, obj):
        return "Professional bat knocking, repairs, and full restoration services by experienced craftsmen to extend the lifespan of your gear."

    def get_hero_image(self, obj):
        return None

    def get_hero_cta_text(self, obj):
        return "Book a Service"

    def get_hero_cta_link(self, obj):
        return self.get_business_settings(obj).whatsapp_url

    def get_usp_image(self, obj):
        return None

    def get_usp_badge(self, obj):
        return "Exclusive"

    def get_usp_badge_text(self, obj):
        return "The Only Knocking Machine in JB"

    def get_usp_title(self, obj):
        return "Ready for\nMatch Play."

    def get_usp_description_1(self, obj):
        return "Properly knocking in a cricket bat is crucial for its performance and longevity. At MR.WILLOW, we operate Johor Bahru's only dedicated bat knocking machine."

    def get_usp_description_2(self, obj):
        return "Our automated process ensures consistent, even compression across the blade and edges, mimicking hours of manual knocking in a fraction of the time."

    def get_usp_bullets(self, obj):
        return [
            "Prevents early cracking and damage",
            "Expands the sweet spot",
            "Improves ping and rebound",
            "Saves you 6-8 hours of manual work"
        ]

    def get_services(self, obj):
        return [
            {"title": "Professional Bat Knocking", "desc": "Machine-assisted knocking for perfect compression and readiness."},
            {"title": "Bat Repair & Restoration", "desc": "Fixing toe damage, edge cracks, and handle replacements."},
            {"title": "Grip Replacement", "desc": "Premium octopus and spiral grips applied professionally."},
            {"title": "Bat Oiling & Sanding", "desc": "Raw linseed oil application and fine sanding to retain moisture."},
            {"title": "Weight Reduction", "desc": "Careful shaving of the profile to reduce pickup weight."},
            {"title": "Toe Guard Application", "desc": "Protective toe guard fitting to prevent water damage and splitting."}
        ]

    def get_gallery_images(self, obj):
        request = self.context.get('request')
        return [get_image_url(g.image, request) for g in obj.gallery_items.all() if g.image and not g.video_url]

    def get_cta_title(self, obj):
        return "Does Your Bat\nNeed Attention?"

    def get_cta_description(self, obj):
        return "Drop by our store in Johor Bahru or message us a photo of your bat for a quick consultation."

    def get_cta_whatsapp_link(self, obj):
        return self.get_business_settings(obj).whatsapp_url

    def get_og_image(self, obj):
        return get_image_url(obj.og_image, self.context.get('request'))
