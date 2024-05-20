'use strict'

const { sequelize, Stock, CompanyProfile, StockHistory, User } = require('../models/index.js')
const { Op } = require('sequelize');
const { fetchHistoricals, fetchCompanyProfiles } = require('../utils/goapiFetch.js')

module.exports = class AdminController {

    static async renderAdmin(req, res) {
        try {
            const deleteConfig = {
                deleteId: req.query.deleteId,
                deleteName: req.query.deleteName,
                overlay: true
            }
            if (!req.query.deleteId || !req.query.deleteName) {
                deleteConfig.deleteId = 'none'
                deleteConfig.deleteName = 'none'
                deleteConfig.overlay = false
            }

            const { search } = req.query
            const filterQuery = {}
            if (search) {
                filterQuery[Op.or] = [
                    { stockName: { [Op.iLike]: `%${search}%` } },
                    { stockCode: { [Op.iLike]: `%${search}%` } }
                ];
            }

            const stocks = await Stock.readStockDetails(filterQuery)
            res.render("./pages/Admin", {
                deleteConfig, stocks,
                stockDatas: JSON.stringify(stocks),
                openDelete: JSON.stringify(deleteConfig.overlay)
            })

        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async handleUpdate(req, res) {
        try {
            const { StockId, dividend } = req.body
            await Stock.updateStock(StockId, dividend)
            res.redirect('/admin')

        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }

    static async handleDelete(req, res) {
        try {
            const { deleteId } = req.params
            const { password, viewDelete } = req.body
            const username = req.session.user.username

            const user = await User.findOne({ where: { username } })
            const isValid = await bcrypt.compare(password, user.password)
            if (!isValid) return res.redirect(`/admin/?deleteId=${deleteId}&deleteName=${viewDelete}`)
            delete user.password

            await sequelize.transaction(async (t) => {
                //TODO: DELETE STOCK AND COMPANY PROFILE AND HISTORICALS
            })

            res.redirect('/admin')

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
}
