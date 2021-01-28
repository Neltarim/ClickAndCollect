from django.shortcuts import render
from django.http import HttpResponse
from os import getcwd
import random

from store.misc import *
from store.models import Item
from store.forecastPurge.forecastAPI import purge

# Create your views here.
def index(request):
    p_index = Page('index')

    context = {
        'items'   : p_index.all_items(),
        'ptxt'    : p_index.txts,
        'errors'  : [],
    }

    try:
        context['cart'] = request.session['cart']

    except:
        context['cart'] = []

    return render(request, 'store/item.html', context)


def listing(request, opt=None):
    p_listing = Page('listing')

    context = {
        'ptxt'          : p_listing.txts,
        'items'         : p_listing.all_items(),
        "errors"        : []
    }

    try:
        context['cart'] = request.session['cart']

    except:
        context['cart'] = []

    if opt:
        context['errors'].append(opt)

    return render(request, 'store/search.html', context)

def search(request):

    query = request.GET.get('query')
    p_search = Page('search')

    if not query:
        return listing(request)

    else:
        items = p_search.search(query)


    if items == []:
        return listing(request, opt="No result for {}.".format(query))

    context = {
                'ptxt'          : p_search.txts,
                'items'         : items,
                "errors"        : []
            }

    try:
        context['cart'] = request.session['cart']

    except:
        context['cart'] = []

    else:
        
        return render(request, 'store/search.html', context )

def item_detail(request, item_id):

    try:
        item = Item.objects.get(id=item_id)

    except:
        return render(request, 'store/404.html')


    context = {
        'ptxt'          : Page('item_detail').txts,
        'item'          : item,
        "errors"        : []
    }  

    try:
        context['cart'] = request.session['cart']

    except:
        context['cart'] = []
        
    return render(request, 'store/item_detail.html', context)


def add_to_cart(request):

    if request.method == "POST":
        items = request.POST.items()
        HttpResponse.status_code = 201

        for key, value in items:
            if key != 'csrfmiddlewaretoken':
                item = Item.objects.get(id=value)

        try:
            cart = Cart(request.session['cart'])
        except:
            cart = Cart([])

        cart.add_item(item)
        request.session['cart'] = cart.raw

        return HttpResponse()

    else:

        return render(request, 'store/400.html')

def remove_from_cart(request):

    if request.method == "POST":
        id = request.POST.get('id')
        HttpResponse.status_code = 201
        
        cart = Cart(request.session['cart'])
        cart.remove_item(id)

        print(cart.raw)

        request.session['cart'] = cart.raw

    return HttpResponse()

def reset_session(request):
    purge()
    try:
        o = Order.objects.get(sid=request.session._session_key)
        delete_order(o)
    except:
        pass
    request.session.clear()
    return HttpResponse()

def checkout(request):

    context = {
        'ptxt'          : Page('checkout_detail').txts,
        "errors"        : []
    }

    if request.method == "POST" and not no_order(request):
        confirmed(request)

    if request.method == "POST" and no_order(request):

        if easy_antispam(request):
            order = cart_dump({
                'items' : request.session['cart'],
                'sid'   : request.session._session_key
                })
            del request.session['cart']
            context['order'] = order

            return render(request, 'store/confirmed.html', context)

        else:
            context['errors'].append('antispam')
            return render(request, 'store/checkout.html', context)

    elif request.method == "GET":
        try:
            context['cart'] = request.session['cart']
        except:
            context['cart'] = []
        return render(request, 'store/checkout.html', context)
    else:
        return render(request, 'store/404.html')

def confirmed(request):
    o = Order.objects.get(sid=request.session._session_key)

    context = {
        'ptxt'          : Page('Confirmed').txts,
        "errors"        : [],
        'order'         : order_load(o.id),
    }


    return render(request, 'store/confirmed.html', context)