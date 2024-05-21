'use strict'


class InternalError extends Error {
    constructor(errorName, origin) {
        super()
        this.name = errorName
        this.errors = {}
        this.origin = origin
    }
}

function instantiateValidationError(error, origin, next) {
    if (error.name === 'SequelizeValidationError') {
        const sequelizeError = new InternalError('validation', origin)
        error.errors.forEach(errObj => {
            sequelizeError.errors[errObj.path] = errObj.message
        });
        next(sequelizeError)
    } else {
        return
    }
}

module.exports = {
    InternalError,
    instantiateValidationError
};