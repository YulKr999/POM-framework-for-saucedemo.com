import { test, expect } from '../../fixtures.js';
import { URLS, PAGE_TITLES, SYSTEM_MESSAGES } from '../../../utils/constants';

test.describe('Checkout Complete UI', () => {

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

    test('Verify UI on Complete Page', async ({ checkoutCompletePage }) => {
        await test.step('Verify Complete title, text and image visibility', async () => {
            await expect(checkoutCompletePage.ponyImage).toBeVisible();
            await expect(checkoutCompletePage.completeHeader).toBeVisible();
            await expect(checkoutCompletePage.completeHeader).toHaveText(SYSTEM_MESSAGES.ORDER_COMPLETED_HEADER);
            await expect(checkoutCompletePage.completeText).toBeVisible();
            await expect(checkoutCompletePage.completeText).toHaveText(SYSTEM_MESSAGES.ORDER_COMPLETED_TEXT);
            await expect(checkoutCompletePage.backHomeButton).toBeVisible();
        });
    });
});