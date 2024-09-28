from django.urls import path
from rest_framework.routers import DefaultRouter

from info_search.views import ScrapePageView

router = DefaultRouter()

urlpatterns = [
    path('scrape/', ScrapePageView.as_view(), name='scrape-page'),
    path('page/<int:pk>/', ScrapePageView.as_view(), name='get-page'), 
] + router.urls
