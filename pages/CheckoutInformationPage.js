import { BasePage } from './BasePage';
import { checkoutUser } from '../utils/testData.js';

export class CheckoutInformationPage extends BasePage {
    constructor(page) {
        super(page);
        
        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.zipInput = page.locator('[data-test="postalCode"]');
        this.continueCheckoutButton = page.locator('[data-test="continue"]');
        this.cancelShoppingButton = page.locator('[data-test="cancel"]');
    }

    async fillInformation(
        firstName = checkoutUser.customer.firstName, 
        lastName = checkoutUser.customer.lastName, 
        zip = checkoutUser.customer.zipCode
    ) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.zipInput.fill(zip);
    }

    async continueCheckout() {
        await this.continueCheckoutButton.click();
    }

    async cancelShopping() {
        await this.cancelShoppingButton.click();
    }
}