# 🎬 CineVault

Платформа для ознакомления с фильмами и сериалами, вдохновлённая [TMDB](https://www.themoviedb.org/).

Просмотр фильмов, сериалов, людей и жанров, поиск контента и добавление понравившихся тайтлов в личный список.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

🔗 **[Демо](https://cine-vault-alpha-two.vercel.app/)**

## ✨ Возможности

- 🎬 Просмотр фильмов и сериалов
- 🔥 Популярные и трендовые фильмы и сериалы
- 🎭 Просмотр контента по жанрам
- 🔍 Поиск фильмов, сериалов и людей
- 🔖 Личный список Watchlist
- 🎠 Интерактивные карусели
- ♾️ Бесконечная загрузка контента
- 📱 Адаптивная вёрстка

## 🛠️ Стек

- **React 19**
- **TypeScript**
- **Vite**
- **Tailwind CSS**
- **React Router**
- **TanStack Query**
- **Zustand**
- **Axios**
- **Embla Carousel**
- **TMDB API**

## 🚀 Запуск проекта

### Установка

```bash
git clone https://github.com/CrawFish666/cine-vault.git
cd cine-vault
npm install
```

### Переменные окружения

Создайте файл `.env` на основе `.env.example` и добавьте Read Access Token для TMDB:

```env
VITE_TMDB_READ_TOKEN=your_token
```

### Запуск в режиме разработки
```bash
npm run dev
```

## 📁 Структура проекта

```text
src/
├── api/
├── components/
├── hooks/
├── pages/
├── routes/
├── store/
├── types/
└── utils/
```

## 🗺️ Roadmap

### Страницы

- [x] Home
- [x] Movies
- [x] TV Shows
- [x] People
- [x] Search
- [x] Watchlist
- [x] Movie Details
- [x] Movies by Genre
- [x] TV Show Details
- [x] TV Shows by Genre
- [ ] Person details
- [x] Not Found Page


### Поиск

- [x] Доработать страницу поиска
- [x] Вынести SearchPanel из контекста страницы и закрепить под Header
- [x] Реализовать sticky-поведение SearchPanel
- [x] Скрывать Header при прокрутке вниз, при scroll back отображать
- [x] Показывать SearchPanel при прокрутке вниз, если он был открыт
- [x] Добавить infinity loading для результатов поиска
- [x] Продумать UX поиска на мобильных устройствах
- [x] Продумать поиск через бургер-меню

### Watchlist

- [x] Доработать страницу Watchlist
- [x] Показывать сообщение, если фильмы отсутствуют
- [x] Показывать сообщение, если сериалы отсутствуют
- [x] Получать данные из Zustand store
- [ ] Обновлять данные Watchlist в фоне

### Footer

- [x] Добавить отдельный блок Social Links
- [x] Добавить навигацию по секциям страницы через `id`
- [x] Сделать плавный скролл к соответствующим секциям

### Оптимизация

- [x] Оптимизировать загрузку изображений
- [x] Оптимизировать загрузку данных в зависимости от видимости секций
- [x] Не загружать данные всех секций сразу при открытии страницы
- [ ] Оптимизировать рендеринг каруселей
- [ ] Реализовать виртуализацию слайдов
- [ ] Ограничить количество одновременно отрисовываемых слайдов
- [x] Проверить производительность приложения
- [x] Дебаунс(задержка) для запросов поиска

### UX

- [x] Добавить loading-состояния
- [ ] Добавить обработку ошибок
- [x] Проверить адаптивность

### Refactoring

- [ ] Провести рефакторинг похожих компонентов и объединить их в переиспользуемые компоненты
- [ ] Уменьшить дублирование UI и логики между компонентами

## 👨‍💻 Автор

**Emelyan Chekushkin**

[GitHub](https://github.com/CrawFish666)