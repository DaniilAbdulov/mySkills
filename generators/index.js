function* generator() {
  const x = yield 1;
  const y = yield x + 2;
  yield y * 9;
}

const gen = generator();
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next(10)); // { value: 12, done: false } (10 + 2)
console.log(gen.next(9)); // { value: 21, done: false } (7 * 3)
console.log(gen.next()); // { value: 21, done: false } (7 * 3)
