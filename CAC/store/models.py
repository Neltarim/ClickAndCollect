from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Ptxt(models.Model):

    name = models.CharField(max_length=10)
    txt  = models.CharField(max_length=4500)
    page = models.CharField(max_length=20)

class Item(models.Model):

    name        = models.CharField(max_length=15)
    img_one     = models.CharField(max_length=100, null=True)
    img_two     = models.CharField(max_length=100, null=True)
    img_three   = models.CharField(max_length=100, null=True)
    img_four    = models.CharField(max_length=100, null=True)
    img_five    = models.CharField(max_length=100, null=True)
    price       = models.FloatField()
    rate        = models.IntegerField(default=1)
    reduc       = models.IntegerField(null=True)
    category    = models.CharField(max_length=25, null=True)

    new       = models.BooleanField(default=True)
    available = models.BooleanField(default=True)

    def serialize(self):
        return self.__dict__


class Order(models.Model):

    sid = models.CharField(max_length=50, unique=True)
    order = models.IntegerField(unique=True, primary_key=True)
    file = models.CharField(max_length=80, unique=True)
