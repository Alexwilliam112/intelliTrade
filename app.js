'use strict'

const Controller = require("./controllers/controller")
const express = require('express')
const app = express()
const PORT = 3002


app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))

app.get('/', Controller.renderLandingPage)

app.listen(PORT, () => {
    console.log(`LOCALSERVER STARTED AT PORT ${PORT}`);
})