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
    price = models.CharField(
        max_length=100, 
        help_text="Enter ONLY the numeric value (e.g., 2499). Automatically treated as MYR."
    )
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

    @property
    def admin_display_price(self):
        # Strip non-numeric characters just in case, though it should be clean going forward
        cleaned_price = ''.join(c for c in self.price if c.isdigit() or c == '.')
        if not cleaned_price:
            return "RM 0"
        try:
            val = float(cleaned_price)
            # Format with commas
            return f"RM {val:,.0f}" if val.is_integer() else f"RM {val:,.2f}"
        except ValueError:
            return f"RM {self.price}"
    
    admin_display_price.fget.short_description = 'Price'

    def __str__(self):
        return f"{self.brand.name} {self.name}"
