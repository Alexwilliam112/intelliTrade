'use strict'

const currencyFormatter = (number) => {
    const newNumber = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    return `IDR  ${newNumber}`
}

module.exports = { currencyFormatter }