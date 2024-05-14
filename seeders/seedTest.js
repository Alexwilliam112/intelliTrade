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

        const insertBuy = `
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
        ('Buy_Order', '110', '5200', '2024-07-01', '1', '2', 'open'),
        ('Buy_Order', '170', '4310', '2024-07-01', '1', '2', 'open'),
        ('Sell_Order', '81', '7890', '2024-07-01', '1', '2', 'open'),
        ('Sell_Order', '74', '2210', '2024-07-01', '1', '2', 'open')`

        const insertPortfolio = `
        INSERT INTO "Portfolios" (
            
        )`

        await pool.query(insertUser)
        console.log(`INSERTED ADMIN AS USER`);
        await pool.query(insertBuy)
        console.log(`INSERTED TRIAL DATA TO MARKET LISTING`);

    } catch (error) {
        console.log(error);
    }
}

buyOrder()