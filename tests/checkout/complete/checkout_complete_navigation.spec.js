import { test, expect } from '../../fixtures.js';
import { URLS, PAGE_TITLES, SYSTEM_MESSAGES } from '../../../utils/constants';

test.describe('Checkout Complete Navigation', () => {

    test.beforeEach(async ({ loggedInPage, productsPage, cartPage, checkoutInformationPage, checkoutOverviewPage, checkoutCompletePage }) => {
        await productsPage.addToCartByIndex(0);
        await productsPage.header.openCart();
        await cartPage.proceedToCheckout();
        await checkoutInformationPage.fillInformation();
        await checkoutInformationPage.continueCheckout();
        await checkoutOverviewPage.finishShopping();
        await expect(checkoutCompletePage.page).toHaveURL(new RegExp(URLS.CHECKOUT_COMPLETE));
        await expect(checkoutCompletePage.title).toHaveText(PAGE_TITLES.CHECKOUT_COMPLETE);
    });

    test('Verify completion info and return to products', async ({ productsPage, checkoutCompletePage }) => {
        await test.step('Verify order success messages', async () => {
            await expect(checkoutCompletePage.ponyImage).toBeVisible();
            await expect(checkoutCompletePage.completeHeader).toHaveText(SYSTEM_MESSAGES.ORDER_COMPLETED_HEADER);
            await expect(checkoutCompletePage.completeText).toHaveText(SYSTEM_MESSAGES.ORDER_COMPLETED_TEXT);
        });

        await test.step('Navigate back to Products page', async () => {
            await checkoutCompletePage.clickBackHome();
            await expect(productsPage.page).toHaveURL(new RegExp(URLS.INVENTORY));
            await expect(productsPage.title).toHaveText(PAGE_TITLES.PRODUCTS);
        });
    });

    test('Verify cart is empty after checkout', async ({ checkoutCompletePage, cartPage }) => {
        await test.step('Navigate to Cart from Complete page', async () => {
            await checkoutCompletePage.header.openCart();
            await expect(cartPage.page).toHaveURL(new RegExp(URLS.CART));
        });

        await test.step('Verify that cart contains 0 items', async () => {
            await expect(cartPage.cartItems).toHaveCount(0);
            await expect(cartPage.header.shoppingCartBadge).toBeHidden();
        });
    });
});