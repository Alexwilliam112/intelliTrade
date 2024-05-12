'use strict'

const Controller = require("./controllers/controller")
const favicon = require('serve-favicon')
const path = require('path')
const express = require('express')
const app = express()
const PORT = 3002

//config
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(favicon(path.join(__dirname, 'public', 'icons', 'logo.png')))

//routing
app.get('/', Controller.renderLandingPage)
app.get('/login', Controller.loginForm)
app.get('/signup', Controller.signupForm)
app.get('/home', Controller.renderHome)
app.get('/dashboard', Controller.renderDashboard)
app.get('/buyorders', Controller.renderBuyOrders)

app.listen(PORT, () => {
    console.log(`LOCALSERVER STARTED AT PORT ${PORT}`);
})