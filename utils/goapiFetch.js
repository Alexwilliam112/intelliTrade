'use strict'

const axios = require('axios')
module.exports = {

    fetchHistoricals: async (ticker, stockId) => {
        async function requestData(ticker, from, to) {
            const reqUrl = `https://api.goapi.io/stock/idx/${ticker}/historical`;
            const resData = await axios.get(reqUrl, {
                headers: {
                    'accept': 'application/json',
                    'X-API-KEY': '217338f5-d7b2-556c-ba72-ed8381af'
                },
                params: {
                    from,
                    to,
                },
            });
            return resData.data.data.results
        }
        const allDatas = []
        allDatas.push(await requestData(ticker, '2018-01-01', '2018-12-31'))
        allDatas.push(await requestData(ticker, '2019-01-01', '2019-12-31'))
        allDatas.push(await requestData(ticker, '2020-01-01', '2020-12-31'))
        allDatas.push(await requestData(ticker, '2021-01-01', '2021-12-31'))
        allDatas.push(await requestData(ticker, '2022-01-01', '2022-12-31'))
        allDatas.push(await requestData(ticker, '2023-01-01', '2023-12-31'))
        allDatas.push(await requestData(ticker, '2024-01-01', '2024-12-31'))
        const normalizedData = []
        allDatas.forEach(arr => {
            arr.forEach(data => {
                normalizedData.push({
                    date: data.date,
                    high: data.high,
                    low: data.low,
                    open: data.open,
                    close: data.close,
                    volume: data.volume,
                    StockId: stockId
                })
            });
        });
        return normalizedData
    },

    fetchCompanyProfiles: async (ticker) => {
        const reqUrl = `https://api.goapi.io/stock/idx/${ticker}/profile`;
        const resData = await axios.get(reqUrl, {
            headers: {
                'accept': 'application/json',
                'X-API-KEY': 'c153dceb-74ea-5f0c-1331-b007c520',
            },
            params: {},
        });
        const profile = resData.data.data

        return {
            stockName: profile.name,
            about: profile.about,
            logo: profile.logo,
            npwp: profile.npwp,
            address: profile.address,
            ipoFundRaised: profile.ipo_fund_raised,
            ipoListingDate: profile.ipo_listing_date,
            ipoOfferingShares: profile.ipo_offering_shares,
            ipoPercentage: profile.ipo_percentage,
            securitiesBureau: profile.ipo_securities_administration_bureau
        }
    }
}
