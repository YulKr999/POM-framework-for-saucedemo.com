import { test, expect } from '../../fixtures.js';
import { checkoutUser } from '../../../utils/testData.js';
import { SYSTEM_MESSAGES, URLS, PAGE_TITLES } from '../../../utils/constants.js';

test.describe('Checkout Information Negative Scenarios', () => {

    test.beforeEach(async ({ loggedInPage, productsPage, cartPage, checkoutInformationPage }) => {
        await expect(productsPage.page).toHaveURL(new RegExp(URLS.INVENTORY));
        await productsPage.addToCartByIndex(0);
        await productsPage.header.openCart();
        await cartPage.proceedToCheckout();
        
        await expect(checkoutInformationPage.page).toHaveURL(new RegExp(URLS.CHECKOUT_INFO));
        await expect(checkoutInformationPage.title).toHaveText(PAGE_TITLES.CHECKOUT_INFO);
    });

    const checkoutScenarios = [
        {
            name: 'empty First Name',
            firstName: '',
            lastName: checkoutUser.customer.lastName,
            zip: checkoutUser.customer.zipCode,
            error: SYSTEM_MESSAGES.CHECKOUT_ERRORS.FIRST_NAME_REQUIRED
        },
        {
            name: 'empty Last Name',
            firstName: checkoutUser.customer.firstName,
            lastName: '',
            zip: checkoutUser.customer.zipCode,
            error: SYSTEM_MESSAGES.CHECKOUT_ERRORS.LAST_NAME_REQUIRED
        },
        {
            name: 'empty Zip/Postal Code',
            firstName: checkoutUser.customer.firstName,
            lastName: checkoutUser.customer.lastName,
            zip: '',
            error: SYSTEM_MESSAGES.CHECKOUT_ERRORS.ZIP_CODE_REQUIRED
        }
    ];

    for (const scenario of checkoutScenarios) {
        test(`Invalid checkout scenario: ${scenario.name}`, async ({ checkoutInformationPage }) => {
            await test.step('Fill partial information', async () => {
                await checkoutInformationPage.fillInformation(
                    scenario.firstName, 
                    scenario.lastName, 
                    scenario.zip
                );
            });

            await test.step('Verify error message and stay on the same page', async () => {
                await checkoutInformationPage.continueCheckout();
                
                await expect(checkoutInformationPage.errorMessage).toBeVisible();
                await expect(checkoutInformationPage.errorMessage).toHaveText(scenario.error);
                
                await expect(checkoutInformationPage.page).toHaveURL(new RegExp(URLS.CHECKOUT_INFO));
            });
        });
    }
});