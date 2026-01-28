import { test, expect } from '../../fixtures.js';
import { URLS, PAGE_TITLES } from '../../../utils/constants';

test.describe('Checkout Navigation and Logic', () => {

    test.beforeEach(async ({ loggedInPage, productsPage, cartPage, checkoutInformationPage }) => {
        await productsPage.addToCartByIndex(0);
        await productsPage.header.openCart();
        await cartPage.proceedToCheckout();
        await expect(checkoutInformationPage.page).toHaveURL(new RegExp(URLS.CHECKOUT_INFO));
    });

    test('Return to cart from Checkout Information page', async ({ cartPage, checkoutInformationPage }) => {
        await test.step('Cancel shopping and verify redirect to Cart', async () => {
            await checkoutInformationPage.cancelShopping();
            await expect(cartPage.page).toHaveURL(new RegExp(URLS.CART));
            await expect(cartPage.title).toHaveText(PAGE_TITLES.CART);
        });
    });

    test('Verify price calculation on Overview page', async ({ checkoutInformationPage, checkoutOverviewPage }) => {
        await test.step('Fill info and proceed to Overview', async () => {
            await checkoutInformationPage.fillInformation();
            await checkoutInformationPage.continueCheckout();
            await expect(checkoutOverviewPage.page).toHaveURL(new RegExp(URLS.CHECKOUT_OVERVIEW));
        });

        await test.step('Validate total price calculation (Subtotal + Tax)', async () => {
            const subtotal = await checkoutOverviewPage.getSummaryValue(checkoutOverviewPage.subtotalLabel);
            const tax = await checkoutOverviewPage.getSummaryValue(checkoutOverviewPage.taxLabel);
            const total = await checkoutOverviewPage.getSummaryValue(checkoutOverviewPage.totalLabel);

            const expectedTotal = subtotal + tax;
            
            expect(total, `Total ${total} should be sum of ${subtotal} + ${tax}`).toBe(expectedTotal);
        });
    });
});