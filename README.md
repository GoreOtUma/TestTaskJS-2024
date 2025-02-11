# Frontend разработка одностраничного сайта - социальной сети

В работе не используются реактивные фреймворки. Работа выполнена с помощью JavaScript, Bootstrap, Yandex Maps API.

Сайт состоит из трех страниц с навигацией между ними:
1) Страница пользователя
2) Карта с местом жительства
3) Таймер, показывающий время нахождения пользователя на сайте

На странице "Карта" находится интерактивная карта, с маркером в месте проживания, инициализирующаяся через js. Пока карта загружается, отображается анимированный прелоадер.

Таймер не сбрасывается при переходе между страницами, но сбрасывается когда вкладка закрывается и открывается заново (или при обновлении страницы).

Переходы между страницами сайта происходят без перезагрузки (single page application).
Сайт работает в разных браузерах.
Сайт адаптирован под типичные разрешения экрана (телефон, планшет, десктоп).
