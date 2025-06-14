// Создайте объект animal с методом eat(), затем объект rabbit с методом jump().
// Сделайте так, чтобы rabbit наследовал от animal.
// Проверьте, что rabbit может и есть, и прыгать.

const animal = {
  eat() {
    console.log(`Eat`);
  },
};

const rabbit = {
  jump() {
    console.log('jump');
  },
};

Object.setPrototypeOf(rabbit, animal);

rabbit.eat();
rabbit.jump();
