'use strict'

const { sequelize, Stock } = require('../models/index.js')

module.exports = class AdminController {

    static async renderAdmin(req, res) {
        try {
            const stocks = await Stock.readStockDetails()
            res.render("./pages/Admin", { stocks })

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
