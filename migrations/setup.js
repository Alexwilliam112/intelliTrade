'use strict'

const pool = require('../config/connection')

async function setup() {
    try {
        const createUsers = `
        CREATE TABLE IF NOT EXISTS "Users" (
            "id" SERIAL PRIMARY KEY,
            "username" VARCHAR NOT NULL,
            "passHash" VARCHAR NOT NULL
        );`
        const dropUsers = `
        DROP TABLE IF EXISTS "Users";`

        const createStocks = `
        CREATE TABLE IF NOT EXISTS "Stocks" (
            "id" SERIAL PRIMARY KEY,
            "stockName" VARCHAR NOT NULL,
            "stockCode" VARCHAR(4) NOT NULL,
            "dividend" FLOAT NOT NULL,
            "createdAt" DATE NOT NULL
        )`
        const dropStocks = `
        DROP TABLE IF EXISTS "Stocks";`

        const createStockHistories = `
        CREATE TABLE IF NOT EXISTS "StockHistories" (
            "id" SERIAL PRIMARY KEY,
            "date" DATE NOT NULL,
            "high" INTEGER NOT NULL,
            "low" INTEGER NOT NULL,
            "open" INTEGER NOT NULL,
            "close" INTEGER NOT NULL,
            "volume" INTEGER NOT NULL,
            "StockId" INTEGER NOT NULL,
                FOREIGN KEY ("StockId")
                REFERENCES "Stocks" ("id")
        );`
        const dropStockHistories = `
        DROP TABLE IF EXISTS "StockHistories";`

        await pool.query(dropStockHistories)
        console.log(`SUCCESS: DROPPED TABLE "StockHistories"`);
        await pool.query(dropStocks)
        console.log(`SUCCESS: DROPPED TABLE "Stocks"`);
        await pool.query(dropUsers)
        console.log(`SUCCESS: DROPPED TABLE "Users"`);

        await pool.query(createUsers)
        console.log(`SUCCESS: CREATED TABLE "Users"`);
        await pool.query(createStocks)
        console.log(`SUCCESS: CREATED TABLE "Stocks"`);
        await pool.query(createStockHistories)
        console.log(`SUCCESS: CREATED TABLE "StockHistories"`);

    } catch (error) {
        console.log(error);
    }
}

setup()