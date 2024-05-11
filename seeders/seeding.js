'use strict'

const pool = require('../config/connection')
const { readFile } = require('fs').promises

async function seeding() {
    try {
        const stocks = JSON.parse(await readFile('./data/stocks.json', 'utf-8'))
            .map((el) => {
                const { stockName, stockCode, dividend, createdAt } = el
                return `('${stockName}', '${stockCode}', '${dividend}', '${createdAt}')`
            }).join(',\n')

        const insertStocks = `
            INSERT INTO "Stocks" ("stockName", "stockCode", "dividend", "createdAt")
            VALUES
            ${stocks};`

        const stockHistories = JSON.parse(await readFile('./data/stockHistories.json', 'utf-8'))
            .map((el) => {
                const { date, high, low, open, close, volume, StockId } = el
                return `('${date}', '${high}', '${low}', '${open}', '${close}',
                '${volume}', '${StockId}')`
            }).join(',\n')

        const insertStockHistories = `
        INSERT INTO "StockHistories" ("date", "high", "low", "open", "close", "volume", "StockId")
        VALUES
        ${stockHistories};`

        const statsQuery = `
        SELECT 
            "StockId",
            "stockName",
            "stockCode",
            COUNT("StockHistories"."id") AS "count"
        FROM 
            "StockHistories"
        JOIN
            "Stocks"
        ON
            "Stocks".id = "StockHistories"."StockId"
        GROUP BY
            "StockId",
            "stockName",
            "stockCode";`

        await pool.query(insertStocks)
        console.log(`SUCCESS: SEEDED TABLE "Stocks"`);

        await pool.query(insertStockHistories)
        console.log(`SUCCESS: SEEDED TABLE "StockHistories"`);

        let totalData = 0
        const seedingData = (await pool.query(statsQuery)).rows.map((el) => {
            totalData += Number(el.count)
            return {
                "Stock Id": el.StockId,
                "Emiten": el.stockCode,
                "Company Name": el.stockName,
                "Data Count" : Number(el.count)
            }
        })

        console.table(seedingData)
        console.log(`Stock Histories Total Data Seeded: ${totalData}`);

    } catch (error) {
        console.log(error);
    }
}

seeding()