import { test, expect } from '../fixtures.js';
import { URLS, PAGE_TITLES } from '../../utils/constants';

test.describe('Cart Checkout Entry Point', () => {

    test.beforeEach(async ({ loggedInPage, productsPage, cartPage }) => {
        await expect(productsPage.page).toHaveURL(new RegExp(URLS.INVENTORY));
        await expect(productsPage.title).toHaveText(PAGE_TITLES.PRODUCTS);
        
        await productsPage.addToCartByIndex(0);
        await productsPage.header.openCart();
        
        await expect(cartPage.page).toHaveURL(new RegExp(URLS.CART));
        await expect(cartPage.title).toHaveText(PAGE_TITLES.CART);
    });

    test('Proceed to Checkout Information from cart with items', async ({ cartPage, checkoutInformationPage }) => {
        await test.step('Verify transition to Checkout Information page', async () => {
            await cartPage.proceedToCheckout();
            
            await expect(checkoutInformationPage.page).toHaveURL(new RegExp(URLS.CHECKOUT_INFO));
            await expect(checkoutInformationPage.title).toHaveText(PAGE_TITLES.CHECKOUT_INFO);
        });
    });
});