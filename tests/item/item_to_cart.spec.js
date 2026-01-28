import { test, expect } from '../fixtures.js';
import { URLS, PAGE_TITLES } from '../../utils/constants';

test.describe('Item Page To Cart Scenarios', () => {
    test.beforeEach(async ({ loggedInPage, productsPage }) => {
        await expect(productsPage.page).toHaveURL(new RegExp(URLS.INVENTORY));
        await expect(productsPage.title).toHaveText(PAGE_TITLES.PRODUCTS);
    });

    test('Add product to cart from Item Page and verify', async ({ productsPage, itemPage, cartPage }) => {
        let productName;

        await test.step('Navigate to Item Page', async () => {
            const data = await productsPage.openItemPageByIndex();
            productName = data.name;
            await expect(itemPage.page).toHaveURL(new RegExp(URLS.INVENTORY_ITEM));
        });

        await test.step('Add product to cart', async () => {
            await itemPage.addToCart();
            await expect(itemPage.removeBtn).toBeVisible();
            await expect(itemPage.removeBtn).toHaveText('Remove');
            await expect(itemPage.header.shoppingCartBadge).toHaveText('1');
        });

        await test.step('Verify product in the cart', async () => {
            await itemPage.header.openCart();
            await expect(cartPage.page).toHaveURL(URLS.CART);
            await expect(cartPage.cartItems).toHaveCount(1);
            await expect(cartPage.cartItems.filter({ hasText: productName })).toBeVisible();
        });
    });

    test('Add and then remove product from Item Page', async ({ productsPage, itemPage }) => {
        await test.step('Navigate to Item Page', async () => {
            await productsPage.openItemPageByIndex(); 
        });

        await test.step('Add product to cart', async () => {
            await itemPage.addToCart();
            await expect(itemPage.header.shoppingCartBadge).toHaveText('1');
        });

        await test.step('Remove product and verify UI state', async () => {
            await itemPage.removeFromCart();
            await expect(itemPage.addToCartBtn).toBeVisible();
            await expect(itemPage.addToCartBtn).toHaveText('Add to cart');
            await expect(itemPage.header.shoppingCartBadge).toBeHidden();
        });
    });
});