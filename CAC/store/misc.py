from store.models import *
from random import randint
from os import getcwd, listdir, system
from os.path import exists

import json
import random


def rm_doublons(l):
    return list(set(l))

class Page():
    def __init__(self, page_name):
        self.qs = Ptxt.objects.filter(page=page_name)
        self.name = page_name
        self.txts = {}
        self.sort()

    def sort(self):
        for entry in self.qs:
            self.txts[entry.name] = entry.txt

    def search(self, query):
        kw = query.split(' ')
        items = []

        for key in kw:
            items_qs = list(Item.objects.filter(name__unaccent__icontains=key))
            items += items_qs

        items += list(Item.objects.filter(name__unaccent__icontains=query))

        return rm_doublons(items)

    def all_items(self):
        return list(Item.objects.all())

    def reducs(self, nbr):
        all = list(Item.objects.filter(reduc__isnull=False))
        res = all[:nbr]

        return res

class Cart_item(object):
    def __init__(self, id, name, price, nbr):
        self.id = id
        self.name = name
        self.price = price
        self.nbr = nbr

    def serialize(self):
        return self.__dict__

class Cart(object):
    def __init__(self, raw):
        self.raw = raw

    def add_item(self, item):
        for i in self.raw:
            if item.id == i['id']:
                i['nbr'] += 1
                return True

        formatted = Cart_item(item.id, item.name, item.price, 1)
        self.raw.append(formatted.serialize())

    def remove_item(self, item_id):
        for i in self.raw:
            print(type(i['id']))
            print(type(item_id))
            print(type(i['nbr']))

            if i['id'] == int(item_id):
                
                if i['nbr'] <= 1:
                    self.raw.remove(i)
                    break
                else:
                    i['nbr'] -= 1

def parse_int(string):
    res = ''

    for char in string:
        try:
            int(char)
            res += str(char)
        except:
            pass

    return int(res)

def cart_dump(data):
    order = {'id': None, 'items': data['items']}
    order['id'] = random.randint(10000, 99999)
    path = getcwd() + '/store/orders/order_{}.json'.format(order['id'])

    if exists(path):
        cart_dump(data)
    else:
        system('touch ' + path)
        with open(path, 'w') as file:
            json.dump(order, file, indent=4, separators=(',', ': '))

        o = Order()
        o.sid = data['sid']
        o.order = order['id']
        o.file = path

    return order

def order_load(id):
    path = getcwd() + '/store/orders/order_' + id + '.json'
    order = None

    with open(path, 'r') as file:
        order = json.load(file)

    return order

def all_order_load():
    root = getcwd() + '/store/orders/'
    orders = []

    for file in listdir(root):
        id = parse_int(file)
        orders.append(order_load(id))

    return orders

def delete_order(order):
    system('rm -rf ' + order.file)
    order.delete()

def easy_antispam(request):
    """Store anonymous ips to prevent spamming and cancel requests."""
    x_forward_for =  request.META.get('HTTP_X_FORWARDED_FOR')
    new_ip = ''

    if x_forward_for:
        new_ip = x_forward_for.split(',')[0]
    else:
        new_ip = request.META.get('REMOTE_ADDR')

    print("Request IP: {}".format(new_ip))

    ano_ips_path = getcwd() + "/store/easy_antispam/ips.json"
    print(ano_ips_path)

    with open(ano_ips_path, 'r') as file:
        ano_ips = json.load(file)

    for ip in ano_ips:
        if ip == new_ip:
            return False

    ano_ips.append(new_ip)

    with open(ano_ips_path, 'w') as file:
        json.dump(ano_ips, file, indent=4, separators=(',', ': '))

    return True

def no_order(request):
    try:
        order = Order.objects.get(sid=request.session._session_key)
        return False

    except:
        return True

def fill_db():

    i = 1
    l = []
    cats = ['phone', 'computer', 'headphone']

    while i < 19:
        x = [
            'item_{}'.format(i),
            'https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Products/{}.jpg'.format(i),
            randint(70, 1500),
            cats[randint(1, 3) -1],
        ]
        l.append(x)

        i += 1

    for i in l:
        a = Item()
        a.name = i[0]
        a.img_one = i[1]
        a.price = i[2]
        a.category = i[3]
        a.rate = randint(3, 5)
        a.new = True
        a.available = True

        try:
            a.save()
        except:
            print('error')
            pass
