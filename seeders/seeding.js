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

        await pool.query(insertStocks)
        console.log(`SUCCESS: SEEDED TABLE "Stocks"`);

    } catch (error) {
        console.log(error);
    }
}

seeding()