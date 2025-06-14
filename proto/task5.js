// 1. Наследование через классы
// Создайте:

// Класс Vehicle с методом start(), который выводит "Vehicle started".

// Класс Car, наследующий Vehicle, с методом drive() ("Car is driving").

class Vehicle {
  start() {
    console.log(`Vehicle started`);
  }
}

class Car extends Vehicle {
  drive() {
    console.log(`Car is driving`);
  }
}

const car = new Car();
car.start();
car.drive();
