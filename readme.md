# guitar-shop

## Запуск проекта

### Запуск Бэкенда
```bash
# перейти в папку с проектом
cd ~/guitar-shop

# Скопировать .env-example -> .env:
cp ./backend/apps/file-storage/.env-example ./backend/apps/file-storage/.env
cp ./backend/apps/account/.env-example ./backend/apps/account/.env
cp ./backend/apps/catalog/.env-example ./backend/apps/catalog/.env
cp ./backend/apps/api/.env-example ./backend/apps/api/.env

# запустить внешние сервисы
docker compose --file ./docker-compose.yml up -d

# перейти в папку с проектом
cd ./backend

# установить зависимости
npm install

# сформировать PrismaClient
npx nx run catalog:db:generate

# инициализировать БД postgres - catalog
npx nx run catalog:db:migrate

# наполнение тестовыми данными
#//!npx nx run account:db:seed
#//!npx nx run catalog:db:seed

# запуск сервисов
npx nx run file-storage:serve
npx nx run account:serve
npx nx run catalog:serve
npx nx run api:serve
```

### Запуск Фронтенда
```bash
# перейти в папку с проектом
cd ~/guitar-shop/frontend

# Скопировать .env-example -> .env:
cp ./.env-example .env

# установить зависимости
npm install

# запуск Web
npm start
```

## Структура Фронтенда

### markup

В директории находится вёрстка проекта: примеры страниц, ui-kit и карта сайта (`index.html`). Начинать знакомство с проектом лучше с карты.

### frontend

Директория для фронтенда проекта.

#### public

Директория для размещения статичных ресурсов (шрифты, стили, изображения и так далее).

#### src

В директории размещается исходный код проекта: компоненты, файлы с тестами, модули и так далее. Структура директории `src` может быть произвольной.
