'use strict'

const favicon = require('serve-favicon')
const path = require('path')
const express = require('express')
const app = express()
const PORT = 3002

//config
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(favicon(path.join(__dirname, 'public', 'icons', 'logo.png')))

//routing
const router = require('./routers/index')
app.use(router)

app.listen(PORT, () => {
    console.log(`LOCALSERVER STARTED AT PORT ${PORT}`);
})