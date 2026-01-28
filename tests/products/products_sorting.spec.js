import { test, expect } from '../fixtures.js';
import { sorting } from '../../utils/testData';
import { URLS, PAGE_TITLES } from '../../utils/constants';

test.describe('Products Sorting Scenarios', () => {
    test.beforeEach(async ({ loggedInPage, productsPage }) => {
        await expect(productsPage.page).toHaveURL(new RegExp(URLS.INVENTORY));
        await expect(productsPage.title).toHaveText(PAGE_TITLES.PRODUCTS);
    });

    test('Sorting by Name Z to A', async ({ productsPage }) => {
        await productsPage.selectSortOption(sorting.nameZA);
        
        const actualNames = await productsPage.getProductNames();
        const expectedNames = [...actualNames].sort((a, b) => b.localeCompare(a));
        
        expect(actualNames).toEqual(expectedNames);
    });

    test('Sorting by Name A to Z', async ({ productsPage }) => {
        await productsPage.selectSortOption(sorting.nameZA);
        await productsPage.selectSortOption(sorting.nameAZ);
        
        const actualNames = await productsPage.getProductNames();
        const expectedNames = [...actualNames].sort();
        
        expect(actualNames).toEqual(expectedNames);
    });
});