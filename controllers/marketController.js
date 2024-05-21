'use strict'

const { sequelize, Stock, StockHistory, Portfolio, MarketOrder } = require('../models/index.js')
const { currencyFormatter, amountFormatter } = require('../helpers/numberFormat.js')
const { Op } = require('sequelize');
const { dateFormatter } = require('../helpers/dateFormat.js')

module.exports = class MarketController {

    static async renderMarket(req, res) {
        try {
            const { search } = req.query
            const filterQuery = {}
            if (search) {
                filterQuery[Op.or] = [
                    { stockName: { [Op.iLike]: `%${search}%` } },
                    { stockCode: { [Op.iLike]: `%${search}%` } }
                ];
            }

            const stocks = await Stock.readStockDetails(filterQuery)
            res.render("./pages/Market", { stocks, amountFormatter })

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
                stocks, currencyFormatter, amountFormatter,
                dateFormatter
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