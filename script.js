document.addEventListener('DOMContentLoaded', () => {

  start_time();

  let currentTab = localStorage.getItem('selectedTab') || '#activity';
  if (!currentTab) {
    currentTab = '#activity';S
  }
  let triggerTabList = [].slice.call(document.querySelectorAll('#myTab a'))

  triggerTabList.forEach(function (triggerEl) {
    var tabTrigger = new bootstrap.Tab(triggerEl)

    triggerEl.addEventListener('click', function (event) {
      tabTrigger.show()
      currentTab = triggerEl.getAttribute('href');
      localStorage.setItem('selectedTab', currentTab);
    })
  })

  let activeTriggerEl = triggerTabList.find(triggerEl => triggerEl.getAttribute('href') === currentTab);
  if (activeTriggerEl) {
    var tabTrigger = new bootstrap.Tab(activeTriggerEl);
    tabTrigger.show();
  }

  window.addEventListener('popstate', function(event) {
    const currentURL = document.location.hash;
    let activeTriggerEl;
    if (currentURL === '' || currentURL === '#') {
      activeTriggerEl = triggerTabList.find(triggerEl => triggerEl.getAttribute('href') === '#activity');
    } 
    else {
      activeTriggerEl = triggerTabList.find(triggerEl => triggerEl.getAttribute('href') === currentURL);
    }
    if (activeTriggerEl) {
      var tabTrigger = new bootstrap.Tab(activeTriggerEl);
      tabTrigger.show();
      currentTab = currentURL;
      localStorage.setItem('selectedTab', currentTab);
    } 
    else {
      activeTriggerEl = triggerTabList.find(triggerEl => triggerEl.getAttribute('href') === currentTab);
      if (activeTriggerEl) {
        var tabTrigger = new bootstrap.Tab(activeTriggerEl);
        tabTrigger.show();
      }
    }
  });

  AdaptHeader();
});


ymaps.ready(init);

var myMap
function init(){
  myMap = new ymaps.Map("map_img", {
    center: [51.83, 107.6],
    zoom: 8
  });

  var loader = document.getElementById('loader');
  loader.style.display = 'none';

  myMap.events.add('tilesloadstart', function () {
    loader.style.display = 'block';
  });

  myMap.events.add('tilesloaded', function () {
    loader.style.display = 'none';
  });

  var myPlacemark = new ymaps.Placemark([51.83, 107.6], {
    hintContent: 'Улан-Удэ'
  });
  myMap.geoObjects.add(myPlacemark);
}

function reload_map() {
  myMap.destroy()
  init()
}

function AdaptHeader() {
  let menuMainHeader = document.querySelector("#menu_main_header .dropdown-menu");
  let mainNav = document.getElementById("main_nav");

  let menuHeader = document.querySelector('#menu_header .dropdown-menu');
  let headerNavSettings = document.getElementById("header_nav_settings");

  for (const child of headerNavSettings.children) {
    const listItem = document.createElement('li');
    listItem.classList.add('dropdown-item');
    listItem.appendChild(child.cloneNode(true));
    menuHeader.appendChild(listItem);
  }

  for (const child of mainNav.children) {
    const listItem = document.createElement('li');
    listItem.classList.add('dropdown-item');
    listItem.appendChild(child.cloneNode(true));
    menuMainHeader.appendChild(listItem);
  }
}

let startTime
function start_time() {
  startTime = Date.now();

  setInterval(() => {
    const timeElapsed = Math.floor((Date.now() - startTime) / 1000);
    const hours = Math.floor(timeElapsed / 3600);
    const minutes = Math.floor(timeElapsed / 60);
    const seconds = timeElapsed % 60;

    document.querySelector('#timer').textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, 1000);

}