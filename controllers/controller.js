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

    static async renderHome(req, res) {
        try {
            let newsData = await Model.getNews()
            res.render("./pages/Home", { newsData })

        } catch (error) {
            const newsData = [{
                imageUrl : '',
                date : '',
                title : 'NOT FOUND',
                description : `ERROR MESSAGE: ${error.message}`,
                publisherLogo : '',
                publisherName : '',
                newsUrl : ''
            }]
            res.render("./pages/Home", { newsData })
            console.log(error);
        }
    }

    static async renderDashboard(req, res) {
        try {
            res.render("./pages/Dashboard")

        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
}

module.exports = Controller