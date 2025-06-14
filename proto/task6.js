// 2. То же самое, но через функции-конструкторы и F.prototype
// Реализуйте аналогичное наследование без классов:

// Функцию-конструктор Vehicle, добавляя метод start() в прототип.
// Функцию-конструктор Car, наследующую Vehicle, с методом drive() в прототипе.

function Vehicle() {}

Vehicle.prototype.start = function () {
  console.log(`Vehicle started`);
};

function Car() {}

console.log(Car.prototype);

Car.prototype = Object.create(Vehicle.prototype);
// Эта строка устанавливает наследование между Car и Vehicle.
// Object.create(Vehicle.prototype) создаёт новый объект,
// прототипом которого является Vehicle.prototype.
// Car.prototype = ... заменяет стандартный prototype функции Car на этот новый объект.
// Что это даёт?
// Теперь все методы, определённые в Vehicle.prototype (например, start()),
// будут доступны экземплярам Car через цепочку прототипов.
// Без этой строки Car не будет знать о Vehicle, и вызов car.start() приведёт к ошибке.

Car.prototype.constructor = Car;
// 2. Car.prototype.constructor = Car;
// Эта строка исправляет ссылку на конструктор, которая была потеряна при замене prototype.
// Когда мы заменили Car.prototype, новый объект (созданный через Object.create)
// получил свойство constructor от Vehicle.prototype (то есть Vehicle).
// Но логически конструктором для Car должен быть сам Car, а не Vehicle.
// Что это даёт?
// Теперь, если создать объект через new Car(), его свойство constructorбудет корректно указывать на Car, а не на Vehicle.

Car.prototype.drive = function () {
  console.log(`Car is driving`);
};

const car = new Car();
car.start();
car.drive();
