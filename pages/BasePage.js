import { Header } from './Components/Header';

export class BasePage {
    constructor(page) {
        this.page = page; 
        this.header = new Header(page);
        this.title = page.locator('[data-test="title"]');
        this.errorMessage = page.locator('[data-test="error"]');
    }

    async getTitleText() {
        return await this.title.innerText();
    }

    async getErrorMessageText() {
        return await this.errorMessage.innerText();
    }
}