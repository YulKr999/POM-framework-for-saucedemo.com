export const PAGE_TITLES = {
    PRODUCTS: 'Products',
    CART: 'Your Cart',
    CHECKOUT_INFO: 'Checkout: Your Information',
    CHECKOUT_OVERVIEW: 'Checkout: Overview',
    CHECKOUT_COMPLETE: 'Checkout: Complete!'
};

export const URLS = {
    LOGIN: '/',
    INVENTORY: '/inventory.html',
    INVENTORY_ITEM: '/inventory-item.html',
    CART: '/cart.html',
    CHECKOUT_INFO: '/checkout-step-one.html',
    CHECKOUT_OVERVIEW: '/checkout-step-two.html',
    CHECKOUT_COMPLETE: '/checkout-complete.html',
};

export const SYSTEM_MESSAGES = {
    ORDER_COMPLETED_HEADER: "Thank you for your order!",
    ORDER_COMPLETED_TEXT: "Your order has been dispatched, and will arrive just as fast as the pony can get there!",
    AUTH_ERRORS: {
        LOCKED_OUT: 'Epic sadface: Sorry, this user has been locked out.',
        PASSWORD_REQUIRED: 'Epic sadface: Password is required',
        USERNAME_REQUIRED: 'Epic sadface: Username is required',
        DO_NOT_MATCH: 'Epic sadface: Username and password do not match any user in this service',
    },
    CHECKOUT_ERRORS: {
        FIRST_NAME_REQUIRED: 'Error: First Name is required',
        LAST_NAME_REQUIRED: 'Error: Last Name is required',
        ZIP_CODE_REQUIRED: 'Error: Postal Code is required'
    }
};