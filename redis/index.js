import redis from 'redis';

const client = redis.createClient({
  socket: {
    host: '127.0.0.1',
    port: 6379,
  },
});

client.on('error', (err) => console.log('Redis Client Error', err));

async function run() {
  try {
    await client.connect();

    // SET/GET для строк
    await client.set('user:1', 'Daniil');
    const res = await client.get('user:1');

    // HSET/HGET для хэшей
    await client.hSet('user:2', {
      name: 'Daniil',
      age: '27',
    });

    // Получаем конкретное поле из хэша
    const name = await client.hGet('user:2', 'name');
    const age = await client.hGet('user:2', 'age');

    // Или получаем весь хэш
    const fullUser = await client.hGetAll('user:2');

    console.log({
      string_example: res,
      hash_field_name: name,
      hash_field_age: age,
      full_hash: fullUser,
    });
  } finally {
    await client.quit();
  }
}

run();
