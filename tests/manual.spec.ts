import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://automationexercise.com/');
  await page.getByText('Add to cart').nth(1).click();
  await page.getByRole('link', { name: 'View Cart' }).click();
  await page.getByText('Proceed To Checkout').click();
  await page.getByRole('link', { name: 'Register / Login' }).click();
  await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').click();
  await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').fill('playwrighttest@example.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('GFXbtcVV@57kPSH');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: ' Cart' }).click();
  await page.getByText('Proceed To Checkout').click();
  await page.getByRole('link', { name: 'Place Order' }).click();
  await expect(page.locator('#cart_items')).toMatchAriaSnapshot(`
    - list:
      - listitem:
        - link "Home":
          - /url: /
      - listitem: Payment
    - heading "Payment" [level=2]
    - text: Name on Card
    - textbox
    - text: Card Number
    - textbox
    - text: CVC
    - textbox /ex\\. \\d+/
    - text: Expiration
    - textbox "MM"
    - textbox "YYYY"
    - button "Pay and Confirm Order"
    `);
});