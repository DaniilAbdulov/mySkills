// Создайте класс Animal с методом speak(), затем класс Dog,
// который наследует Animal и добавляет метод bark().
// Убедитесь, что экземпляр Dog может и говорить, и лаять.

class Animal {
  speak() {
    console.log(`speak`);
  }
}

class Dog extends Animal {
  constructor() {
    super();
  }

  bark() {
    console.log(`bark`);
  }
}

const bethowen = new Dog();
bethowen.speak();
bethowen.bark();
