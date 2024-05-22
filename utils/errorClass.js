'use strict'


class ValidationError extends Error {
    constructor(origin, errors = {}) {
        super()
        this.status = 403
        this.message = 'Invalid request.'
        this.name = 'validation'
        this.errors = errors
        this.origin = origin
    }
}

function instantiateValidationError(error, origin) {
    if (error.name === 'SequelizeValidationError') {
        const sequelizeError = new ValidationError(origin)
        error.errors.forEach(errObj => {
            sequelizeError.errors[errObj.path] = errObj.message
        });
        console.log(sequelizeError);
        return sequelizeError
    } else {
        return error
    }
}

class ErrorOrigin {

    static get signup() {
        return 'signup'
    }

    static get login() {
        return 'login'
    }

    static get companyUpdate() {
        return 'companyDataUpdate'
    }

    static get companyCreate() {
        return 'companyCreate'
    }

    static get companyDelete() {
        return 'companyDataDelete'
    }

    static get userDelete() {
        return 'userDelete'
    }

    static get userCreate() {
        return 'userCreate'
    }

    static get historicalBuy() {
        return 'historicalBuy'
    }

    static get historicalSell() {
        return 'historicalSell'
    }

    static get marketBuy() {
        return 'marketBuy'
    }

    static get marketSell() {
        return 'marketSell'
    }
}

module.exports = {
    ValidationError,
    instantiateValidationError,
    ErrorOrigin,
};