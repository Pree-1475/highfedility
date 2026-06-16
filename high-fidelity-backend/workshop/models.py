from django.db import models
from modelcluster.fields import ParentalKey
from wagtail.models import Page, Orderable
from wagtail.admin.panels import FieldPanel, InlinePanel

class WorkshopPage(Page):
    og_image = models.ForeignKey(
        'wagtailimages.Image',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+'
    )

    content_panels = Page.content_panels + [
        InlinePanel('gallery_items', label="Gallery Items (Photos/Videos)"),
    ]

    promote_panels = Page.promote_panels + [
        FieldPanel('og_image'),
    ]

class WorkshopGalleryItem(Orderable):
    page = ParentalKey(WorkshopPage, on_delete=models.CASCADE, related_name='gallery_items')
    image = models.ForeignKey(
        'wagtailimages.Image',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+'
    )
    video_url = models.URLField(
        blank=True, 
        max_length=500, 
        help_text="Optional: Enter a video URL. If provided, this item will render as a video in the gallery."
    )
    
    panels = [
        FieldPanel('image'),
        FieldPanel('video_url'),
    ]
