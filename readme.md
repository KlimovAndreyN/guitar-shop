# guitar-shop

## Запуск проекта

### Запуск Бэкенда
```bash
# перейти в папку с проектом
cd ~/guitar-shop

# Скопировать .env-example -> .env:
cp backend/apps/file-storage/.env-example backend/apps/file-storage/.env

cp backend/apps/account/.env-example backend/apps/account/.env
cp backend/apps/api/.env-example backend/apps/api/.env
cp backend/apps/blog/.env-example backend/apps/blog/.env
cp backend/apps/notify/.env-example backend/apps/notify/.env

# запустить внешние сервисы
docker compose --file ./docker-compose.yml --project-name "guitar-shop" up -d

# перейти в папку с проектом
cd ./backend

# установить зависимости
npm install

# сформировать PrismaClient
npx nx run blog:db:generate

# инициализировать БД postgres - blog
npx nx run blog:db:migrate

# наполнение тестовыми данными
npx nx run account:db:seed
npx nx run blog:db:seed

# запуск сервисов
npx nx run file-storage:serve

npx nx run account:serve
npx nx run blog:serve
npx nx run notify:serve
npx nx run api:serve
```

### Запуск Фронтенда
```bash
# перейти в папку с проектом
cd ~/guitar-shop/frontend

# установить зависимости
npm install

# Скопировать .env-example -> .env:
cp apps/account/.env-example apps/account/.env

# запуск Web
npm start
```

## Структура проекта

### markup

В директории находится вёрстка проекта: примеры страниц, ui-kit и карта сайта (`index.html`). Начинать знакомство с проектом лучше с карты.

### frontend

Директория для фронтенда проекта.

#### public

Директория для размещения статичных ресурсов (шрифты, стили, изображения и так далее).

#### src

В директории размещается исходный код проекта: компоненты, файлы с тестами, модули и так далее. Структура директории `src` может быть произвольной.

## Алгоритм работы над фронтендом

1. Перейдите в диретокрию `frontend`.

2. Установите зависимости, выполнив команду `npm install`.

3. Проверьте работу приложения, выполнив команду `npm start`.

4. Перейдите по адресу, указанному в терминале (скорее всего, это будет `http://localhost:5173/`). Если сборка прошла успешно, то на странице вашего приложения вы увидите `Hello, world!`.

5. Запрограммируйте фронтенд.
