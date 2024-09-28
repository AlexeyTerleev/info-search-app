from django.db import models


class Page(models.Model):
    url = models.URLField(unique=True)
    title = models.CharField(max_length=256, null=True, blank=True)
    content = models.TextField()
    last_scraped = models.DateTimeField(auto_now=True)