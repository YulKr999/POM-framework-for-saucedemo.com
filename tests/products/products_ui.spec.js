import { test, expect } from '../fixtures.js';
import { URLS, PAGE_TITLES } from '../../utils/constants';

test.describe('Products UI Scenarios', () => {
    test.beforeEach(async ({ loggedInPage, productsPage }) => {
        await expect(productsPage.page).toHaveURL(new RegExp(URLS.INVENTORY));
        await expect(productsPage.title).toHaveText(PAGE_TITLES.PRODUCTS);
    });

    test('Valid UI scenario: items details content is valid', async ({ productsPage }) => {
        const items = await productsPage.getAllProductLocators();

        await test.step('Verify all product names are visible and not empty', async () => {
            for (const item of items) {
                const name = item.locator(productsPage.itemName);
                await expect.soft(name).toBeVisible();
                await expect.soft(name).not.toBeEmpty();
            }
        });

        await test.step('Verify all product descriptions are visible and not empty', async () => {
            for (const item of items) {
                const desc = item.locator(productsPage.itemDesc);
                await expect.soft(desc).toBeVisible();
                await expect.soft(desc).not.toBeEmpty();
            }
        });

        await test.step('Verify all product prices follow the correct currency format', async () => {
            for (const item of items) {
                const price = item.locator(productsPage.itemPrice);
                await expect.soft(price).toBeVisible();
                await expect.soft(price).toHaveText(/^\$\d+\.\d{2}$/);
            }
        });
    });
});