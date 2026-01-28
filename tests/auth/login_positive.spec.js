import { test, expect } from '../fixtures'
import { users } from '../../utils/testData';
import { PAGE_TITLES, URLS } from '../../utils/constants';

test.describe('Login Positive Scenarios', () => {

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.navigate();
        await expect(loginPage.page).toHaveURL(process.env.BASE_URL);
    })

    const positiveScenarios = [
        {
            name: 'standard user',
            username: users.standard.username,
            password: users.standard.password
        }
    ]

    for (const scenario of positiveScenarios){
        test(`Valid login scenario: ${scenario.name}`, async ({ loginPage, productsPage }) => {
            await loginPage.login(scenario.username, scenario.password);
            
            await expect(productsPage.page).toHaveURL(new RegExp(URLS.INVENTORY));
            await expect(productsPage.title).toHaveText(PAGE_TITLES.PRODUCTS);
        });
    };

});

// import { test } from '../fixtures'
// import { users } from '../../utils/testData';

// test.describe('Login Positive Scenarios', () => {

//     test.beforeEach(async ({ loginPage }) => {
//         await loginPage.navigate();
//     })

//     const positiveScenarios = [
//         {
//             name: 'standard user',
//             username: users.standard.username,
//             password: users.standard.password
//         }
//     ]

//     for (const scenario of positiveScenarios){
//         test(`Valid login scenario: ${scenario.name}`, async ({ loginPage, productsPage }) => {
//             await loginPage.login(scenario.username, scenario.password);
//             await productsPage.expectPageIsLoaded();
//         });
//     };

// });