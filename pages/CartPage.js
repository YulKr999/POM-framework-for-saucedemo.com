import { BasePage } from './BasePage';

export class CartPage extends BasePage {
    constructor(page) {
        super(page);

        this.cartItems = page.locator('[data-test="inventory-item"]');
        this.itemName = page.locator('[data-test="inventory-item-name"]');
        this.itemDesc = page.locator('[data-test="inventory-item-desc"]');
        this.itemPrice = page.locator('[data-test="inventory-item-price"]');
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.removeBtnSelector = page.locator('[data-test^="remove-"]');
        this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    }

    async getItemData() {
        return {
            name: await this.itemName.innerText(),
            desc: await this.itemDesc.innerText(),
            price: await this.itemPrice.innerText()
        };
    }

    async removeItem() {
        const removeButton = this.cartItems.first().locator(this.removeBtnSelector);
        await removeButton.click();
    }

    async continueShopping() {
        await this.continueShoppingButton.click();
    }

    async proceedToCheckout() {
        await this.checkoutButton.click();
    }
}