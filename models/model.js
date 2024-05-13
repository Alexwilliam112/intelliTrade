'use strict'

const Factory = require('./class')
const pool = require('../config/connection')
const axios = require('axios')
// const apiKey_dev = '76822e86-c694-5fd9-d618-46feac4a'
const apiKey_production = ''

class Model {

    static async getNews() {
        try {
            const req = `https://api.goapi.io/stock/idx/news`
            const value = await axios.get(req, {
                headers: {
                    'accept': 'application/json',
                    'X-API-KEY': apiKey_dev,
                },
                params: {
                    page: 1,
                    symbol: 'BBCA',
                },
            })

            const returnedArr = value.data.data.results
            const newsData = returnedArr.map((el) => {
                return Factory.createNews(el.image, el.published_at, el.title,
                    el.description, el.publisher.logo, el.publisher.name,
                    el.url
                )
            })

            return newsData

        } catch (error) {
            console.log(error);
            return [{
                imageUrl: '',
                date: '',
                title: 'NOT FOUND',
                description: `ERROR MESSAGE: ${error.message}`,
                publisherLogo: '',
                publisherName: '',
                newsUrl: ''
            }]
        }
    }

    static async readStocks() {
        try {
            const sql = `
        SELECT 
            "Stocks"."id",
            "Stocks"."stockName",
            "Stocks"."stockCode",
            "Stocks"."dividend",
            "Stocks"."createdAt",
            "Stocks"."about",
            "Stocks"."logo",
            "Stocks"."npwp",
            "Stocks"."address",
            "Stocks"."ipoFundRaised",
            "Stocks"."ipoListingDate",
            "Stocks"."ipoOfferingShares",
            "Stocks"."ipoPercentage",
            "Stocks"."securitiesBureau",
            "recentVolume"."volume"
        FROM
            "Stocks"
        JOIN (
                SELECT 
                    "StockId",
                    "date",
                    "volume"
                FROM 
                    "StockHistories"
                WHERE 
                    "date" = (
                        SELECT 
                            MAX("StockHistories"."date")
                        FROM
                            "StockHistories"
                    )
                GROUP BY
                    "StockId",
                    "date",
                    "volume"
            ) AS "recentVolume"
            ON 
                "Stocks".id = "recentVolume"."StockId";`

            const data = (await pool.query(sql)).rows
            const stocks = data.map((el) => {
                return Factory.createStocks(el.id, el.stockName, el.stockCode, el.dividend, el.volume, el.createdAt,
                    el.about, el.logo, el.npwp, el.address, el.ipoFundRaised, el.ipoListingDate, el.ipoOfferingShares,
                    el.ipoPercentage, el.securitiesBureau
                )
            })

            return stocks

        } catch (error) {
            console.log(error);
        }
    }

    static async readHistorical(id) {
        try {
            const sql = `
            SELECT 
                *
            FROM 
                "StockHistories"
            WHERE 
                "StockId" = ${id}
            ORDER BY
                "date" ASC`

            const data = (await pool.query(sql)).rows
            const historicals = data.map((el) => {
                return Factory.createStockHistories(el.id, el.date, el.high, el.low, el.open,
                    el.close, el.volume, el.StockId)
            })

            return historicals

        } catch (error) {
            console.log(error);
        }
    }

    static async findStock(id) {
        try {
            const stocks = await Model.readStocks()
            const stockFound = stocks.find((el) => {

                return el.id === Number(id)
            })

            return stockFound

        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Model