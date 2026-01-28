import { test, expect } from '../../fixtures.js';
import { URLS, PAGE_TITLES } from '../../../utils/constants';

test.describe('Checkout Overview Total Price', () => {

    test.beforeEach(async ({ loggedInPage, productsPage, cartPage, checkoutInformationPage, checkoutOverviewPage }) => {
        await productsPage.addToCartByIndex(0);
        await productsPage.header.openCart();
        await cartPage.proceedToCheckout();
        await checkoutInformationPage.fillInformation();
        await checkoutInformationPage.continueCheckout();
        
        await expect(checkoutOverviewPage.page).toHaveURL(new RegExp(URLS.CHECKOUT_OVERVIEW));
        await expect(checkoutOverviewPage.title).toHaveText(PAGE_TITLES.CHECKOUT_OVERVIEW);
    });

    test('Price Total correct in the Overview page', async ({ checkoutOverviewPage }) => {
        await test.step('Verify that Total = Item Total + Tax', async () => {
            const itemTotal = await checkoutOverviewPage.getSummaryValue(checkoutOverviewPage.subtotalLabel);
            const tax = await checkoutOverviewPage.getSummaryValue(checkoutOverviewPage.taxLabel);
            const actualTotal = await checkoutOverviewPage.getSummaryValue(checkoutOverviewPage.totalLabel);

            const expectedTotal = itemTotal + tax;

            expect(actualTotal.toFixed(2), 
                `Total price calculation mismatch: ${itemTotal} + ${tax} should be ${expectedTotal.toFixed(2)}`
            ).toBe(expectedTotal.toFixed(2));
        });
    });
});