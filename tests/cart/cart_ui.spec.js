import { test, expect } from '../fixtures.js';
import { URLS, PAGE_TITLES } from '../../utils/constants';

test.describe('Cart Data Persistence', () => {

    test.beforeEach(async ({ loggedInPage, productsPage }) => {
        await expect(productsPage.page).toHaveURL(new RegExp(URLS.INVENTORY));
        await expect(productsPage.title).toHaveText(PAGE_TITLES.PRODUCTS);
    });

    test('Product data persistence in the cart', async ({ productsPage, cartPage }) => {
        let galleryData;

        await test.step('Add product to cart and capture its data', async () => {
            galleryData = await productsPage.addToCartByIndex(0);
        });

        await test.step('Navigate to cart', async () => {
            await productsPage.header.openCart();
            await expect(cartPage.page).toHaveURL(new RegExp(URLS.CART));
            await expect(cartPage.title).toHaveText(PAGE_TITLES.CART);
        });

        await test.step('Verify item data integrity in the cart', async () => {
            await expect(cartPage.cartItems).toHaveCount(1);
            const cartData = await cartPage.getItemData();
            expect.soft(cartData.name, 'Name mismatch in cart').toBe(galleryData.name);
            expect.soft(cartData.desc, 'Description mismatch in cart').toBe(galleryData.desc);
            expect.soft(cartData.price, 'Price mismatch in cart').toBe(galleryData.price);
        });
    });
});