import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { ItemPage } from '../pages/ItemPage';
import { CheckoutInformationPage } from '../pages/CheckoutInformationPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';
import { users } from '../utils/testData.js';

export const test = base.extend({

    loginCredentials: { 
        username: users.standard.username, 
        password: users.standard.password 
    },

    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    productsPage: async ({ page }, use) => {
        await use(new ProductsPage(page));
    },

    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },

    itemPage: async ({ page }, use) => {
        await use(new ItemPage(page));
    },

    checkoutInformationPage: async ({ page }, use) => {
        await use(new CheckoutInformationPage(page));
    },

    checkoutOverviewPage: async ({ page }, use) => {
        await use(new CheckoutOverviewPage(page));
    },

    checkoutCompletePage: async ({ page }, use) => {
        await use(new CheckoutCompletePage(page));
    },

    loggedInPage: async ({ page, loginPage, loginCredentials }, use) => {
        await loginPage.navigate();
        await loginPage.login(loginCredentials.username, loginCredentials.password);
        await use(page); 
    },
});

export { expect } from '@playwright/test';