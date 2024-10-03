from rest_framework import serializers
from info_search.models import Page


class PageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Page
        fields = '__all__'


class SearchSerializer(serializers.ModelSerializer):
    coincidences = serializers.SerializerMethodField()

    class Meta:
        model = Page
        fields = ["id", "url", "title", "coincidences"]

    def get_coincidences(self, obj):
        search_filter = self.context.get('search_filter', '')
        remove_items = [" ", ")", "(", "AND", "OR", "NOT"]
        
        # Clean up and split the search filter into valid tokens
        search_filter = list(filter(
            lambda x: x not in remove_items, 
            search_filter.replace("(", " ( ").replace(")", " ) ").split()
        ))

        delta_position = 10
        positions = []
        coincidences = []

        # Find positions of each search token in the content
        for token in search_filter:
            start = 0
            while True:
                index = obj.content.find(token, start)
                if index == -1:
                    break
                # Append positions as tuples
                positions.append((index, index + len(token)))
                start = index + 1

            if len(positions) > 5:
                positions = positions[:5]
                break

        # Extract the content around each found position
        for position in positions:
            start = max(0, position[0] - delta_position)
            end = min(len(obj.content) - 1, position[1] + delta_position)
            
            while start != 0:
                if obj.content[start] == " ":
                    start += 1
                    break
                start -= 1

            while end != len(obj.content) - 1:
                if obj.content[end] == " ":
                    end -= 1
                    break
                end += 1

            coincidences.append(obj.content[start: end + 1])

        return coincidences
