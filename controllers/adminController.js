'use strict'

const { sequelize, Stock, CompanyProfile, StockHistory } = require('../models/index.js')
const { Op } = require('sequelize');
const { fetchHistoricals, fetchCompanyProfiles } = require('../utils/goapiFetch.js')

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
            const ticker = stockCode.toUpperCase()

            await sequelize.transaction(async (t) => {
                const today = new Date()
                const stockDetail = await fetchCompanyProfiles(ticker)

                const stock = await Stock.create(
                    {
                        stockName: stockDetail.stockName,
                        stockCode: ticker,
                        dividend,
                        createdAt: today,
                        updatedAt: today
                    },
                    { transaction: t, }
                )

                await CompanyProfile.create(
                    {
                        StockId: stock.id,
                        about: stockDetail.about,
                        logo: stockDetail.logo,
                        npwp: stockDetail.npwp,
                        address: stockDetail.address,
                        ipoFundRaised: stockDetail.ipoFundRaised,
                        ipoListingDate: stockDetail.ipoListingDate,
                        ipoOfferingShares: stockDetail.ipoOfferingShares,
                        ipoPercentage: stockDetail.ipoPercentage,
                        securitiesBureau: stockDetail.securitiesBureau,
                        createdAt: today,
                        updatedAt: today
                    },
                    { transaction: t, }
                )

                const historicalsArr = await fetchHistoricals(ticker, stock.id)
                const historicalsWithStockId = historicalsArr.map((el) => {
                    el.StockId = stock.id
                    return el
                })

                await StockHistory.bulkCreate(historicalsWithStockId,
                    { transaction: t, }
                )
            })
            res.redirect('/admin')

        } catch (error) {
            console.log(error);
            res.send(error.message)
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
