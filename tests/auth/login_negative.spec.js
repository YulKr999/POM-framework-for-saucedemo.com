import { test, expect } from '../fixtures.js';
import { users } from '../../utils/testData';
import { SYSTEM_MESSAGES } from '../../utils/constants';

test.describe('Login Negative Scenarios', () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.navigate();
        await expect(loginPage.page).toHaveURL(process.env.BASE_URL);
    });

    const negativeScenarios = [
        {
            name: 'locked out user',
            username: users.lockedOut.username,
            password: users.lockedOut.password,
            error: SYSTEM_MESSAGES.AUTH_ERRORS.LOCKED_OUT
        },
        {
            name: 'empty username',
            username: undefined,
            password: users.standard.password,
            error: SYSTEM_MESSAGES.AUTH_ERRORS.USERNAME_REQUIRED
        },
        {
            name: 'empty password',
            username: users.standard.username,
            password: undefined,
            error: SYSTEM_MESSAGES.AUTH_ERRORS.PASSWORD_REQUIRED
        },
        {
            name: 'incorrect password',
            username: users.standard.username,
            password: users.invalid.password,
            error: SYSTEM_MESSAGES.AUTH_ERRORS.DO_NOT_MATCH
        }
    ]

    for (const scenario of negativeScenarios) {
        test(`Invalid login: ${scenario.name}`, async ({ loginPage }) => {
            await loginPage.login(scenario.username, scenario.password);
            
            await expect(loginPage.page).toHaveURL(process.env.BASE_URL);
            await expect(loginPage.errorMessage).toHaveText(scenario.error);
        });
    }
});