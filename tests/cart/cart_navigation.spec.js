import { test, expect } from '../fixtures.js';
import { URLS, PAGE_TITLES } from '../../utils/constants';

test.describe('Cart Navigation Flow', () => {

    test.beforeEach(async ({ loggedInPage, productsPage, cartPage }) => {
        await expect(productsPage.page).toHaveURL(new RegExp(URLS.INVENTORY));
        await expect(productsPage.title).toHaveText(PAGE_TITLES.PRODUCTS);
        
        await productsPage.addToCartByIndex(0);
        await productsPage.header.openCart();
        
        await expect(cartPage.page).toHaveURL(new RegExp(URLS.CART));
        await expect(cartPage.title).toHaveText(PAGE_TITLES.CART);
    });

    test('Return to catalog from cart', async ({ productsPage, cartPage }) => {

        await test.step('Verify redirect to Products Page after clicking Continue Shopping', async () => {
            await cartPage.continueShopping();
            
            await expect(productsPage.page).toHaveURL(new RegExp(URLS.INVENTORY));
            await expect(productsPage.title).toHaveText(PAGE_TITLES.PRODUCTS);
        });

        await test.step('Verify cart badge still shows 1 item', async () => {
            await expect(productsPage.header.shoppingCartBadge).toHaveText('1');
        });
    });
});