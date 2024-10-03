import requests

from bs4 import BeautifulSoup
from django.db.models import Q
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from info_search.models import Page
from info_search.serializers import PageSerializer, SearchSerializer



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
    


class PageSearchAPIView(APIView):

    def parse_query(self, query):
        OPERATORS = {
            'OR': (1, lambda x, y: Q(x | y)),
            'AND': (2, lambda x, y: Q(x & y)),
            'NOT': (3, lambda x: Q(~x))
        }

        def parse(formula_string: str):
            for sign in formula_string.replace("(", " ( ").replace(")", " ) ").split():
                if sign != " ":
                    yield sign

        def shunting_yard(parsed_formula):
            stack = []
            for token in parsed_formula:
                if token in OPERATORS:
                    while (stack and stack[-1] != "(" and
                           OPERATORS[token][0] <= OPERATORS[stack[-1]][0]):
                        yield stack.pop()
                    stack.append(token)
                elif token == ")":
                    while stack:
                        element = stack.pop()
                        if element == "(":
                            break
                        yield element
                elif token == "(":
                    stack.append(token)
                else:
                    yield token
            while stack:
                yield stack.pop()

        def calc(polish):
            stack = []
            for token in polish:
                if token in OPERATORS:
                    if token == 'NOT':
                        first = stack.pop()
                        stack.append(OPERATORS[token][1](first))
                    else:
                        second, first = stack.pop(), stack.pop()
                        stack.append(OPERATORS[token][1](first, second))
                else:
                    stack.append(Q(content__icontains=token))
            return stack[0] if stack else Q()
        
        return calc(shunting_yard(parse(query)))

    def get(self, request, *args, **kwargs):
        query = request.GET.get('q', '')  # Get search query from query parameters
        search_results = []
        
        if query:  # Only parse and search if there is a query
            search_filter = self.parse_query(query)
            print(search_filter)
            search_results = Page.objects.filter(search_filter).distinct()

        
        
        serializer = SearchSerializer(search_results, context={'search_filter': query}, many=True)
        return Response(serializer.data)