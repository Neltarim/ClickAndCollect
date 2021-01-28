/* WOW.js init */
new WOW().init();
// Tooltips Initialization
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

// Material Select Initialization
$(document).ready(function () {
  pagination();
  counter_cart_update();

  if (window.location.href == window.location.origin + '/checkout/') {
    total_amounts();
  }
});

//init arrows

function pagination() {
  a = document.getElementsByClassName('pagin');
  
  for (i=0; i < a.length; i++) {
    a[i].innerText = i+1;
  };
};

// SideNav Initialization
$(".button-collapse").sideNav();

function test() {
  console.log('ok')
}

// Cart Count
function counter_cart_update() {
  tcounts = document.getElementsByClassName('tcount')
  total = 0
  for (i=0; i<tcounts.length; i++) {
    x = parseInt(tcounts[i].innerText)
    total += x
  }
  document.getElementById('item-cart-counter').innerText = total
};

//Cart Add
function add_to_cart(item_id, csrf_token) {
  post_add(item_id, csrf_token, add_cart_front);
};

function add_checkout(item_id, csrf_token) {
  post_add(item_id, csrf_token, add_checkout_front);
}

//Cart Remove
function remove_from_cart(item_id, csrf_token) {
  post_remove(item_id, csrf_token, remove_cart_front);
};

function remove_checkout(item_id, csrf_token) {
  post_remove(item_id, csrf_token, remove_checkout_front);
}

//POSTING
function post_add(item_id, csrf_token, callback) {
  var data = new FormData();
  data.append('csrfmiddlewaretoken', csrf_token)
  data.append('item_to_add', item_id)
  post_url = window.location.origin + '/add_to_cart/'

  var xhr = new XMLHttpRequest();
  xhr.open('POST', post_url, true );
  xhr.onload = function () {
    if (xhr.status === 201) {
      callback(item_id, csrf_token);
    };
  };
  xhr.send(data);
};

function post_remove(item_id, csrf_token, callback) {
  var data = new FormData();
  data.append('csrfmiddlewaretoken', csrf_token);
  data.append('id', item_id);
  post_url = window.location.origin + '/remove_from_cart/';

  var xhr = new XMLHttpRequest();
  xhr.open('POST', post_url, true);
  xhr.onload = function () {
    if (xhr.status === 201) {
      callback(item_id, csrf_token);
    };
  };
  xhr.send(data);
};

// FRONT CALLBACKS
function add_cart_front(item_id, csrf_token) {

  tbody = document.getElementById('cart-tbody');
  table = document.getElementById('table-cart');
  

  if (table.classList.contains('hidden')) {
    table.classList.toggle('hidden');
    empty = document.getElementById('empty').classList.toggle('hidden');
  }

  if (document.getElementById('tr-' + item_id) == null) {
    tr = document.createElement('tr');
    let name = document.getElementById(item_id + '-name').innerText
    let price = document.getElementById(item_id + '-price').innerText

    tr.innerHTML =  '<td>' + name + '</td>' +'<td>' + price.toString() + '$</td>' + 
                    '<td class="tcount" id="nbr-' + item_id + '">1</td>' +
                    '<td>' + 
                      '<a onclick="remove_from_cart(\'' + item_id + '\', \'' + csrf_token + '\')">' +
                        '<i class="fas fa-eraser"></i>' +
                      '</a>' + 
                    '</td>'

    tr.id = 'tr-' + item_id.toString()
    tbody.appendChild(tr);
  } else {
    old = parseInt(document.getElementById('nbr-' + item_id).innerText)
    document.getElementById('nbr-' + item_id).innerText = old + 1
  };

  counter_cart_update();
};

function add_checkout_front(item_id, csrf_token) {
  item = document.getElementById(item_id + '-qty')
  item.innerText = parseInt(item.innerText) + 1

  add_cart_front(item_id, csrf_token)
  total_amounts();
}


// REMOVE
function remove_cart_front(item_id) {

  tbody = document.getElementById('cart-tbody');
  table = document.getElementById('table-cart');
  tr = document.getElementById('tr-' + item_id.toString())
  nbr = document.getElementById('nbr-' + item_id.toString())
  tr_count = parseInt(nbr.innerText)

  if (tr_count == 1) {
    tbody.removeChild(tr);
  } else if (tr_count >= 1) {
    console.log('decrement tr')
    nbr.innerText = tr_count - 1
  };

  if (table.childElementCount == 0) {
    table.classList.toggle('hidden');
    empty = document.getElementById('empty').classList.toggle('hidden');
  }
  
  counter_cart_update();
};

function remove_checkout_front(item_id) {
  item = document.getElementById(item_id + '-qty');

  if (parseInt(item.innerText) > 1) {
    item.innerText = parseInt(item.innerText) - 1
  } else {
    bal = document.getElementById(item_id + '-item')
    document.getElementById('table').removeChild(bal)
  };

  remove_cart_front(item_id);
  total_amounts();
};


function total_amounts() {
  amount = document.getElementsByClassName('amount');
  total = 0

  for (i=0; i<amount.length; i++) {
    id = parseInt(amount[i].id);
    price = document.getElementById(id + "-price").innerText
    qty = document.getElementById(id + '-qty').innerText
    am = parseInt(price) * parseInt(qty)
    amount[i].innerText = am
    total += am
  }

  document.getElementById('total').innerText = total
};

function post_to(path) {
  post_url = window.location.origin + path
  var data = new FormData();
  data.append('csrfmiddlewaretoken', csrf)

  xhr = new XMLHttpRequest();
  xhr.open('POST', post_url, true);
  xhr.send(data);
}


function toggle_dark_mode() {
  
  console.log("INFO: Dark mode toggled.")
  $('h4').not('.check').toggleClass('dark-grey-text text-white');
  $('.list-panel a').toggleClass('dark-grey-text');
  $('#dark-mode-btn').toggleClass('btn-outline-black btn-outline-white');
  $('footer, .card').toggleClass('dark-card-admin');
  $('body, .navbar, .sections-views').toggleClass('white-skin navy-blue-skin');
  $('body').toggleClass('dark-bg-admin');
  $(' h1, h6, .card, p, td, th, i, li a, h4, input, label').not(
  '#slide-out i, #slide-out a, .dropdown-item i, .dropdown-item').toggleClass('text-white');
  $('.btn-dash').toggleClass('grey blue').toggleClass('lighten-3 darken-3');
  $('.gradient-card-header').toggleClass('white black lighten-4');
  $('.list-panel a').toggleClass('navy-blue-bg-a text-white').toggleClass('list-group-border');
};