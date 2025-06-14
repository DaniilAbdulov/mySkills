function* apiCaller() {
  // 1. Запрашиваем список пользователей
  const users = yield fetchUsers();
  console.log('Получены пользователи:', users);

  // 2. Для первого пользователя получаем его посты
  const posts = yield fetchUserPosts(users[0].id);
  console.log('Получены посты:', posts);

  // 3. Для первого поста получаем комментарии
  const comments = yield fetchPostComments(posts[0].id);
  console.log('Получены комментарии:', comments);

  return {users, posts, comments};
}

// Вспомогательная функция для выполнения генератора
function runGenerator(gen) {
  const generator = gen();

  function handle(result) {
    if (result.done) return result.value;

    return result.value
      .then((data) => handle(generator.next(data)))
      .catch((err) => generator.throw(err));
  }

  return handle(generator.next());
}

// Имитация асинхронных запросов
function fetchUsers() {
  return Promise.resolve([
    {id: 1, name: 'Иван'},
    {id: 2, name: 'Мария'},
  ]);
}

function fetchUserPosts(userId) {
  return Promise.resolve([
    {id: 101, title: 'Мой первый пост', userId},
    {id: 102, title: 'Второй пост', userId},
  ]);
}

function fetchPostComments(postId) {
  return Promise.resolve([
    {id: 1001, text: 'Отличный пост!', postId},
    {id: 1002, text: 'Спасибо за информацию', postId},
  ]);
}

// Запускаем наш генератор
runGenerator(apiCaller).then((finalResult) => {
  console.log('Финальный результат:', finalResult);
});
