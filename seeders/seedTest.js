'use strict'

const pool = require('../config/connection')

async function buyOrder() {
    try {
        const insertUser = `
        INSERT INTO "Users" (
            "username",
            "passHash",
            "role"
        )
        VALUES
        ('alex112', '12345678', 'admin')`

        const insertOrders = `
        INSERT INTO "MarketOrders" (
            "type",
            "quantity",
            "price",
            "expiration",
            "UserId",
            "StockId",
            "status"
        )
        VALUES
        ('Buy_Order', '110', '5200', '2024-07-01', '1', '2', 'Open'),
        ('Buy_Order', '170', '4310', '2024-07-01', '1', '2', 'Open'),
        ('Sell_Order', '81', '7890', '2024-07-01', '1', '2', 'Open'),
        ('Sell_Order', '74', '2210', '2024-07-01', '1', '2', 'Open')`

        const insertPortfolio = `
        INSERT INTO "Portfolios" (
            "quantity",
            "UserId",
            "StockId"
        )
        VALUES
        ('23000', '1', '2'),
        ('33100', '1', '3'),
        ('72000', '1', '4'),
        ('20100', '1', '5'),
        ('39000', '1', '8'),
        ('92500', '1', '11')
        `

        await pool.query(insertUser)
        console.log(`INSERTED ADMIN AS USER`);
        await pool.query(insertOrders)
        console.log(`INSERTED TRIAL DATA TO MARKET LISTING`);
        await pool.query(insertPortfolio)
        console.log(`INSERTED TRIAL DATA TO PORTFOLIO`);

    } catch (error) {
        console.log(error);
    }
}

buyOrder()