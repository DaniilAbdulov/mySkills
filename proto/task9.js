function Animal(name) {
  this.name = name;
}
Animal.prototype.eat = function () {
  console.log(`${this.name} eats`);
};

function Cat(name) {
  Animal.call(this, name);
}
Cat.prototype = Object.create(Animal.prototype); // Наследование
Cat.prototype.constructor = Cat; // Возврат конструктора

const tom = new Cat('Tom');
tom.eat(); // `Tom eats`;
