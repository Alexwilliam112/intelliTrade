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
            console.log(error);
            res.send(error)
        }
    }

    static async renderDashboard(req, res) {
        try {
            const stocks = await Model.readStocks()
            res.render("./pages/Dashboard", { stocks })

        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async renderBuyOrders(req, res) {
        try {
            res.render("./pages/BuyOrders")

        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
}

module.exports = Controller