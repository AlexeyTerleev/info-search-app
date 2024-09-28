import requests

from bs4 import BeautifulSoup
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from info_search.models import Page
from info_search.serializers import PageSerializer


class ScrapePageView(APIView):
    def get(self, request, pk=None):
        if pk is not None:
            try:
                page = Page.objects.get(pk=pk)
                serializer = PageSerializer(page)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Page.DoesNotExist:
                return Response({"error": "Page not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({"error": "Page ID is required"}, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        url = request.data.get('url') 
        
        if not url:
            return Response({"error": "URL parameter is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            response = requests.get(url)
            status_code = response.status_code
            if status_code != 200:
                return Response({"error": f"Failed to fetch page. Status code: {status_code}"}, 
                                status=status.HTTP_400_BAD_REQUEST)
            
            page_title, text_content = self.parse_content(url, response.content)
            page, _ = Page.objects.update_or_create(url=url, defaults={'title': page_title, 'content': text_content})
            
            serializer = PageSerializer(page)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        except requests.exceptions.RequestException as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

    def parse_content(self, url, content):
        soup = BeautifulSoup(content, 'html.parser')
        text_content = ' '.join(soup.stripped_strings)
        title_tag = soup.find('title')
        page_title = title_tag.text.strip() if title_tag else url
        return page_title, text_content
