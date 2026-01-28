import { test, expect } from '../fixtures.js';
import { URLS, PAGE_TITLES } from '../../utils/constants';

test.describe('Cart Remove Functionality', () => {

    test.beforeEach(async ({ loggedInPage, productsPage, cartPage }) => {
        await expect(productsPage.page).toHaveURL(new RegExp(URLS.INVENTORY));
        await expect(productsPage.title).toHaveText(PAGE_TITLES.PRODUCTS);
        
        await productsPage.addToCartByIndex(0);
        await productsPage.header.openCart();
        
        await expect(cartPage.page).toHaveURL(new RegExp(URLS.CART));
        await expect(cartPage.title).toHaveText(PAGE_TITLES.CART);
    });

    test('Item is deleted from cart after remove', async ({ cartPage }) => {
        await test.step('Remove item from cart', async () => {
            await cartPage.removeItem();
        });

        await test.step('Verify item is removed from the list', async () => {
            await expect(cartPage.cartItems).toHaveCount(0);
        });

        await test.step('Verify cart badge is hidden', async () => {
            await expect(cartPage.header.shoppingCartBadge).toBeHidden();
        });
    });
});