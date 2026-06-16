from rest_framework import viewsets, response, views
from django.db.models import Q
from brands.models import Brand
from store_collections.models import Category
from products.models import Product
from homepage.models import HomePage, BusinessSettings
from workshop.models import WorkshopPage

from api.serializers import (
    BrandSerializer,
    CategorySerializer,
    ProductSerializer,
    HomePageSerializer,
    WorkshopPageSerializer,
    BusinessSettingsSerializer
)

class BrandViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Brand.objects.all().order_by('name')
    serializer_class = BrandSerializer

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all().order_by('id')
    serializer_class = CategorySerializer

class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.all().order_by('id')
    serializer_class = ProductSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        category_param = self.request.query_params.get('category')
        type_param = self.request.query_params.get('type')
        is_featured_param = self.request.query_params.get('is_featured')

        if category_param:
            queryset = queryset.filter(
                Q(category__slug__iexact=category_param) |
                Q(category__name__iexact=category_param)
            )

        if type_param:
            queryset = queryset.filter(type__iexact=type_param)

        if is_featured_param and is_featured_param.lower() == 'true':
            queryset = queryset.filter(is_featured=True)

        return queryset

class HomePageAPIView(views.APIView):
    def get(self, request, *args, **kwargs):
        homepage = HomePage.objects.live().first()
        if not homepage:
            homepage = HomePage.objects.first()
            if not homepage:
                return response.Response({"detail": "HomePage not found"}, status=404)
        serializer = HomePageSerializer(homepage, context={'request': request})
        return response.Response(serializer.data)

class WorkshopAPIView(views.APIView):
    def get(self, request, *args, **kwargs):
        workshop = WorkshopPage.objects.live().first()
        if not workshop:
            workshop = WorkshopPage.objects.first()
            if not workshop:
                return response.Response({"detail": "WorkshopPage not found"}, status=404)
        serializer = WorkshopPageSerializer(workshop, context={'request': request})
        return response.Response(serializer.data)

class BusinessSettingsAPIView(views.APIView):
    def get(self, request, *args, **kwargs):
        from wagtail.models import Site
        site = Site.find_for_request(request)
        if not site:
            site = Site.objects.filter(is_default_site=True).first()
        settings = BusinessSettings.for_site(site)
        serializer = BusinessSettingsSerializer(settings, context={'request': request})
        return response.Response(serializer.data)
