from django.urls import path
from rest_framework.routers import DefaultRouter

from info_search.views import ScrapePageView, PageSearchAPIView

router = DefaultRouter()

urlpatterns = [
    path('pages/', ScrapePageView.as_view(), name='scrape-page'),
    path('pages/<int:pk>/', ScrapePageView.as_view(), name='get-page'), 
    path('search/', PageSearchAPIView.as_view(), name='search-pages')
] + router.urls
