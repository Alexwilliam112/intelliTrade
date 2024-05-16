'use strict'

const dateFormatter = (date) => {
    return new Date(date).toLocaleString('id-ID', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    });
}

module.exports = { dateFormatter }