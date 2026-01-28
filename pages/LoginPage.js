import { BasePage } from "./BasePage";
import { URLS } from '../utils/constants';

export class LoginPage extends BasePage {
    constructor(page) {
        super(page);
        this.path = URLS.LOGIN;
        this.usernameInput = page.locator('[data-test="username"]');
        this.passwordInput = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-button"]');
    }

    async navigate() {
        await this.page.goto(this.path);
    }

    async login(username = '', password = '') {
        if (username) await this.usernameInput.fill(username);
        if (password) await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}