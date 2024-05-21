'use strict'

module.exports = {
    ErrorHandler: (err, req, res, next) => {
        console.log(res.statusCode);
        console.log(err);
        res.send(err)
    }
}