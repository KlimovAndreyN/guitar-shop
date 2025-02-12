export const ApiOperationOption = {
  User: {
    Register: { summary: 'Создание нового пользователя' },
    Login: { summary: 'Вход в закрытую часть приложения' },
    Check: { summary: 'Проверка состояния пользователя' }
  },
  Product: {
    Index: { summary: 'Получение списка товаров' },
    Detail: { summary: 'Получение детальной информации по товару' },
    Create: { summary: 'Создание нового товара' },
    Update: { summary: 'Редактирование карточки товара' },
    Delete: { summary: 'Удаление товара' }
  }
} as const;
