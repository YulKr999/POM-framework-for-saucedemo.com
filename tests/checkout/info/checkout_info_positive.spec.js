import { test, expect } from '../../fixtures.js';
import { URLS, PAGE_TITLES } from '../../../utils/constants.js';

test.describe('Checkout Information Positive Scenarios', () => {

    test.beforeEach(async ({ loggedInPage, productsPage, cartPage, checkoutInformationPage }) => {
        await expect(productsPage.page).toHaveURL(new RegExp(URLS.INVENTORY));
        await productsPage.addToCartByIndex(0);
        await productsPage.header.openCart();
        await cartPage.proceedToCheckout();
        await expect(checkoutInformationPage.page).toHaveURL(new RegExp(URLS.CHECKOUT_INFO));
        await expect(checkoutInformationPage.title).toHaveText(PAGE_TITLES.CHECKOUT_INFO);
    });

    test('Positive checkout scenario: successful data entry', async ({ checkoutInformationPage, checkoutOverviewPage }) => {
        
        await test.step('Fill user information and proceed to Overview', async () => {
            await checkoutInformationPage.fillInformation();
            await checkoutInformationPage.continueCheckout();
            
            await expect(checkoutOverviewPage.page).toHaveURL(new RegExp(URLS.CHECKOUT_OVERVIEW));
            await expect(checkoutOverviewPage.title).toHaveText(PAGE_TITLES.CHECKOUT_OVERVIEW);
        });

    });
});