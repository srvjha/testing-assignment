# AutomationExercise Playwright Test

This project contains automated tests for the AutomationExercise website using Playwright with TypeScript.


## Installation

1. Clone the repository:
```bash
git clone "https://github.com/srvjha/testing-assignment"
cd testing-assignment
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install
```

## Project Structure

```
automation-exercise-test/
├── tests/
│   └── manual.spec.ts            # Manual test file
│   └── codegen.spec.ts           # Here add the copied test code from the inspect
├── screenshots/                  # Generated screenshots
├── playwright.config.ts          # Playwright configuration
├── package.json
└── README.md
```

## Running Tests

### Run all tests (headless mode):
```bash
npm test
```

### Run tests in headed mode (see browser):
```bash
npm run test:headed
```

### Run tests in UI mode (interactive):
```bash
npm run test:ui
```

### View test report:
```bash
npm run report
```

### Use Playwright Codegen (for finding locators):
```bash
npm run codegen
```

## Test Scenarios

The test suite covers the following flow:

1. **Visit Home Page** - Navigate to https://automationexercise.com and verify page load
2. **Add Product to Cart** - Add first product and verify it's in the cart
3. **Proceed to Checkout** - Handle login if required using test credentials
4. **Place Order** - Navigate to payment page and take screenshot

## Test Credentials

- Email: `playwrighttest@example.com`
- Password: `GFXbtcVV@57kPSH`

## Screenshots

Screenshots are automatically saved in the `screenshots/` folder when tests reach the payment page.

## Troubleshooting

If tests fail:
1. Ensure you have a stable internet connection
2. The website might be down or slow - increase timeout if needed
3. Check if the website structure has changed
4. Run in headed mode to see what's happening: `npm run test:headed`
