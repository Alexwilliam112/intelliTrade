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

class Factory {

    static createNews(imageUrl, date, title, description, publisherLogo,
        publisherName, newsUrl) {
        return new News(imageUrl, date, title, description, publisherLogo,
            publisherName, newsUrl)
    }
}

module.exports = Factory