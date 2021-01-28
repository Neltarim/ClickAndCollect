

// SideNav Initialization
$(".button-collapse").sideNav();
var container = document.querySelector('.custom-scrollbar');
var ps = new PerfectScrollbar(container, {
  wheelSpeed: 2,
  wheelPropagation: true,
  minScrollbarLength: 20
});

//INIT ANIMATION
$(document).ready(function() {
  new WOW().init();
});

function  logit() {
  console.log('ok');
};

function hidden_sw(div) {
  div.classList.toggle('hidden');
  div.classList.toggle('show');
}

function more(new_id) {
  active = document.getElementsByClassName('show')[0];
  empty_div = document.getElementById('more-empty');
  target = document.getElementById(new_id);

  hidden_sw(active);
  if (active.id == target.id) {
    hidden_sw(empty_div);
  } else {
    hidden_sw(target);
  }
};

function switch_table() {

  swt = document.getElementById('switch-tables');
  swt.classList.toggle('blue-gradient');
  

  document.getElementById('table-new').classList.toggle('hidden');
  document.getElementById('table-old').classList.toggle('hidden');
}

//REDIRECT PAGE
function redirect(page_path) {
  window.location.pathname = page_path;
}


//SUBMIT
function form_submit(form_id, csrf_token) {
  var form = document.getElementById(form_id);
  var fields = form.getElementsByClassName('form-control');

  var data = new FormData();
  data.append('csrfmiddlewaretoken', csrf_token)

  for (i=0; i < fields.length; i++) {
    data.append(fields[i].id, fields[i].value);
  }

  
  var xhr = new XMLHttpRequest();
  xhr.open('POST', window.location.href, true );
  xhr.onload = function () {
    if (xhr.status === 201) {
    } else {
      var node_err = document.createTextNode("error.");
      p_err = document.createElement("p");
      p_err.appendChild(node_err);
      p_err.classList.add('p_err');

      form.appendChild(p_err);
    }
  }
  xhr.send(data);
};


function erase (csrf_token) {
  cbs = document.getElementsByClassName('form-check-input');

  data = new FormData;
  data.append('csrfmiddlewaretoken', csrf_token);

  if (document.getElementById('check-all') == "checked") {
    for (i=0; i < cbs.length; i++) {
      data.append(cbs[i].id, cbs[i].value);
    };
  };

  for (i=0; i < cbs.length; i++) {
    if (cbs[i].id != 'check-all' && cbs[i].value == 'checked') {
      data.append(cbs[i].id, cbs[i].value);
    }
  }


  xhr = new XMLHttpRequest;
  post_url = window.location.href
  xhr.open("POST", post_url, true);
  xhr.onload = function() {
    if (xhr.status === 201) {
      redirect('/fovpsm32523p31;209idashboard/');
    }
  }
  xhr.send(data);
};

function check_this(input_id) {
  document.getElementById(input_id).value = "checked";
};

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

$(document).ready(function () {
      
  if (theme == "dark") {
    toggle_dark_mode();
  };
});



/*GRAPH
$(function () {
  var ctxL = document.getElementById("lineChart").getContext('2d');
  var myLineChart = new Chart(ctxL, {
      type: 'line',
      data: {
          labels: ["January", "February", "March", "April", "May", "June", "July", "August", "september", "October", "November", "December"],
          datasets: [{
          label: "Vues totales",
          fillColor: "#fff",
          backgroundColor: 'rgba(255, 255, 255, .3)',
          borderColor: 'rgba(255, 255, 255)',
          data: MONTHS_DATA//[0, 10, 5, 2, 20, 30, 45],
          }]
      },
      options: {
          legend: {
              labels: {
                  fontColor: "#fff",
              }
          },
          scales: {
              xAxes: [{
                  gridLines: {
                  display: true,
                  color: "rgba(255,255,255,.25)"
                  },
                  ticks: {
                  fontColor: "#fff",
                  },
              }],
              yAxes: [{
                  display: true,
                  gridLines: {
                  display: true,
                  color: "rgba(255,255,255,.25)"
                  },
                  ticks: {
                  fontColor: "#fff",
                  },
              }],
          }
      }
  });
  $('#loading-start, #main-content').toggleClass('hidden');
});*/