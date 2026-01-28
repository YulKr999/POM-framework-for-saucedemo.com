export const users = {
    standard: {
        username: process.env.STANDARD_USER_NAME,
        password: process.env.STANDARD_USER_PASS,
    },
    lockedOut: {
        username: process.env.LOCKED_USER_NAME,
        password: process.env.LOCKED_USER_PASS,
    },
    invalid: {
        username: 'wrong_user',
        password: 'wrong_password',
    }
};

export const sorting = {
    nameAZ: 'az',
    nameZA: 'za'
};

export const checkoutUser = {
    customer: {
        firstName: 'John',
        lastName: 'Doe',
        zipCode: '12345'
    }
};