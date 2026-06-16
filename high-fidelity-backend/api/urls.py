from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api.views import BrandViewSet, CategoryViewSet, ProductViewSet, HomePageAPIView, WorkshopAPIView, BusinessSettingsAPIView

router = DefaultRouter()
router.register(r'brands', BrandViewSet, basename='brand')
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'products', ProductViewSet, basename='product')

urlpatterns = [
    path('', include(router.urls)),
    path('homepage/', HomePageAPIView.as_view(), name='homepage'),
    path('workshop/', WorkshopAPIView.as_view(), name='workshop'),
    path('business-settings/', BusinessSettingsAPIView.as_view(), name='business-settings'),
]
