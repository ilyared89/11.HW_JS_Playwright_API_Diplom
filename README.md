# 🎓 Дипломный проект: QA Automation на Playwright

[![Playwright Tests](https://github.com/ilyared89/11.HW_JS_Playwright_API_Diplom/actions/workflows/ci.yml/badge.svg)](https://github.com/ilyared89/11.HW_JS_Playwright_API_Diplom/actions/workflows/ci.yml)
[![Allure Report](https://img.shields.io/badge/Allure%20Report-GitHub%20Pages-brightgreen)](https://ilyared89.github.io/11.HW_JS_Playwright_API_Diplom/)
[![Allure TestOps](https://img.shields.io/badge/Allure%20TestOps-Cloud-blue)](https://allure.autotests.cloud/)
[![Telegram](https://img.shields.io/badge/Telegram-Notifications-2CA5E0?logo=telegram)](https://t.me/)

## 🎯 Цель проекта

Демонстрация навыков автоматизации тестирования, полученных в рамках курса:

- **UI автоматизация** — 7 функциональных тестов с Page Object, генератором данных и кастомными ассертами
- **API автоматизация** — 8 функциональных тестов с Service Layer, генератором данных и кастомными ассертами
- **CI/CD** — запуск в GitHub Actions и Jenkins с уведомлениями в Telegram
- **Reporting** — Allure Report с историей в GitHub Pages + Allure TestOps

## 🧰 Технологический стек

| Категория        | Инструмент                                                     |
| ---------------- | -------------------------------------------------------------- |
| Язык             | JavaScript (ES Modules)                                        |
| Фреймворк        | Playwright                                                     |
| UI сайт          | [demowebshop.tricentis.com](https://demowebshop.tricentis.com) |
| API сайт         | json-server (local, via globalSetup)                           |
| Паттерны         | Page Object, Service Layer, Builder                            |
| Генерация данных | @faker-js/faker                                                |
| Отчётность       | Allure Report, Allure TestOps                                  |
| CI/CD            | GitHub Actions, Jenkins                                        |
| Уведомления      | Telegram Bot                                                   |

## 🚀 Быстрый старт

### Установка

```bash
# Клонирование репозитория
git clone https://github.com/ilyared89/11.HW_JS_Playwright_API_Diplom.git
cd 11.HW_JS_Playwright_API_Diplom
npm install

# Установка зависимостей
npm ci
# Установка браузеров Playwright
npx playwright install chromium
```

### Запуск тестов

```bash
# Все тесты
npm test
# Только UI тесты
npm run test:ui
# Только API тесты
npm run test:api
```

### Отчёты

```bash
# Генерация Allure Report
npm run allure:generate
# Открытие отчёта
npm run allure:open
# Serve режим
npm run allure:serve
```

## 📁 Структура проекта

```
.
├── src/
|   ├── facades/
|   |   ├── api.facade.js
|   |   ├── app.facade.js
│   ├── pages/
│   │   ├── base.page.js
│   │   ├── login.page.js
│   │   ├── register.page.js
│   │   ├── home.page.js
│   │   ├── product.page.js
│   │   └── cart.page.js
│   ├── services/
│   │   ├── api.service.js
│   │   ├── posts.service.js
│   │   └── comments.service.js
│   ├── helpers/
│   │   ├── builders/
│   │   │   ├── user.builder.js
│   │   │   ├── post.builder.js
│   │   │   └── comment.builder.js
│   │   └── fixtures/
│   │       ├── ui.fixture.js
│   │       └── api.fixture.js
├── tests/
│   ├── ui/
│   │   ├── login.test.js
│   │   ├── register.test.js
│   │   ├── search.test.js
│   │   ├── cart.test.js
│   │   └── newsletter.test.js
│   └── api/
│       ├── posts.test.js
│       ├── posts-get.test.js
│       ├── posts-update.test.js
│       ├── posts-delete.test.js
│       └── comments.test.js
├── allure/
│   └── categories.json
├── notifications/
│   └── telegram.json
├── .github/workflows/
│   └── ci.yml
├── Jenkinsfile
├── playwright.config.js
├── package.json
└── README.md
```

## 🔗 Полезные ссылки

| Ресурс                       | Ссылка                                                      |
| ---------------------------- | ----------------------------------------------------------- |
| Allure Report (GitHub Pages) | https://ilyared89.github.io/11.HW_JS_Playwright_API_Diplom/ |
| Allure TestOps               | https://allure.autotests.cloud/                             |
| Jenkins                      | https://jenkins.autotests.cloud/                            |
| UI тестируемый сайт          | https://demowebshop.tricentis.com                           |
| API тестируемый сайт         | json-server (локальный, поднимается через globalSetup)      |

## 🏗️ CI/CD

### GitHub Actions

- Автозапуск при `push`/`pull_request` в `main`
- Ручной запуск с выбором suite (all/ui/api)
- Генерация Allure Report с историей на GitHub Pages
- Уведомления в Telegram со ссылками на отчёт и Actions
- Загрузка результатов в Allure TestOps

## 📝 Allure TestOps

- Результаты загружаются через `allurectl`
- 🔧 Allure TestOps
- [Ссыла на отчет](https://allure.autotests.cloud/project/5227/launches)
  ![Allure TestOps](image-8.png)
- 📊 Allure Report
  ![Отчет](image-7.png)
- Интеграция с GitHub для отслеживания коммитов
- Тест-кейсы синхронизируются автоматически

## 📝 Telegram notifications

- ![telegram](image-6.png)

---

**Автор:** [ilyared89](https://github.com/ilyared89)
