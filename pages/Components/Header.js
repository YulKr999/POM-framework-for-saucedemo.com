export class Header {
    constructor(page) {
        this.page = page;
        this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]');
        this.shoppingCartBadge = page.locator('[data-test="shopping-cart-badge"]');
    }

    async openCart() {
        await this.shoppingCartLink.click();
    }

    async getCartBadgeCount() {
        if (await this.shoppingCartBadge.isHidden()) return "0";
        return await this.shoppingCartBadge.innerText();
    }
}