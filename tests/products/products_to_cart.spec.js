import { test, expect } from '../fixtures.js';
import { URLS, PAGE_TITLES } from '../../utils/constants';

test.describe('Products To Cart Scenarios', () => {
    test.beforeEach(async ({ loggedInPage, productsPage }) => {
        await expect(productsPage.page).toHaveURL(new RegExp(URLS.INVENTORY));
        await expect(productsPage.title).toHaveText(PAGE_TITLES.PRODUCTS);
    });

    test('Valid add to Cart scenario', async ({ productsPage, cartPage }) => {
        let productData;

        await test.step('Add the first product to cart', async () => {
            productData = await productsPage.addToCartByIndex(0);
            await expect(productsPage.header.shoppingCartBadge).toHaveText('1');
        });

        await test.step('Navigate to cart and verify content', async () => {
            await productsPage.header.openCart();
            
            await expect(cartPage.cartItems).toHaveCount(1);
            await expect(cartPage.cartItems.filter({ hasText: productData.name })).toBeVisible();
        });
    });
});