import { test, expect } from '@playwright/test';

test.describe('AutomationExercise Checkout', () => {
  test('Complete checkout flow from home to payment', async ({ page }) => {
    // 1. Visit Home Page 
    await page.goto('https://automationexercise.com');
    
    //  checking for "AutomationExercise" text
    await expect(page.locator('img[alt="Website for automation practice"]')).toBeVisible();
    const logo = page.locator('.logo');
    await expect(logo).toBeVisible();
    console.log('✓ Home page loaded successfully');

    // 2. Add first product to cart
    await page.waitForSelector('.features_items');
    
    // Click Add to cart for the first product
    const firstProduct = page.locator('.features_items .product-image-wrapper').first();
    await firstProduct.hover();
    
    const addToCartBtn = firstProduct.locator('a.btn-default.add-to-cart').first();
    await addToCartBtn.click();
    
    console.log('✓ Clicked Add to Cart for first product');

    // Click View Cart in the confirmation modal
    const viewCartBtn = page.locator('a[href="/view_cart"]').filter({ hasText: 'View Cart' });
    await viewCartBtn.click();
    
    // Assert product is in cart
    await expect(page.locator('.cart_description')).toBeVisible();
    const cartItems = page.locator('#cart_info_table tbody tr');
    await expect(cartItems).toHaveCount(1);
    console.log('✓ Product added to cart successfully');

    // 3. Proceed to Checkout
    const proceedToCheckoutBtn = page.locator('a.btn-default.check_out').filter({ hasText: 'Proceed To Checkout' });
    await proceedToCheckoutBtn.click();
    
    // Check if login modal appears
    const loginModal = page.locator('.modal-content');
    const isLoginRequired = await loginModal.isVisible().catch(() => false);
    
    if (isLoginRequired) {
      console.log('Login required, clicking login link...');
      const loginLink = page.locator('a[href="/login"]').filter({ hasText: 'Register / Login' });
      await loginLink.click();
      
      await page.locator('[data-qa="login-email"]').fill('playwrighttest@example.com');
      await page.locator('[data-qa="login-password"]').fill('GFXbtcVV@57kPSH');
      await page.locator('[data-qa="login-button"]').click();
      
      console.log('✓ Logged in successfully');
      
      await page.goto('https://automationexercise.com/view_cart');
      await proceedToCheckoutBtn.click();
    }

    await page.waitForURL('**/checkout');
    console.log('✓ On checkout page');

    // click Place Order button
    const placeOrderBtn = page.locator('a[href="/payment"]');
    await placeOrderBtn.scrollIntoViewIfNeeded();
    await placeOrderBtn.click();

    // 4. payment page and take screenshot
    await page.waitForURL('**/payment');
    
    //  card details form is visible
    const nameOnCardInput = page.locator('[data-qa="name-on-card"]');
    const cardNumberInput = page.locator('[data-qa="card-number"]');
    const cvcInput = page.locator('[data-qa="cvc"]');
    const expiryMonthInput = page.locator('[data-qa="expiry-month"]');
    const expiryYearInput = page.locator('[data-qa="expiry-year"]');
    
    await expect(nameOnCardInput).toBeVisible();
    await expect(cardNumberInput).toBeVisible();
    await expect(cvcInput).toBeVisible();
    await expect(expiryMonthInput).toBeVisible();
    await expect(expiryYearInput).toBeVisible();
    
    console.log('✓ Payment page loaded with card details form');
    
    // Take screenshot
    await page.screenshot({ 
      path: 'screenshots/payment-page.png', 
      fullPage: true 
    });
    
    console.log('✓ Screenshot saved as payment-page.png');
  });
});