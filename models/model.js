'use strict'

const Factory = require('./class')
const pool = require('../config/connection')
const axios = require('axios')
// const apiKey_dev = '76822e86-c694-5fd9-d618-46feac4a'
const apiKey_production = ''

class Model {

    static async getNews() {
        const req = `https://api.goapi.io/stock/idx/news`
        const value = await axios.get(req, {
            headers: {
                'accept': 'application/json',
                'X-API-KEY': apiKey_dev,
            },
            params: {
                page : 1,
                symbol : 'BBCA',
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
    }


}

module.exports = Model