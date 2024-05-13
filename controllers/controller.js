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

    static async stockDetails(req, res) {
        try {
            const { id } = req.params
            const historicalDatas = await Model.readHistorical(id)
            const stockDetail = await Model.findStock(id)

            res.render("./pages/Historicals", { historicalDatas: JSON.stringify(historicalDatas), stockDetail: stockDetail })

        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async buyPost(req, res) {
        try {
            

        } catch (error) {
            
        }
    }

    static async sellPost(req, res) {
        try {
            

        } catch (error) {
            
        }
    }
}

module.exports = Controller