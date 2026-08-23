# Tea App

Учебный интернет-магазин чая на Angular 14.

[Открыть сайт](https://esukhova.github.io/tea-app-Angular/)

## Возможности

- главная страница с аккордеоном и всплывающим окном
- каталог чайных коллекций
- поиск по названию без учёта регистра
- карточка товара
- оформление заказа с валидацией формы

## Стек

- Angular 14, TypeScript, RxJS
- Angular Router (lazy-модули)
- Reactive Forms
- Bootstrap 5, ng-bootstrap
- jQuery UI (аккордеон на главной)
- API: [testologia.ru](https://testologia.ru/)

## Запуск

Нужны Node.js и Angular CLI 14.

```bash
npm install
ng serve
```

Приложение откроется на [http://localhost:4200/](http://localhost:4200/).

## Сборка

```bash
ng build
```

Файлы появятся в `dist/`.

## Как устроен проект

```
src/app/
  shared/          шапка, подвал, карточка товара, сервисы
  views/main/      главная
  views/products/  каталог и страница товара
  views/order/     форма заказа
src/environments/  URL API
```

Маршруты: `/`, `/catalog`, `/catalog/:id`, `/order`.

Поиск: если в поле есть текст, загружается весь список `GET /tea`, затем товары фильтруются на клиенте по `title`. Пустой ввод запрос не отправляет.

## API

| Метод | URL | Назначение |
|---|---|---|
| GET | `/tea` | все товары |
| GET | `/tea?id=N` | один товар |
| POST | `/order-tea` | создать заказ |

Бэкенд сторонний, в репозитории его нет.

## Публикация на GitHub Pages

Сайт раздаётся из папки `docs/` ветки `gp`.

```bash
git add .
git commit -m "описание изменений"
git push origin main

git checkout gp
git merge main
ng build --output-path docs --base-href /tea-app-Angular/
copy docs\index.html docs\404.html
git add docs
git commit -m "update build"
git push origin gp
git checkout main
```
(без 404.html прямые ссылки вроде /catalog на GitHub Pages отдают 404, потому что это клиентский маршрут)

Через одну-две минуты обновление появится на [esukhova.github.io/tea-app-Angular](https://esukhova.github.io/tea-app-Angular/).
