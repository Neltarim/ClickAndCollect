from django.conf import settings
from django.contrib import admin
from django.contrib import auth
from django.urls import path, include
from django.conf.urls import url

import store, dash
from store.views import index

urlpatterns = [
    url(r'^', include(('store.urls', 'store'), namespace="store")),
]