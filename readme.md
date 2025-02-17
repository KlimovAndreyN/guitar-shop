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

# сборка cli-application
npx nx run cli:build

# наполнение тестовыми данными
./dist/apps/cli/main.js --generate 10 mongodb://admin:test@localhost:27019/guitar-shop-account?authSource=admin postgres://admin:test@localhost:5433/guitar-shop-catalog
или
node ./dist/apps/cli/main.js --generate 10 mongodb://admin:test@localhost:27019/guitar-shop-account?authSource=admin postgres://admin:test@localhost:5433/guitar-shop-catalog

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

## env
```bash
#file-storage - backend/apps/file-storage/.env-example
PORT=4100
UPLOAD_DIRECTORY_PATH=./uploads
SERVE_ROOT=/static
MONGODB_HOST=localhost
MONGODB_PORT=27018
MONGODB_USER=admin
MONGODB_PASSWORD=test
MONGODB_DATABASE=guitar-shop-file-storage
MONGODB_AUTHBASE=admin

#account - backend/apps/account/.env-example
PORT=4200
MONGODB_HOST=localhost
MONGODB_PORT=27019
MONGODB_USER=admin
MONGODB_PASSWORD=test
MONGODB_DATABASE=guitar-shop-account
MONGODB_AUTHBASE=admin
JWT_ACCESS_TOKEN_SECRET=secret
JWT_ACCESS_TOKEN_EXPIRES_IN=10d
MAIL_SMTP_HOST=localhost
MAIL_SMTP_PORT=8025
MAIL_SMTP_USER=admin
MAIL_SMTP_PASSWORD=test
MAIL_SMTP_FROM=admin@test.ru
FRONTEND_URL=http://localhost:5173

#catalog - backend/apps/catalog/.env-example
PORT=4300
POSTGRES_HOST=localhost
POSTGRES_PORT=5433
POSTGRES_USER=admin
POSTGRES_PASSWORD=test
POSTGRES_DATABASE=guitar-shop-catalog
DATABASE_URL=postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DATABASE}
PGADMIN_DEFAULT_EMAIL=admin@test.ru
PGADMIN_DEFAULT_PASSWORD=test
FILE_STORAGE_SERVICE_URL=http://localhost:4100/api/files

#api - backend/apps/api/.env-example
PORT=3000
FILE_STORAGE_SERVICE_URL=http://localhost:4100/static
ACCOUNT_SERVICE_URL=http://localhost:4200/api/auth
CATALOG_SERVICE_URL=http://localhost:4300/api

#frontend/.env-example
PORT=5173
DISABLE_ESLINT_PLUGIN=true
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
