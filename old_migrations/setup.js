'use strict'

const pool = require('../config/connection')

async function setup() {
    try {
        const createEnum_Role = `
        CREATE TYPE "Role" AS ENUM ('admin', 'user')`
        const dropEnum_Role = `
        DROP TYPE IF EXISTS "Role"`

        const createEnum_OrderType = `
        CREATE TYPE "OrderType" AS ENUM ('Buy_Order', 'Sell_Order')`
        const dropEnum_OrderType = `
        DROP TYPE IF EXISTS "OrderType"`

        const createEnum_OrderStatus = `
        CREATE TYPE "OrderStatus" AS ENUM ('Open', 'Processed', 'Completed')`
        const dropEnum_OrderStatus = `
        DROP TYPE IF EXISTS "OrderStatus"`

        const createUsers = `
        CREATE TABLE IF NOT EXISTS "Users" (
            "id" SERIAL PRIMARY KEY,
            "username" VARCHAR NOT NULL,
            "passHash" VARCHAR NOT NULL,
            "role" "Role" NOT NULL
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
        );`
        const dropStocks = `
        DROP TABLE IF EXISTS "Stocks";`

        const createCompanyProfiles = `
        CREATE TABLE IF NOT EXISTS "CompanyProfiles" (
            "about" TEXT NOT NULL,
            "logo" TEXT NOT NULL,
            "npwp" VARCHAR NOT NULL,
            "address" VARCHAR NOT NULL,
            "ipoFundRaised" NUMERIC NOT NULL,
            "ipoListingDate" DATE NOT NULL,
            "ipoOfferingShares" INTEGER NOT NULL,
            "ipoPercentage" FLOAT NOT NULL,
            "securitiesBureau" VARCHAR NOT NULL,
            "StockId" INTEGER NOT NULL,
                FOREIGN KEY ("StockId")
                REFERENCES "Stocks" ("id")
        );`
        const dropCompanyProfiles = `
        DROP TABLE IF EXISTS "CompanyProfiles";`

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
            "quantity" INTEGER NOT NULL,
            "UserId" INTEGER NOT NULL,
            "StockId" INTEGER NOT NULL,
                FOREIGN KEY ("UserId")
                REFERENCES "Users" ("id"),
                FOREIGN KEY ("StockId")
                REFERENCES "Stocks" ("id")
        );`
        const dropPortfolios = `
        DROP TABLE IF EXISTS "Portfolios";`

        const createMarketOrders = `
        CREATE TABLE IF NOT EXISTS "MarketOrders" (
            "id" SERIAL PRIMARY KEY,
            "type" "OrderType" NOT NULL,
            "quantity" INTEGER NOT NULL,
            "price" INTEGER NOT NULL,
            "expiration" DATE NOT NULL,
            "status" "OrderStatus" NOT NULL,
            "UserId" INTEGER NOT NULL,
            "StockId" INTEGER NOT NULL,
                FOREIGN KEY ("UserId")
                REFERENCES "Users" ("id"),
                FOREIGN KEY ("StockId")
                REFERENCES "Stocks" ("id")
        );`
        const dropMarketOrders = `
        DROP TABLE IF EXISTS "MarketOrders";`

        await pool.query(dropCompanyProfiles)
        console.log(`SUCCESS: DROPPED TABLE "CompanyProfiles"`);
        await pool.query(dropMarketOrders)
        console.log(`SUCCESS: DROPPED TABLE "MarketOrders"`);
        await pool.query(dropStockHistories)
        console.log(`SUCCESS: DROPPED TABLE "StockHistories"`);
        await pool.query(dropPortfolios)
        console.log(`SUCCESS: DROPPED TABLE "Portfolios"`);
        await pool.query(dropUsers)
        console.log(`SUCCESS: DROPPED TABLE "Users"`);
        await pool.query(dropStocks)
        console.log(`SUCCESS: DROPPED TABLE "Stocks"`);
        await pool.query(dropEnum_OrderStatus)
        console.log(`SUCCESS: DROPPED TYPE OrderStatus`);
        await pool.query(dropEnum_OrderType)
        console.log(`SUCCESS: DROPPED TYPE OrderType`)
        await pool.query(dropEnum_Role)
        console.log(`SUCCESS: DROPPED TYPE Role`)

        await pool.query(createEnum_Role)
        console.log(`SUCCESS: CREATED TYPE "Role"`);
        await pool.query(createEnum_OrderType)
        console.log(`SUCCESS: CREATED TYPE "OrderType"`);
        await pool.query(createEnum_OrderStatus)
        console.log(`SUCCESS: CREATED TYPE "OrderStatus"`);
        await pool.query(createUsers)
        console.log(`SUCCESS: CREATED TABLE "Users"`);
        await pool.query(createStocks)
        console.log(`SUCCESS: CREATED TABLE "Stocks"`);
        await pool.query(createPortfolios)
        console.log(`SUCCESS: CREATED TABLE "Portfolios"`);
        await pool.query(createStockHistories)
        console.log(`SUCCESS: CREATED TABLE "StockHistories"`);
        await pool.query(createMarketOrders)
        console.log(`SUCCESS: CREATED TABLE "MarketOrders"`);
        await pool.query(createCompanyProfiles)
        console.log(`SUCCESS: CREATED TABLE "CompanyProfiles"`);

    } catch (error) {
        console.log(error);
    }
}

setup()