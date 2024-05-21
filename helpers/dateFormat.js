'use strict'

    module.exports = {
        dateFormatter: (date) => {
            return new Date(date).toLocaleString('id-ID', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
            });
        }
    }