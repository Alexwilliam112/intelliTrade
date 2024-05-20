'use strict'

const { sequelize, Stock, StockHistory, Portfolio, MarketOrder } = require('../models/index.js')
const { currencyFormatter } = require('../helpers/currencyFormat.js')

module.exports = class MarketController {

    static async renderMarket(req, res) {
        try {
            const stocks = await Stock.readStockDetails()
            const stockVolumes = await StockHistory.getVolumeGrowth()
            res.render("./pages/Market", { stocks, stockVolumes })

        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async stockDetails(req, res) {
        try {
            const { id } = req.params
            const historicalDatas = await StockHistory.readHistorical(id)
            const stockDetail = await Stock.findStock(id)
            const stocks = [stockDetail]
            const user = req.session.user
            const portfolios = await Portfolio.readPortfolio({
                UserId: user.id,
                StockId: id
            })
            const transactionRoute = {
                buyPost: `/market/${id}/buyorder`,
                sellPost: `/market/${id}/sellorder`
            }

            res.render("./pages/Historicals", {
                historicalDatas: JSON.stringify(historicalDatas),
                stockDetail, portfolios, transactionRoute,
                stocks, currencyFormatter
            })

        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async buyPost(req, res) {
        try {
            const { id } = req.params
            const { StockId, quantity, price, expiration } = req.body
            const user = req.session.user

            await MarketOrder.createOrder(user.id, StockId, quantity, price, expiration, 'Buy_Order')
            res.redirect(`/market/${id}`)

        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async sellPost(req, res) {
        try {
            const { id } = req.params
            const { StockId, quantity, price, expiration } = req.body
            const user = req.session.user

            await MarketOrder.createOrder(user.id, StockId, quantity, price, expiration, 'Sell_Order')
            res.redirect(`/market/${id}`)

        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
}