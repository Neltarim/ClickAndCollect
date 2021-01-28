from django.conf.urls import url

from . import views


urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^search', views.search, name='search'),
    url(r'^items/(?P<item_id>[0-9]+)/$', views.item_detail, name='items'),
    url(r'^add_to_cart/', views.add_to_cart, name='add_to_cart'),
    url(r'^remove_from_cart/', views.remove_from_cart, name='remove_from_cart'),
    url(r'^reset_session/', views.reset_session, name='reset_session'),
    url(r'^checkout/', views.checkout, name='checkout'),
    url(r'^confirmed/', views.confirmed, name="confirmed"),
]