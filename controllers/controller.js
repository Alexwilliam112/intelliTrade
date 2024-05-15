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

    static async renderMarket(req, res) {
        try {
            const stocks = await Model.readStocks()
            res.render("./pages/Market", { stocks })

        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async renderDashboard(req, res) {
        try {
            let status_filter = req.query.status
            if (!status_filter) {
                status_filter = 'Open'
            }

            let tabState = {
                open: '',
                processed: '',
                completed: ''
            }

            switch (status_filter) {
                case 'Open': {
                    tabState.open = 'Selected'
                    break;
                }

                case 'Processed': {
                    tabState.processed = 'Selected'
                    break;
                }

                case 'Completed': {
                    tabState.completed = 'Selected'
                    break;
                }
            }

            const orders = await Model.readOrders()
            const stocks = await Model.readStocks()
            const portfolios = await Model.readPortfolio(1) //TODO
            res.render("./pages/Dashboard", { orders, stocks, portfolios, status_filter, tabState })

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
            const stocks = await Model.readStocks()

            res.render("./pages/Historicals", {
                historicalDatas: JSON.stringify(historicalDatas),
                stockDetail: stockDetail,
                stocks
            })

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

    static async updateOrder(req, res) {
        try {
            const { id } = req.params
            const tabState = await Model.updateOrder(id)
            res.redirect(`/dashboard?status=${tabState}`)

        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Controller