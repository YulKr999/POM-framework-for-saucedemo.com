import { test, expect } from '../../fixtures.js';
import { URLS, PAGE_TITLES } from '../../../utils/constants';

test.describe('Checkout Overview Navigation Flow', () => {

    test.beforeEach(async ({ loggedInPage, productsPage, cartPage, checkoutInformationPage, checkoutOverviewPage }) => {
        await productsPage.addToCartByIndex(0);
        await productsPage.header.openCart();
        await cartPage.proceedToCheckout();
        await checkoutInformationPage.fillInformation();
        await checkoutInformationPage.continueCheckout();
        
        await expect(checkoutOverviewPage.page).toHaveURL(new RegExp(URLS.CHECKOUT_OVERVIEW));
        await expect(checkoutOverviewPage.title).toHaveText(PAGE_TITLES.CHECKOUT_OVERVIEW);
    });

    test('Return to catalog from Overview page', async ({ productsPage, checkoutOverviewPage }) => {
        await test.step('Cancel shopping on Checkout Overview page', async () => {
            await checkoutOverviewPage.cancelShopping();
            
            await expect(productsPage.page).toHaveURL(new RegExp(URLS.INVENTORY));
            await expect(productsPage.title).toHaveText(PAGE_TITLES.PRODUCTS);
        });
    });

    test('Finish payment from Overview page', async ({ checkoutOverviewPage, checkoutCompletePage }) => {
        await test.step('Finish payment on Checkout Overview page', async () => {
            await checkoutOverviewPage.finishShopping();
            
            await expect(checkoutCompletePage.page).toHaveURL(new RegExp(URLS.CHECKOUT_COMPLETE));
            await expect(checkoutCompletePage.title).toHaveText(PAGE_TITLES.CHECKOUT_COMPLETE);
        });
    });
});