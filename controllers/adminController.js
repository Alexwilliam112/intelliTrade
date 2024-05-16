'use strict'

const Model = require('../models/model')

module.exports = class AdminController {

    static async renderAdmin(req, res) {
        try {
            const stocks = await Model.readStocks()
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