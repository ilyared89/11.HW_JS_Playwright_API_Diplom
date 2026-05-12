 # 🎓 Дипломный проект: QA Automation на Playwright

## 🎯 Цель
Демонстрация навыков автоматизации: UI + API тестирование, CI/CD, отчетность.

## 🧰 Технологии
- Playwright + JavaScript (ESM)
- Page Object / Service Layer паттерны
- Faker.js для генерации данных
- Allure Report + Allure TestOps
- GitHub Actions CI/CD
- Telegram уведомления

## 🚀 Быстрый старт
```bash
# Установка
npm init -y
npm install -D @playwright/test @faker-js/faker allure-playwright dotenv
npx playwright install chromium


# Запуск UI тестов
npm run test -- tests/ui/

# Запуск API тестов  
npm run test -- tests/api/

# Генерация отчета
npm run allure:serve

#Запуск нотификации в телеграм
npm run test:notify 
 
