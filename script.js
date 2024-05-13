document.addEventListener('DOMContentLoaded', () => {

  start_time();

  let currentTab = getCurrentTabFromURL() || '#activity';

  let triggerTabList = [].slice.call(document.querySelectorAll('#myTab a'));

  triggerTabList.forEach(function (triggerEl) {
    triggerEl.addEventListener('click', function (event) {
      event.preventDefault();
      const tabId = triggerEl.getAttribute('href');
      showTab(tabId);
      currentTab = tabId;
      updateURL(currentTab);
    })
  });

  window.addEventListener('popstate', function(event) {
    currentTab = getCurrentTabFromURL() || '#activity';
    showTab(currentTab);
  });

  HideElems();
  AdaptHeader();

  if (!document.location.hash) {
    showTab('#activity');
  }

  function getCurrentTabFromURL() {
    const hash = document.location.hash;
    return hash ? hash : null;
  }

  function showTab(tabId) {
    const activeTriggerEl = triggerTabList.find(triggerEl => triggerEl.getAttribute('href') === tabId);
    if (activeTriggerEl) {
      const tabTrigger = new bootstrap.Tab(activeTriggerEl);
      tabTrigger.show();
    }
  }

  function updateURL(tabId) {
    history.pushState(null, null, tabId);
  }
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
    const minutes = Math.floor((timeElapsed / 60) % 60);
    const seconds = timeElapsed % 60;

    document.querySelector('#timer').textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, 1000);
}

function HideElems() {
  let dropdown_share_thoughts = document.getElementById("dropdown_share_thoughts")
  let share_to_hide = document.getElementById("share_to_hide")
  dropdown_share_thoughts.addEventListener('click', function(event) {
    if (share_to_hide.classList.contains('d-none')) {
      share_to_hide.classList.remove('d-none')
    }
    else {
      share_to_hide.classList.add('d-none')
    }
  })

  let dropdown_navigation = document.getElementById("dropdown_navigation")
  let navigation_to_hide = document.getElementsByClassName("navigation_to_hide")
  dropdown_navigation.addEventListener('click', function(event) {
    Array.from(navigation_to_hide).forEach(function (navigation) {
      if (navigation.classList.contains('d-none')) {
        navigation.classList.remove('d-none')
      }
      else {
        navigation.classList.add('d-none')
      }
    })
  })

  let dropdown_map = document.getElementById("dropdown_map")
  let map_img = document.getElementById("map_img")
  dropdown_map.addEventListener('click', function(event) {
    if (map_img.classList.contains('d-none')) {
      map_img.classList.remove('d-none')
    }
    else {
      map_img.classList.add('d-none')
    }
  })

  let dropdown_timer = document.getElementById("dropdown_timer")
  let timer = document.getElementById("timer")
  dropdown_timer.addEventListener('click', function(event) {
    if (timer.classList.contains('d-none')) {
      timer.classList.remove('d-none')
    }
    else {
      timer.classList.add('d-none')
    }
  })

  let close_timer = document.getElementById("close_timer")
  let time = document.getElementById("time")
  close_timer.addEventListener('click', function(event) {
      time.classList.add('d-none')
  })

  let close_map = document.getElementById("close_map")
  let map = document.getElementById("map")
  close_map.addEventListener('click', function(event) {
    map.classList.add('d-none')
  })
}