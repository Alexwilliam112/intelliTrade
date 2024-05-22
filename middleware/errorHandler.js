'use strict'
const { ErrorOrigin } = require('../utils/errorClass')
module.exports = {
    ErrorHandler: (err, req, res, next) => {
        if (err.status === 404) {
            res.render('auth/ErrorPage', { err })

        } else if (err.status === 403) {
            switch (err.origin) {
                case ErrorOrigin.signup: {
                    //LOGIC
                    break;
                }

                case ErrorOrigin.login: {
                    //logic
                    break;
                }

                case ErrorOrigin.companyUpdate: {
                    //logic
                    break;
                }

                case ErrorOrigin.companyDelete: {
                    //logic
                    break;
                }

                case ErrorOrigin.companyCreate: {
                    //logic
                    break;
                }

                case ErrorOrigin.userDelete: {
                    //logic
                    break;
                }

                case ErrorOrigin.userCreate: {
                    //logic
                    break;
                }

                case ErrorOrigin.historicalBuy: {
                    //logic
                    break;
                }

                case ErrorOrigin.historicalSell: {
                    //logic
                    break;
                }

                case ErrorOrigin.marketBuy: {
                    //logic
                    break;
                }

                case ErrorOrigin.marketSell: {
                    //logic
                    break;
                }

                default:
                    break;
            }

        } else if(err.name = 'Request failed with status code 401') {
            res.render('auth/ErrorPage', { err })

        } else {
            err.status = 500
            err.name = 'Internal Server Error'
            err.message = 'The server encountered an unexpected condition that prevented it from fulfilling the request. Please try again later or contact the administrator for assistance.'
            res.render('auth/ErrorPage', { err })
        }
    }
}