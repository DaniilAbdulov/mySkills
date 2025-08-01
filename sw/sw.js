// === 1. Установка и кеширование (оффлайн-доступ) ===
const CACHE_NAME = 'my-cache-v1';
const OFFLINE_PAGE = '/offline.html'; // Страница для оффлайн-режима
const ASSETS_TO_CACHE = [OFFLINE_PAGE];

self.addEventListener('install', (event) => {
  console.log('[SW] Установка и кеширование ресурсов');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
});

// === 2. Перехват запросов (работа в оффлайне) ===
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Если файл есть в кеше — возвращаем его
      if (response) return response;

      // Если нет — пробуем загрузить из сети
      return fetch(event.request).catch(() => {
        // Если сеть недоступна — показываем оффлайн-страницу
        return caches.match(OFFLINE_PAGE);
      });
    })
  );
});

// === 3. Фоновая синхронизация (когда интернет появится) ===
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-data') {
    console.log('[SW] Фоновая синхронизация!');
    event.waitUntil(
      sendDataToServer() // Ваша функция отправки данных
    );
  }
});

// Функция для примера (замени на свою логику)
function sendDataToServer() {
  return fetch('https://api.example.com/save', {
    method: 'POST',
    body: JSON.stringify({saved: true}),
  })
    .then(() => console.log('Данные отправлены!'))
    .catch((err) => console.error('Ошибка:', err));
}

// === 4. Push-уведомления ===
self.addEventListener('push', (event) => {
  const data = event.data?.json() || {
    title: 'Уведомление',
    body: 'Новое сообщение!',
  };

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: '/icon.png',
      vibrate: [200, 100, 200], // Вибрация (на мобильных)
    })
  );
});

// Обработка клика по уведомлению
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('https://example.com/notifications') // Куда перейти при клике
  );
});
