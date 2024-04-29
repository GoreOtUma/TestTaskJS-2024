document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('nav a');
  const sections = document.querySelectorAll('main section');
  //history.pushState(null, '', '/TestTaskJS/#activity');

  navLinks.forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
    
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
    
      sections.forEach(section => section.classList.remove('active_page'));
      targetSection.classList.remove('not_active_pages');
      targetSection.classList.add('active_page');
    
      navLinks.forEach(link => link.parentNode.classList.remove('active_link'));
      link.parentNode.classList.add('active_link');
      //history.pushState(null, '', '/TestTaskJS/' + targetId);
    });
  });
    
  /* window.addEventListener('popstate', event => {
    const sectionId = location.hash;
    const targetSection = document.querySelector(sectionId);

    sections.forEach(section => section.classList.remove('active_page'));
    targetSection.classList.remove('not_active_pages');
    targetSection.classList.add('active_page');

    navLinks.forEach(link => link.parentNode.classList.remove('active_link'));
    document.querySelector(`nav a[href="${sectionId}"]`).parentNode.classList.add('active_link');
  }); */

  let startTime = Date.now();

  setInterval(() => {
    const timeElapsed = Math.floor((Date.now() - startTime) / 1000);
    const hours = Math.floor(timeElapsed / 3600);
    const minutes = Math.floor(timeElapsed / 60);
    const seconds = timeElapsed % 60;

    document.querySelector('#timer').textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, 1000);
});

ymaps.ready(init);
function init(){
  var myMap = new ymaps.Map("map_img", {
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
