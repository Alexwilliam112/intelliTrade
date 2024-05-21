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

module.exports = {
    ValidationError,
    instantiateValidationError,

    //standardized origins
    origin_signup: 'signup',
    origin_login: 'login',
};