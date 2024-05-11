'use strict'

const Controller = require("./controllers/controller")
const path = require('path')
const express = require('express')
const app = express()
const PORT = 3002

//config
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

//routing
app.get('/', Controller.renderLandingPage)
app.get('/login', Controller.loginForm)
app.get('/signup', Controller.signupForm)

app.listen(PORT, () => {
    console.log(`LOCALSERVER STARTED AT PORT ${PORT}`);
})