import { BasePage } from './BasePage';

export class CheckoutCompletePage extends BasePage {
    constructor(page) {
        super(page);

        this.completeHeader = page.locator('[data-test="complete-header"]');
        this.completeText = page.locator('[data-test="complete-text"]');
        this.backHomeButton = page.locator('[data-test="back-to-products"]');
        this.ponyImage = page.locator('[data-test="pony-express"]');
    }

    async clickBackHome() {
        await this.backHomeButton.click();
    }
}