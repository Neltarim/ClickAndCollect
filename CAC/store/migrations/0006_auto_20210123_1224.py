# Generated by Django 3.1.3 on 2021-01-23 11:24

from django.db import migrations
from django.contrib.postgres.operations import UnaccentExtension


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0005_item_rate'),
    ]

    operations = [
        UnaccentExtension(),
    ]
