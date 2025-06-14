// Добавьте статический метод info() в класс Car, который выводит "This is a Car class".
// Убедитесь, что метод доступен только через класс, а не через экземпляр.

class Car {
  static info() {
    console.log(`This is a Car class`);
  }
}

Car.info();

const car = new Car();

car.info(); // car.info is not a function
