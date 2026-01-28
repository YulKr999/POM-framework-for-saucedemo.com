import { BasePage } from './BasePage';

export class ItemPage extends BasePage {
    constructor(page) {
        super(page);

        this.itemName = page.locator('[data-test="inventory-item-name"]');
        this.itemDesc = page.locator('[data-test="inventory-item-desc"]');
        this.itemPrice = page.locator('[data-test="inventory-item-price"]');
        this.itemImage = page.locator('[data-test$="-img"]');
        this.addToCartBtn = page.locator('[data-test^="add-to-cart"]');
        this.removeBtn = page.locator('[data-test^="remove"]');
    }

    async getItemData() {
        return {
            name: await this.itemName.innerText(),
            desc: await this.itemDesc.innerText(),
            price: await this.itemPrice.innerText(),
            image: await this.itemImage.getAttribute('src')
        };
    }

    async addToCart() {
        await this.addToCartBtn.click();
    }

    async removeFromCart() {
        await this.removeBtn.click();
    }
}