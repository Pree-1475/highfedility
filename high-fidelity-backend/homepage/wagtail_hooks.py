from wagtail import hooks
from wagtail.admin.menu import MenuItem
from django.urls import reverse
from wagtail.models import Site

@hooks.register('construct_settings_menu')
def hide_business_settings(request, menu_items):
    menu_items[:] = [item for item in menu_items if item.name != 'businesssettings']

@hooks.register('construct_main_menu')
def hide_documents(request, menu_items):
    menu_items[:] = [item for item in menu_items if item.name != 'documents']

class StoreSettingsMenuItem(MenuItem):
    def is_shown(self, request):
        return request.user.has_perm('homepage.change_businesssettings')

    @property
    def url(self):
        try:
            site = Site.objects.get(is_default_site=True)
            return reverse('wagtailsettings:edit', args=['homepage', 'businesssettings', site.pk])
        except Exception:
            # Fallback if site cannot be determined
            return '#'

    @url.setter
    def url(self, value):
        pass

@hooks.register('register_admin_menu_item')
def register_store_settings():
    return StoreSettingsMenuItem(
        'Store Details',
        '#',
        icon_name='site',
        order=250 # Usually below snippets
    )
