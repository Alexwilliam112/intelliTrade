'use strict'

const { sequelize, Stock, StockHistory, Portfolio } = require('../models/index.js')
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

            res.render("./pages/Historicals", {
                historicalDatas: JSON.stringify(historicalDatas),
                stockDetail, portfolios,
                stocks, currencyFormatter
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
}