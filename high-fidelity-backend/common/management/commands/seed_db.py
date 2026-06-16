from django.core.management.base import BaseCommand
from django.contrib.contenttypes.models import ContentType
from wagtail.models import Page, Site
from brands.models import Brand
from store_collections.models import Category
from products.models import Product
from homepage.models import HomePage, BusinessSettings, BusinessSettingsOperatingHour
from workshop.models import WorkshopPage, WorkshopGalleryItem

class Command(BaseCommand):
    help = "Seeds the database with MR WILLOW catalog, homepage, workshop, and global business settings"

    def handle(self, *args, **options):
        self.stdout.write("Seeding database...")

        # 1. Clean existing content if any
        # Delete Pages except the root
        try:
            root = Page.objects.get(id=1)
            for child in root.get_children():
                child.delete()
        except Page.DoesNotExist:
            # Recreate root if missing
            root = Page.objects.create(
                title="Root",
                slug="root",
                depth=1,
                path="0001",
                numchild=0
            )

        Brand.objects.all().delete()
        Category.objects.all().delete()
        Product.objects.all().delete()
        BusinessSettings.objects.all().delete()

        # 2. Create Brands
        brands_data = ["GM", "Kookaburra", "DSC", "SS Ton", "SG", "Gray-Nicolls", "New Balance", "Shrey", "Masuri", "MR.WILLOW"]
        brands_map = {}
        for b_name in brands_data:
            slug = b_name.lower().replace(" ", "-").replace(".", "")
            brand = Brand.objects.create(name=b_name, slug=slug)
            brands_map[b_name] = brand

        # 3. Create Categories
        categories_data = [
            ("Cricket Bats", "cricket-bats", "Premium English Willow, Kashmir Willow and training bats."),
            ("Batting Gloves", "batting-gloves", "Adult and junior batting gloves for match and training play."),
            ("Protection Gear", "protection-gear", "Batting pads, thigh guards, helmets, and other safety equipment."),
            ("Cricket Shoes", "cricket-shoes", "Batting spikes, bowling spikes, and all-round rubber shoes."),
            ("Wicket Keeping Gear", "wicket-keeping-gear", "Keeping gloves, keeping pads, and inner gloves."),
            ("Kit Bags", "kit-bags", "Duffle and wheelie kit bags in adult and junior sizes."),
            ("Cricket Balls", "cricket-balls", "Leather match balls, tennis balls, and training windballs."),
            ("Coaching Gear", "coaching-gear", "Sidearms, field cones, marker discs, and training equipment."),
            ("Wickets & Stumps", "wickets-stumps", "Match stumps, spring-back stumps, and plastic training stumps."),
            ("Accessories", "accessories", "Bat grips, grip cones, bat covers, and other accessories."),
        ]
        categories_map = {}
        for name, slug, desc in categories_data:
            cat = Category.objects.create(name=name, slug=slug, description=desc)
            categories_map[name] = cat

        # 4. Create Products
        products_data = [
            ("SS Ton", "Elite Cricket Bat", "English Willow • Grade 1", "Cricket Bats", "English Willow", "RM 2,400", "object-top"),
            ("SS Ton", "Gladiator Bat", "English Willow • Grade 2", "Cricket Bats", "English Willow", "RM 1,800", "object-center"),
            ("Kookaburra", "Kahuna Pro Bat", "Kashmir Willow", "Cricket Bats", "Kashmir Willow", "RM 450", "object-bottom"),
            ("Kookaburra", "Pro 1.0 Batting Gloves", "Premium Adult Gloves", "Batting Gloves", "Adult Gloves", "RM 320", "object-center"),
            ("Gray-Nicolls", "Legend Batting Gloves", "Match Playing Gloves", "Batting Gloves", "Match Gloves", "RM 410", "object-top"),
            ("Masuri", "Vision Series Abdominal Guard", "Maximum Protection Guard", "Protection Gear", "Abdominal Guards", "RM 80", "object-center"),
            ("SS Ton", "Custom Thigh Pad", "Double Thigh Guard Protection", "Protection Gear", "Thigh Guards", "RM 480", "object-top"),
            ("New Balance", "CK4040 Cricket Shoes", "All-Round spikes and rubber shoes", "Cricket Shoes", "All-Round Shoes", "RM 550", "object-center"),
            ("Kookaburra", "Turf Leather Ball", "Match Quality Leather Ball", "Cricket Balls", "Leather Balls", "RM 95", "object-center"),
            ("MR.WILLOW", "Pro Bat Grip", "Octopus Pattern Grip", "Accessories", "Bat Grips", "RM 25", "object-top"),
            ("Gray-Nicolls", "Legend Batting Pads", "Traditional Design Pads", "Protection Gear", "Batting Pads", "RM 520", "object-center"),
            ("GM", "Diamond English Willow Bat", "English Willow • Grade 1+", "Cricket Bats", "English Willow", "RM 2,100", "object-top"),
            ("Kookaburra", "Pro Training ball", "High Quality Training ball", "Cricket Balls", "Training Balls", "RM 65", "object-center"),
            ("MR.WILLOW", "Match Wooden Stumps Set", "Match Grade Wooden Stumps", "Wickets & Stumps", "Match Stumps", "RM 180", "object-center"),
            ("Kookaburra", "Pro Wicket Keeping Gloves", "Elite Keeping Gloves", "Wicket Keeping Gear", "Keeping Gloves", "RM 390", "object-center"),
            ("Gray-Nicolls", "Pro Wheelie Kit Bag", "Wheelie Kit Bag with multi-compartments", "Kit Bags", "Wheel Bags", "RM 340", "object-center"),
            ("MR.WILLOW", "Elite Thrower throw-arm", "Sidearm Thrower Elite", "Coaching Gear", "Sidearm Throwers", "RM 150", "object-center"),
            ("MR.WILLOW", "Marker Discs Set", "Multi-color field marker discs", "Coaching Gear", "Marker Discs", "RM 40", "object-center"),
            ("Gray-Nicolls", "Kashmir Willow Practice Bat", "Kashmir Willow practice bat", "Cricket Bats", "Kashmir Willow", "RM 320", "object-center"),
            ("MR.WILLOW", "Spring Back Wooden Stumps", "Spring back stumps set", "Wickets & Stumps", "Spring Back Stumps", "RM 220", "object-center")
        ]
        created_products = []
        for b_name, name, sub, c_name, type_val, price, pos in products_data:
            prod = Product.objects.create(
                brand=brands_map[b_name],
                name=name,
                sub=sub,
                category=categories_map[c_name],
                type=type_val,
                price=price,
                pos=pos,
                is_featured=True if b_name in ["SS Ton", "GM", "Kookaburra", "New Balance", "Gray-Nicolls"] and "Gloves" not in name and "Pads" not in name else False
            )
            created_products.append(prod)

        # 5. Create Custom HomePage
        homepage_content_type = ContentType.objects.get_for_model(HomePage)
        homepage = HomePage(
            title="MR.WILLOW",
            draft_title="MR.WILLOW",
            slug="home-page",
            content_type=homepage_content_type,
            hero_subtitle="Johor Bahru · Malaysia",
            hero_title="WHERE\nCRICKET\nGETS\nSERIOUS.",
            hero_description="Premium equipment, expert bat knocking, and coaching for every level of the game — all under one roof.",
        )
        root.add_child(instance=homepage)

        # 6. Create Custom WorkshopPage
        workshop_content_type = ContentType.objects.get_for_model(WorkshopPage)
        workshop = WorkshopPage(
            title="Workshop & Services",
            draft_title="Workshop & Services",
            slug="services",
            content_type=workshop_content_type,
        )
        homepage.add_child(instance=workshop)

        # Create Workshop Gallery Items from existing Wagtail images
        from wagtail.images.models import Image
        images = list(Image.objects.all())
        for idx, img in enumerate(images):
            WorkshopGalleryItem.objects.create(
                page=workshop,
                sort_order=idx,
                image=img
            )
        # Also add a video item for demonstration
        WorkshopGalleryItem.objects.create(
            page=workshop,
            sort_order=len(images),
            video_url="https://assets.mixkit.co/videos/preview/mixkit-cricket-player-batting-in-nets-practice-42211-large.mp4"
        )

        # 7. Update Site settings to point to new HomePage
        site = Site.objects.first()
        if site:
            site.root_page = homepage
            site.save()
        else:
            site = Site.objects.create(
                hostname="localhost",
                port=8000,
                root_page=homepage,
                is_default_site=True
            )

        business_settings = BusinessSettings.objects.create(
            site=site,
            announcement_text="✦  Free Bat Knocking With Every Bat Purchase  ·  Visit Us In Johor Bahru  ✦",
            custom_bat_orders_enabled=True,
            whatsapp_number="+60 12-345 6789",
            whatsapp_url="https://wa.me/60123456789",
            phone="+60 7-334 5678",
            email="hello@mrwillow.my",
            store_name="MR.WILLOW Cricket Store",
            address="No. 12, Jalan Perang\nTaman Perang, 80150\nJohor Bahru, Johor",
            google_maps_link="https://maps.google.com",
            instagram_url="https://instagram.com",
            tiktok_url="https://tiktok.com",
            youtube_url="https://youtube.com"
        )
        BusinessSettingsOperatingHour.objects.create(setting=business_settings, sort_order=0, day="Monday – Friday", time="10:00 AM – 9:00 PM")
        BusinessSettingsOperatingHour.objects.create(setting=business_settings, sort_order=1, day="Saturday", time="9:00 AM – 9:00 PM")
        BusinessSettingsOperatingHour.objects.create(setting=business_settings, sort_order=2, day="Sunday", time="11:00 AM – 6:00 PM")

        self.stdout.write(self.style.SUCCESS("Database seeded successfully!"))
