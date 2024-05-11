'use strict'

const Model = require('../models/model')

class Controller {

    static async renderLandingPage(req, res) {
        try {
            res.render("./auth/LandingPage")

        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async loginForm(req, res) {
        try {
            res.render("./auth/LogIn")

        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async signupForm(req, res) {
        try {
            res.render("./auth/SignUp")

        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
}

module.exports = Controller