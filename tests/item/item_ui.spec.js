import { test, expect } from '../fixtures.js';
import { URLS, PAGE_TITLES } from '../../utils/constants';

test.describe('Item Positive scenarios', () => {
    test.beforeEach(async ({ loggedInPage, productsPage }) => {
        await expect(productsPage.page).toHaveURL(new RegExp(URLS.INVENTORY));
        await expect(productsPage.title).toHaveText(PAGE_TITLES.PRODUCTS);
    });

    test('Item data consistency and integrity', async ({ productsPage, itemPage }) => {
        let galleryData;

        await test.step('Select product and navigate to details', async () => {
            galleryData = await productsPage.openItemPageByIndex();
            await expect(itemPage.page).toHaveURL(new RegExp(URLS.INVENTORY_ITEM));
        });

        await test.step('Verify item data integrity', async () => {
            const itemData = await itemPage.getItemData();

            expect(itemData.name).toBe(galleryData.name);
            expect(itemData.desc).toBe(galleryData.desc);
            expect(itemData.price).toBe(galleryData.price);
            
            const currentImg = itemData.image.split('/').pop();
            const expectedImg = galleryData.image.split('/').pop();
            expect(currentImg).toBe(expectedImg);
        });
    })
});