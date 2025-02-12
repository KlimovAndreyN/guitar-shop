export const ApiOperationOption = {
  User: {
    Register: { summary: 'Регистрация нового пользователя' },
    Login: { summary: 'Авторизация пользователя' },
    Logout: { summary: 'Выход пользователя' },
    Check: { summary: 'Провека токена авторизации' }
  },
  Post: {
    Index: { summary: 'Получение списка публикаций' },
    Search: { summary: 'Поиск публикаций по названию' },
    Detail: { summary: 'Просмотр детальной информации о публикации' },
    Create: { summary: 'Добавление новой публикации' },
    Update: { summary: 'Редактирование публицации' },
    Delete: { summary: 'Удаление публикации' },
  }
} as const;
