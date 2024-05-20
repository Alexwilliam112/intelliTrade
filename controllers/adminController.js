'use strict'

const { sequelize, Stock } = require('../models/index.js')
const { Op } = require('sequelize');
const axios = require('axios')

module.exports = class AdminController {

    static async renderAdmin(req, res) {
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
            res.render("./pages/Admin", { stocks })

        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async handleAdd(req, res) {
        try {
            const { stockCode, dividend } = req.body



            await sequelize.transaction(async (t) => {
                const stock = await Stock.create()
            })

        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async renderUpdate(req, res) {
        try {
            const { id } = req.params

            res.render("pages/adminupdate.ejs")

        } catch (error) {
            console.log(error);
        }
    }
}
