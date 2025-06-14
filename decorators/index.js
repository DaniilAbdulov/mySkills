const oldFunc = (num) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Вычисляю для ${num}`); // Логируем начало вычисления
      resolve(num * 2); // Возвращаем результат через 2 секунды
    }, 2000);
  });
};

function decorator(func) {
  const cache = new Map();
  return async function (...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      console.log(`Взяли из кеша для ${args}`); // Лог кеша
      return cache.get(key);
    }

    const result = await func.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// Тестируем
const newFunc = decorator(oldFunc);

console.time('Общее время');
const res1 = await newFunc(2); // ~2 сек
const res3 = await newFunc(2); // Мгновенно (из кеша)
const res2 = await newFunc(3); // ~2 сек
const res4 = await newFunc(3); // Мгновенно (из кеша)
console.timeEnd('Общее время'); // ~4 сек (а не 6, благодаря кешу)

console.log({res1, res2, res3, res4});

// Декоратор — функция, которая принимает целевую функцию и возвращает её модифицированную версию,
// не изменяя исходный код.

// Базовый шаблон может выглядеть так:
// javascript
// function decorator(func) {
//   return function(...args) {
//     const result = func.apply(this, args);
//     return result;
//   };
// }
// А использование вот так: const enhancedFunc = decorator(originalFunc);
// Немного о разнице между методами apply и call. apply принимает контекст и
// массив аргументов func.apply(this, [1, 2, 3]). В свою очередь call принимает контекст и
// сами аргументы func.call(this, 1, 2, 3)

// Популярные сценарии использования: вызов функции не чаще, чем раз в X мс;
// вызов только после паузы в X мс; Одноразовые вызовы, а так же кеширование результата работы
// основной функции.
