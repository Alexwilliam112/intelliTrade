'use strict'
const { ErrorOrigin } = require('../utils/errorClass')
const { readFile, writeFile } = require('fs').promises
module.exports = {
    ErrorHandler: async (err, req, res, next) => {
        const prevLog = JSON.parse(await readFile('./logs/errorLogs.json'))
        const newError = {
            statusCode: err.statusCode,
            name: err.name,
            message: err.message,
            origin: err.path,
            stack: err.stack.split('\n')
        }
        prevLog.push(newError)
        const currentLog = JSON.stringify(prevLog, null, 2)
        await writeFile('./logs/errorLogs.json', currentLog)

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

        } else if (err.name = 'Request failed with status code 401') {
            res.render('auth/ErrorPage', { err })

        } else {
            err.status = 500
            err.name = 'Internal Server Error'
            err.message = 'The server encountered an unexpected condition that prevented it from fulfilling the request. Please try again later or contact the administrator for assistance.'
            res.render('auth/ErrorPage', { err })
        }
    }
}