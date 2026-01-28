import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {
    constructor(page) {
        super(page);
        
        this.inventoryItems = page.locator('[data-test="inventory-item"]');
        this.itemName = page.locator('[data-test="inventory-item-name"]');
        this.itemDesc = page.locator('[data-test="inventory-item-desc"]');
        this.itemPrice = page.locator('[data-test="inventory-item-price"]');
        this.addToCartBtnSelector = page.locator('button[data-test^="add-to-cart"]');
        this.sortDropdown = page.locator('[data-test="product-sort-container"]');
        this.itemImage = page.locator('[data-test^="inventory-item-"][data-test$="-img"]');
    }

    async getAllProductLocators() {
        return await this.inventoryItems.all();
    }

    async getProductNames() {
        return await this.itemName.allTextContents();
    }

    async selectSortOption(optionValue) {
        await this.sortDropdown.selectOption(optionValue);
    }

    async getProductData(productCard) {
        return {
            name: await productCard.locator(this.itemName).innerText(),
            desc: await productCard.locator(this.itemDesc).innerText(),
            price: await productCard.locator(this.itemPrice).innerText(),
            image: await productCard.locator(this.itemImage).getAttribute('src')
        };
    }

    async addToCartByIndex(index = 0) {
        const productCard = this.inventoryItems.nth(index);
        const data = await this.getProductData(productCard);
        await productCard.locator(this.addToCartBtnSelector).click();
        return data;
    }

    async openItemPageByIndex(index = 0) {
        const productCard = this.inventoryItems.nth(index);
        const data = await this.getProductData(productCard);
        await productCard.locator(this.itemName).click();
        return data;
    }
}