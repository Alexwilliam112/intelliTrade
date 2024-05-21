'use strict'


class ValidationError extends Error {
    constructor(origin) {
        super()
        this.name = 'validation'
        this.errors = {}
        this.origin = origin
    }
}

function instantiateValidationError(error, origin, next) {
    if (error.name === 'SequelizeValidationError') {
        const sequelizeError = new ValidationError(origin)
        error.errors.forEach(errObj => {
            sequelizeError.errors[errObj.path] = errObj.message
        });
        next(sequelizeError)
    } else {
        return
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
}

module.exports = {
    ValidationError,
    instantiateValidationError,
    ErrorOrigin,
};