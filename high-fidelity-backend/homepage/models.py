from django.db import models
from modelcluster.fields import ParentalKey
from modelcluster.models import ClusterableModel
from wagtail.models import Page, Orderable
from wagtail.admin.panels import FieldPanel, InlinePanel, MultiFieldPanel
from wagtail.contrib.settings.models import BaseSiteSetting, register_setting

@register_setting
class BusinessSettings(BaseSiteSetting, ClusterableModel):
    announcement_text = models.CharField(
        max_length=255, 
        default="✦  Free Bat Knocking With Every Bat Purchase  ·  Visit Us In Johor Bahru  ✦"
    )
    custom_bat_orders_enabled = models.BooleanField(
        default=True,
        verbose_name="Custom Bat Orders Enabled",
        help_text="Enable or disable custom bat enquiries site-wide."
    )
    
    # Global contact settings
    whatsapp_number = models.CharField(max_length=50, default="+60 12-345 6789")
    whatsapp_url = models.CharField(max_length=255, default="https://wa.me/60123456789")
    phone = models.CharField(max_length=50, default="+60 7-334 5678")
    email = models.CharField(max_length=100, default="hello@mrwillow.my")
    
    # Global store information
    store_name = models.CharField(max_length=100, default="MR.WILLOW Cricket Store")
    address = models.TextField(default="No. 12, Jalan Perang\nTaman Perang, 80150\nJohor Bahru, Johor")
    google_maps_link = models.URLField(max_length=500, default="https://maps.google.com")
    
    # Global social links
    instagram_url = models.URLField(max_length=500, blank=True, default="https://instagram.com")
    tiktok_url = models.URLField(max_length=500, blank=True, default="https://tiktok.com")
    youtube_url = models.URLField(max_length=500, blank=True, default="https://youtube.com")

    panels = [
        FieldPanel('announcement_text'),
        FieldPanel('custom_bat_orders_enabled'),
        MultiFieldPanel([
            FieldPanel('whatsapp_number'),
            FieldPanel('whatsapp_url'),
            FieldPanel('phone'),
            FieldPanel('email'),
        ], heading="Global Contact Settings"),
        MultiFieldPanel([
            FieldPanel('store_name'),
            FieldPanel('address'),
            FieldPanel('google_maps_link'),
            InlinePanel('operating_hours', label="Operating Hours"),
        ], heading="Global Store Information"),
        MultiFieldPanel([
            FieldPanel('instagram_url'),
            FieldPanel('tiktok_url'),
            FieldPanel('youtube_url'),
        ], heading="Global Social Links"),
    ]

class BusinessSettingsOperatingHour(Orderable):
    setting = ParentalKey(BusinessSettings, on_delete=models.CASCADE, related_name='operating_hours')
    day = models.CharField(max_length=100)
    time = models.CharField(max_length=100)
    
    panels = [
        FieldPanel('day'),
        FieldPanel('time'),
    ]

class HomePage(Page):
    # Hero Section
    hero_subtitle = models.CharField(default='Johor Bahru · Malaysia', max_length=255)
    hero_title = models.TextField(default='WHERE\nCRICKET\nGETS\nSERIOUS.')
    hero_description = models.TextField(blank=True)
    
    og_image = models.ForeignKey(
        'wagtailimages.Image',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+'
    )

    content_panels = Page.content_panels + [
        MultiFieldPanel([
            FieldPanel('hero_subtitle'),
            FieldPanel('hero_title'),
            FieldPanel('hero_description'),
        ], heading="Hero Section"),
    ]

    promote_panels = Page.promote_panels + [
        FieldPanel('og_image'),
    ]
