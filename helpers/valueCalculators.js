'use strict'

module.exports = {

    estimateDividend: (dividendYield, quantity, currentPrice) => {
        const dividendPercentage = dividendYield / 100
        return dividendPercentage * currentPrice * quantity
    },

    estimateValue: (quantity, currentPrice) => {
        return quantity * currentPrice
    },

    volumeIndicator: (currentVol, previousVol) => {
        if(previousVol < currentVol) {
            return false
        } else {
            return true
        }
    }
}