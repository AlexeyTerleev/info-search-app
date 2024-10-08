# Generated by Django 5.1.1 on 2024-09-28 09:47

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Page',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('url', models.URLField(unique=True)),
                ('title', models.CharField(blank=True, max_length=256, null=True)),
                ('content', models.TextField()),
                ('last_scraped', models.DateTimeField(auto_now=True)),
            ],
        ),
    ]
