'use strict'

const Model = require('../models/model')

class Controller {

    static async renderLandingPage(req, res) {
        try {
            res.render("./pages/LandingPage")

        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
}

module.exports = Controller