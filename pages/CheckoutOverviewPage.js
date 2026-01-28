import { BasePage } from './BasePage';

export class CheckoutOverviewPage extends BasePage {
    constructor(page) {
        super(page);

        this.cartItems = page.locator('[data-test="inventory-item"]');
        this.itemName = page.locator('[data-test="inventory-item-name"]');
        this.itemPrice = page.locator('[data-test="inventory-item-price"]');
        this.subtotalLabel = page.locator('[data-test="subtotal-label"]');
        this.taxLabel = page.locator('[data-test="tax-label"]');
        this.totalLabel = page.locator('[data-test="total-label"]');
        this.finishShoppingButton = page.locator('[data-test="finish"]');
        this.cancelShoppingButton = page.locator('[data-test="cancel"]');
    }

    async getSummaryValue(locator) {
        const text = await locator.innerText();
        const value = parseFloat(text.replace(/[^0-9.]/g, ''));
        if (isNaN(value)) throw new Error(`Could not parse price from: "${text}"`);
        return value;
    }

    async finishShopping() {
        await this.finishShoppingButton.click();
    }

    async cancelShopping() {
        await this.cancelShoppingButton.click();
    }

    async getItemData() {
        return {
            name: await this.itemName.innerText(),
            price: await this.itemPrice.innerText()
        };
    }
}