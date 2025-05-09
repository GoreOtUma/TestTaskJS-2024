document.addEventListener('DOMContentLoaded', () => {

  startTime();

  let currentTab = getCurrentTabFromURL();

  const triggerTabList = [].slice.call(document.querySelectorAll('#myTab a'));

  triggerTabList.forEach(function (triggerEl) {
    triggerEl.addEventListener('click', function (event) {
      event.preventDefault();
      const tabId = triggerEl.getAttribute('href');
      showTab(tabId);
      currentTab = tabId;
      updateURL(currentTab);
    })
  });

  window.addEventListener('popstate', function() {
    currentTab = getCurrentTabFromURL();
    showTab(currentTab);
  });

  hideElems();
  adaptHeader();
  showTab(currentTab);
  updateURL(currentTab);

  function getCurrentTabFromURL() {
    const hash = document.location.hash;
    return hash || '#activity';
  }

  function showTab(tabId) {
    const activeTriggerEl = triggerTabList.find(triggerEl => triggerEl.getAttribute('href') === tabId);
    if (activeTriggerEl) {
      const tabTrigger = new bootstrap.Tab(activeTriggerEl);
      tabTrigger.show();
    }

    if (tabId === '#map') {
      document.getElementById('map').classList.remove('d-none');
    } else if (tabId === '#time') {
      document.getElementById('time').classList.remove('d-none');
    }
  }

  function updateURL(tabId) {
    history.pushState(null, null, tabId);
  }
});

ymaps.ready(init);

let myMap;
function init(){
  myMap = new ymaps.Map("map_img", {
    center: [51.83, 107.6],
    zoom: 8
  });

  const loader = document.getElementById('loader');
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

function reloadMap() {
  myMap.destroy()
  init()
}

function adaptHeader() {
  const menuMainHeader = document.querySelector("#menu_main_header .dropdown-menu");
  const mainNav = document.getElementById("main_nav");
  adaptObject(menuMainHeader, mainNav);

  const menuHeader = document.querySelector('#menu_header .dropdown-menu');
  const headerNavSettings = document.getElementById("header_nav_settings");
  adaptObject(menuHeader,  headerNavSettings);
}

function adaptObject(mainObject, childObject) {
  for (const child of childObject.children) {
    const listItem = document.createElement('li');
    listItem.classList.add('dropdown-item');
    listItem.appendChild(child.cloneNode(true));
    mainObject.appendChild(listItem);
  }
}

let timer;
function startTime() {
  const savedStartTime = sessionStorage.getItem('timerStart');
  if (savedStartTime) {
    timer = parseInt(savedStartTime, 10);
  } else {
    timer = Date.now();
    sessionStorage.setItem('timerStart', timer);
  }

  setInterval(() => {
    const timeElapsed = Math.floor((Date.now() - timer) / 1000);
    const hours = Math.floor(timeElapsed / 3600);
    const minutes = Math.floor((timeElapsed / 60) % 60);
    const seconds = timeElapsed % 60;

    document.querySelector('#timer').textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, 1000);
}

function hideElems() {
  const dropdownShareThoughts = document.getElementById("dropdown_share_thoughts");
  const shareToHide = document.getElementById("share_to_hide");
  dropdownShareThoughts.addEventListener('click', function() {
    hideObject(shareToHide);
  })

  const dropdownNavigation = document.getElementById("dropdown_navigation");
  const navigationToHide = document.getElementsByClassName("navigation_to_hide");
  dropdownNavigation.addEventListener('click', function() {
    Array.from(navigationToHide).forEach(navigation => hideObject(navigation));
  }) 

  const dropdownMap = document.getElementById("dropdown_map");
  const mapImg = document.getElementById("map_img");
  dropdownMap.addEventListener('click', function() {
    hideObject(mapImg);
  })

  const dropdownTimer = document.getElementById("dropdown_timer");
  const timerField = document.getElementById("timer");
  dropdownTimer.addEventListener('click', function() {
    hideObject(timerField);
  })

  const closeTimer = document.getElementById("close_timer");
  const time = document.getElementById("time");
  closeTimer.addEventListener('click', function() {
      time.classList.add('d-none');
  })

  const closeMap = document.getElementById("close_map");
  const map = document.getElementById("map");
  closeMap.addEventListener('click', function() {
    map.classList.add('d-none');
  })
}

function hideObject(elem) {
  if (elem.classList.contains('d-none')) {
    elem.classList.remove('d-none');
  } else {
    elem.classList.add('d-none');
  }
}