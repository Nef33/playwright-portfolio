# Playwright Portfolio — Sauce Demo E2E Tests

End-to-end test automation framework built with Playwright and TypeScript, 
testing the [Sauce Demo](https://www.saucedemo.com) e-commerce application.

## Tech Stack

- [Playwright](https://playwright.dev) — test framework
- TypeScript — language
- GitHub Actions — CI/CD pipeline

## Project Structure

├── pages/              # Page Object Model classes
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   └── CartPage.ts
├── tests/              # Test suites organized by feature
│   ├── auth/
│   │   └── login.spec.ts
│   └── cart/
│       └── cart.spec.ts
├── utils/
│   └── testData.ts     # Centralized test data
└── playwright.config.ts
## Test Coverage

**Authentication**
- Standard user login
- Locked out user error handling
- Invalid credentials validation

**Shopping Cart**
- Add single item to cart
- Add multiple items to cart
- Verify correct items in cart
- Remove item from cart

## Run Tests

Install dependencies:
```bash
npm install
npx playwright install
```

Run all tests:
```bash
npx playwright test
```

Run specific suite:
```bash
npx playwright test tests/auth/login.spec.ts
```

Run headed (watch in browser):
```bash
npx playwright test --headed
```

View HTML report:
```bash
npx playwright show-report
```

## CI/CD

Tests run automatically on every push via GitHub Actions across 
Chromium, Firefox, and WebKit.