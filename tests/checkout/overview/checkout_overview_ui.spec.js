import { test, expect } from '../../fixtures.js';
import { URLS, PAGE_TITLES } from '../../../utils/constants';

test.describe('Checkout Overview Persistence', () => {

    test.beforeEach(async ({ loggedInPage, productsPage }) => {
        await expect(productsPage.page).toHaveURL(new RegExp(URLS.INVENTORY));
    });

    async function prepareOrderToOverview(productsPage, cartPage, checkoutInformationPage) {
        const data = await productsPage.addToCartByIndex(0);
        await productsPage.header.openCart();
        await cartPage.proceedToCheckout();
        await checkoutInformationPage.fillInformation();
        await checkoutInformationPage.continueCheckout();
        return data; 
    }

    test('Product data persistence in the Overview page', async ({ 
        productsPage, cartPage, checkoutInformationPage, checkoutOverviewPage 
    }) => {
        let galleryData;

        await test.step('Prepare order and navigate to Overview page', async () => {
            galleryData = await prepareOrderToOverview(productsPage, cartPage, checkoutInformationPage);
            
            await expect(checkoutOverviewPage.page).toHaveURL(new RegExp(URLS.CHECKOUT_OVERVIEW));
            await expect(checkoutOverviewPage.title).toHaveText(PAGE_TITLES.CHECKOUT_OVERVIEW);
        });

        await test.step('Verify item data integrity on Overview page', async () => {
            const overviewData = await checkoutOverviewPage.getItemData();

            expect.soft(overviewData.name, 'Product name mismatch').toBe(galleryData.name);
            expect.soft(overviewData.price, 'Product price mismatch').toBe(galleryData.price);
        });
    });
});