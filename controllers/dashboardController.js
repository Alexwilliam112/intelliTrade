'use strict'

const { sequelize, Stock, Portfolio, MarketOrder } = require('../models/index.js')
const { dateFormatter } = require('../helpers/dateFormat.js')
const { currencyFormatter } = require('../helpers/currencyFormat.js')
const { estimateDividend, estimateValue } = require('../helpers/valueCalculators.js')

module.exports = class DashboardController {

    static async buyPost(req, res) {
        try {
            res.send('BUY POST')

        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async sellPost(req, res) {
        try {


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

            const user = req.session.user
            let orderFilter = user.id

            if (user.role === 'admin' || user.role === 'broker') orderFilter = undefined

            const orders = await MarketOrder.readOrders(orderFilter)
            const stocks = await Stock.readStockDetails()
            const portfolios = await Portfolio.readPortfolio({ UserId: user.id })
            const transactionRoute = {
                buyPost: '/dashboard/buyorder',
                sellPost: '/dashboard/sellorder'
            }

            res.render("./pages/Dashboard", {
                orders, stocks, portfolios, status_filter,
                tabState, user, dateFormatter, currencyFormatter,
                estimateDividend, estimateValue, transactionRoute
            })

        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async updateOrder(req, res) {
        try {
            const { id } = req.params

            const tabState = await MarketOrder.updateOrder(Number(id))
            res.redirect(`/dashboard?status=${tabState}`)

        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
}
