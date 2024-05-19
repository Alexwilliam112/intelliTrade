'use strict'

const { sequelize, Stock, StockHistory } = require('../models/index.js')
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
            const stocks = await Stock.readStockDetails()

            res.render("./pages/Historicals", {
                historicalDatas: JSON.stringify(historicalDatas),
                stockDetail: stockDetail,
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