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
                imageUrl : '',
                date : '',
                title : 'NOT FOUND',
                description : `ERROR MESSAGE: ${error.message}`,
                publisherLogo : '',
                publisherName : '',
                newsUrl : ''
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
                return Factory.createStocks(el.id, el.stockName, el.stockCode, el.dividend, el.volume, el.createdAt)
            })

            return stocks

        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Model