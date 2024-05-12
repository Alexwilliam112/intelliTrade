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
            "createdAt" DATE NOT NULL,
            "about" TEXT NOT NULL,
            "logo" VARCHAR NOT NULL,
            "npwp" VARCHAR NOT NULL,
            "address" VARCHAR NOT NULL,
            "ipoFundRaised" NUMERIC NOT NULL,
            "ipoListingDate" DATE NOT NULL,
            "ipoOfferingShares" INTEGER NOT NULL,
            "ipoPercentage" FLOAT NOT NULL,
            "securitiesBureau" VARCHAR NOT NULL
        );`
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

        const createPortfolios = `
        CREATE TABLE IF NOT EXISTS "Portfolios" (
            "id" SERIAL PRIMARY KEY,
            "totalValue" INTEGER NOT NULL,
            "estimateDividend" INTEGER NOT NULL,
            "UserId" INTEGER NOT NULL,
                FOREIGN KEY ("UserId")
                REFERENCES "Users" ("id")
        );`
        const dropPortfolios = `
        DROP TABLE IF EXISTS "Portfolios";`

        const createBuyOrders = `
        CREATE TABLE IF NOT EXISTS "BuyOrders" (
            "id" SERIAL PRIMARY KEY,
            "buyVolume" INTEGER NOT NULL,
            "buyPrice" INTEGER NOT NULL,
            "UserId" INTEGER NOT NULL,
            "StockId" INTEGER NOT NULL,
                FOREIGN KEY ("UserId")
                REFERENCES "Users" ("id"),
                FOREIGN KEY ("StockId")
                REFERENCES "Stocks" ("id")
        );`
        const dropBuyOrders = `
        DROP TABLE IF EXISTS "BuyOrders";`

        await pool.query(dropBuyOrders)
        console.log(`SUCCESS: DROPPED TABLE "BuyOrders"`);
        await pool.query(dropStockHistories)
        console.log(`SUCCESS: DROPPED TABLE "StockHistories"`);
        await pool.query(dropStocks)
        console.log(`SUCCESS: DROPPED TABLE "Stocks"`);
        await pool.query(dropPortfolios)
        console.log(`SUCCESS: DROPPED TABLE "Portfolios"`);
        await pool.query(dropUsers)
        console.log(`SUCCESS: DROPPED TABLE "Users"`);

        await pool.query(createUsers)
        console.log(`SUCCESS: CREATED TABLE "Users"`);
        await pool.query(createPortfolios)
        console.log(`SUCCESS: CREATED TABLE "Portfolios"`);
        await pool.query(createStocks)
        console.log(`SUCCESS: CREATED TABLE "Stocks"`);
        await pool.query(createStockHistories)
        console.log(`SUCCESS: CREATED TABLE "StockHistories"`);
        await pool.query(createBuyOrders)
        console.log(`SUCCESS: CREATED TABLE "BuyOrders"`);

    } catch (error) {
        console.log(error);
    }
}

setup()