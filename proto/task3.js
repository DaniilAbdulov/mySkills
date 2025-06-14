// Создайте класс Bird с методом fly().
// Затем создайте класс Penguin, который наследует Bird и
// переопределяет fly() (пингвины не летают).

class Bird {
  fly() {
    console.log(`fly`);
  }
}

class Penguin extends Bird {
  constructor() {
    super();
  }

  fly() {
    console.log(`penguin not fly`);
  }
}

const mockingbird = new Bird();
const popper = new Penguin();

mockingbird.fly();
popper.fly();
