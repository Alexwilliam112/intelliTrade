'use strict'

const { sequelize, Stock, CompanyProfile, StockHistory, User } = require('../models/index.js')
const { Op } = require('sequelize');
const { fetchHistoricals, fetchCompanyProfiles } = require('../utils/goapiFetch.js')
const bcrypt = require('bcrypt');
const { instantiateValidationError,
    ErrorOrigin } = require('../utils/errorClass.js')

module.exports = class AdminController {

    static async renderUserManage(req, res, next) {
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

            let filterQuery = {}
            const { search } = req.query
            if(search) filterQuery.username = {
                [Op.iLike]: `%${search}%`
            }

            const users = await User.findAll({
                where: filterQuery
            })
            res.render('admins/userManage', {
                users,
                deleteConfig,
                openDelete: JSON.stringify(deleteConfig.overlay)
            })

        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async renderAdmin(req, res, next) {
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
            res.render("./admins/CompanyData", {
                deleteConfig, stocks,
                stockDatas: JSON.stringify(stocks),
                openDelete: JSON.stringify(deleteConfig.overlay)
            })

        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async handleUpdate(req, res, next) {
        try {
            const { StockId, dividend } = req.body
            await Stock.updateStock(StockId, dividend)
            res.redirect('/admin/companyData')

        } catch (error) {
            console.log(error);
            instantiateValidationError(error, ErrorOrigin.companyUpdate, next)
            next(error)
        }
    }

    static async handleDeleteUser(req, res, next) {
        try {
            const { id } = req.params
            const { password, viewDelete } = req.body
            const username = req.session.user.username

            const user = await User.findOne({ where: { username } })
            const isValid = await bcrypt.compare(password, user.password)
            if (!isValid) return res.redirect(`/admin/userManage/?deleteId=${id}&deleteName=${viewDelete}`)
            delete user.password

            await User.destroy({
                where: {
                    id: id
                }
            })
            res.redirect('/admin/userManage')

        } catch (error) {
            console.log(error);
            instantiateValidationError(error, ErrorOrigin.userDelete, next)
            next(error)
        }
    }

    static async handleDelete(req, res, next) {
        try {
            const { deleteId } = req.params
            const { password, viewDelete } = req.body
            const username = req.session.user.username

            const user = await User.findOne({ where: { username } })
            const isValid = await bcrypt.compare(password, user.password)
            if (!isValid) return res.redirect(`/admin/companyData/?deleteId=${deleteId}&deleteName=${viewDelete}`)
            delete user.password

            await sequelize.transaction(async (t) => {
                await CompanyProfile.destroy({ where: { StockId: deleteId } },
                    { transaction: t, })
                await StockHistory.destroy({ where: { StockId: deleteId } },
                    { transaction: t, })
                await Stock.destroy({ where: { id: deleteId } },
                    { transaction: t, })
            })
            res.redirect('/admin/companyData')

        } catch (error) {
            console.log(error);
            instantiateValidationError(error, ErrorOrigin.companyDelete, next)
            next(error)
        }
    }

    static async handleAddUser(req, res, next) {
        try {
            const { username, email, password } = req.body
            await User.create({ username, password, email })
            res.redirect('/admin/userManage')

        } catch (error) {
            console.log(error);
            instantiateValidationError(error, ErrorOrigin.userCreate, next)
            next(error)
        }
    }

    static async handleAdd(req, res, next) {
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
            res.redirect('/admin/companyData')

        } catch (error) {
            console.log(error);
            instantiateValidationError(error, ErrorOrigin.companyCreate, next)
            next(error)
        }
    }
}
