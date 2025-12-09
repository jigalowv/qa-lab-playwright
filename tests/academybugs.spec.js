const { test, expect } = require('@playwright/test');

test.describe('Фінальний набір тестів для AcademyBugs.com', () => {

  // ТЕСТ #1: УСПІШНИЙ ПЕРЕХІД НА СТОРІНКУ ТОВАРУ
  test('Перевірка успішного переходу на сторінку товару', async ({ page }) => {
    // Крок 1: Відкриваємо сторінку зі списком усіх товарів
    await page.goto('https://academybugs.com/find-bugs/');

    // Крок 2: Знаходимо посилання на товар "DNK Yellow Shoes" і клікаємо на нього
    const productLink = page.locator('a', { hasText: 'DNK Yellow Shoes' }).first();
    await productLink.click();

    // Крок 3: Перевіряємо, що ми опинилися на правильній сторінці
    const pageTitle = page.locator('h1').first();
    await expect(pageTitle).toHaveText('DNK Yellow Shoes');
  });

  // ТЕСТ #2: ДОДАВАННЯ ТОВАРУ В КОШИК
  test('Перевірка додавання товару в кошик', async ({ page }) => {
    // Крок 1: Відкриваємо сторінку товару "Blue Tshirt"
    await page.goto('https://academybugs.com/store/blue-tshirt/');

    // Крок 2: Натискаємо на кнопку "ADD TO CART"
    const addToCartBtn = page.getByRole('button', { name: 'ADD TO CART' });
    await addToCartBtn.click();

    // Крок 3: Перевіряємо, що відбувся перехід на сторінку кошика
    await expect(page).toHaveURL(/.*my-cart/);

    // Крок 4: Перевіряємо, що товар "Blue Tshirt" відображається на сторінці кошика
    const productInCart = page.locator('a.ec_cartitem_title', { hasText: 'Blue Tshirt' }).first();
    await expect(productInCart).toBeVisible();
  });

});
