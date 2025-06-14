// Усложним задачу:
// Пусть Vehicle принимает параметр name и сохраняет его в this.name.
// Car должен вызывать конструктор Vehicle и добавлять свойство speed.

class Vehicle {
  constructor(name) {
    this.name = name;
  }

  start() {
    console.log(`${this.name} started`);
  }
}

class Car extends Vehicle {
  constructor(name, speed) {
    super(name);
    this.speed = speed;
  }

  drive() {
    console.log(`${this.name} едет со скоростью ${this.speed}`);
  }
}

const car = new Car('BMW', '50 км/ч');
car.start();
car.drive();
