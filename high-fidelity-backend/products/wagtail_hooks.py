from wagtail.snippets.models import register_snippet
from wagtail.snippets.views.snippets import SnippetViewSet
from .models import Product

class ProductViewSet(SnippetViewSet):
    model = Product
    menu_label = 'Products'
    icon = 'tag'
    menu_order = 200
    add_to_admin_menu = True
    list_display = ('name', 'brand', 'category', 'admin_display_price', 'is_featured')
    search_fields = ('name', 'brand__name', 'category__name')

register_snippet(ProductViewSet)
