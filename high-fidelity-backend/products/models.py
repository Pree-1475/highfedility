from django.db import models
from wagtail.snippets.models import register_snippet
from wagtail.admin.panels import FieldPanel
from brands.models import Brand
from store_collections.models import Category

class Product(models.Model):
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE, related_name='products')
    name = models.CharField(max_length=255)
    sub = models.CharField(max_length=255, blank=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')
    type = models.CharField(max_length=255, blank=True)
    price = models.CharField(max_length=100)
    photo = models.ForeignKey(
        'wagtailimages.Image',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+'
    )
    pos = models.CharField(max_length=100, default="object-center")
    is_featured = models.BooleanField(default=False, help_text="Show this product on the Homepage Featured section")

    panels = [
        FieldPanel('brand'),
        FieldPanel('name'),
        FieldPanel('sub'),
        FieldPanel('category'),
        FieldPanel('type'),
        FieldPanel('price'),
        FieldPanel('photo'),
        FieldPanel('pos'),
        FieldPanel('is_featured'),
    ]

    def __str__(self):
        return f"{self.brand.name} {self.name}"
