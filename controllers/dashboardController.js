'use strict'

const Model = require('../models/model')

module.exports = class DashboardController {

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
            const user = req.session.user
            const portfolios = await Model.readPortfolio(user.id)
            res.render("./pages/Dashboard", { orders, stocks, portfolios, status_filter, tabState, user })

        } catch (error) {
            console.log(error);
            res.send(error)

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
