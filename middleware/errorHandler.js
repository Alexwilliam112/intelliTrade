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
                    const encodedError = encodeURIComponent(JSON.stringify(err.errors))
                    return res.redirect(`/signup?error=${encodedError}`)
                }

                case ErrorOrigin.login: {
                    const encodedError = encodeURIComponent(JSON.stringify(err.errors))
                    return res.redirect(`/login?error=${encodedError}`)
                }

                case ErrorOrigin.companyUpdate: {
                    const encodedError = encodeURIComponent(JSON.stringify(err.errors))
                    return res.redirect(`/signup?error=${encodedError}`)
                }

                case ErrorOrigin.companyDelete: {
                    //logic
                    return;
                }

                case ErrorOrigin.companyCreate: {
                    //logic
                    return;
                }

                case ErrorOrigin.userDelete: {
                    //logic
                    return;
                }

                case ErrorOrigin.userCreate: {
                    //logic
                    return;
                }

                case ErrorOrigin.historicalBuy: {
                    //logic
                    return;
                }

                case ErrorOrigin.historicalSell: {
                    //logic
                    return;
                }

                case ErrorOrigin.marketBuy: {
                    //logic
                    return;
                }

                case ErrorOrigin.marketSell: {
                    //logic
                    return;
                }
            }

        } else if (err.name === 'Request failed with status code 401') {
            return res.render('auth/ErrorPage', { err })

        } else {
            err.status = 500
            err.name = 'Internal Server Error'
            err.message = 'The server encountered an unexpected condition that prevented it from fulfilling the request. Please try again later or contact the administrator for assistance.'
            return res.render('auth/ErrorPage', { err })
        }
    }
}