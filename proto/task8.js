// То же самое что и в task7, но через функции

function Vehicle(name) {
  this.name = name;
}

Vehicle.prototype.start = function () {
  console.log(`${this.name} started`);
};

function Car(name, speed) {
  Vehicle.call(this, name);
  this.speed = speed;
}

Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Car;

Car.prototype.drive = function () {
  console.log(`${this.name} едет со скоростью ${this.speed}`);
};

const car = new Car('BMW', '50 км/ч');
car.start();
car.drive();
