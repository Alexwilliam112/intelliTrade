'use strict'

module.exports = {
    ErrorHandler: (err, req, res, next) => {
        console.log(res.statusCode);
        console.log(err);
        // res.send(err)
        console.log(`=============`);
        const statusCode = res.statusCode
        const message = err.origin
        res.render('auth/ErrorPage', { statusCode, message })
    }
}