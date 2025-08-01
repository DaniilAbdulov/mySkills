if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then((registration) => {
      console.log('SW зарегистрирован:', registration);

      // Ждём, пока SW станет активным
      if (registration.active) {
        setupSync(registration); // Регистрируем синхронизацию
      } else {
        registration.addEventListener('updatefound', () => {
          if (registration.active) {
            setupSync(registration); // Регистрируем синхронизацию
          }
        });
      }

      // Запрос разрешения на уведомления
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          console.log('Разрешение на уведомления получено!');
        }
      });
    })
    .catch((err) => console.error('Ошибка регистрации SW:', err));
}

// Выносим регистрацию синхронизации в отдельную функцию
function setupSync(registration) {
  if ('SyncManager' in window) {
    registration.sync
      .register('sync-data')
      .then(() => console.log('Синхронизация зарегистрирована!'))
      .catch((err) => console.error('Ошибка SyncManager:', err));
  }
}
