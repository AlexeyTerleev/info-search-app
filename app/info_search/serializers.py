from rest_framework import serializers
from info_search.models import Page


class PageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Page
        fields = ['url', 'title', 'content', 'last_scraped']
