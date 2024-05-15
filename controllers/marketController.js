'use strict'

const Model = require('../models/model')

module.exports = class MarketController {

    static async renderMarket(req, res) {
        try {
            const stocks = await Model.readStocks()
            res.render("./pages/Market", { stocks })

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
}