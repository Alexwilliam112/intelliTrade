'use strict'

class News {
    constructor(imageUrl, date, title, description, publisherLogo,
        publisherName, newsUrl) {
        this.imageUrl = imageUrl
        this.date = date
        this.title = title
        this.description = description
        this.publisherLogo = publisherLogo
        this.publisherName = publisherName
        this.newsUrl = newsUrl
    }
}

class Stocks {
    #dividend
    #volume
    #createdAt
    constructor(id, stockName, stockCode, dividend, volume, createdAt) {
        this.id = id
        this.stockName = stockName
        this.stockCode = stockCode
        this.#dividend = dividend
        this.#volume = volume
        this.#createdAt = createdAt
    }

    get dividend() {
        return `${this.#dividend}%`
    }

    get volume() {
        const rawInt = this.#volume.toString();
        const parts = [];
        for (let i = rawInt.length - 1; i >= 0; i--) {
            parts.unshift(rawInt[i]);
            if ((rawInt.length - i) % 3 === 0 && i !== 0) {
                parts.unshift(',');
            }
        }
        return parts.join('');
    }

    get createdAt() {
        const date = this.#createdAt
        const options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        }

        return date.toLocaleDateString('id', options)
    }
}

class Factory {

    static createNews(imageUrl, date, title, description, publisherLogo,
        publisherName, newsUrl) {
        return new News(imageUrl, date, title, description, publisherLogo,
            publisherName, newsUrl)
    }

    static createStocks(id, stockName, stockCode, dividend, volume, createdAt) {
        return new Stocks(id, stockName, stockCode, dividend, volume, createdAt)
    }
}

module.exports = Factory