const express = require("express")

const app = express()

const mongoose = require("mongoose")

mongoose.connect('mongodb://root:example@mongo:27017/?authSource=admin').then(() => console.log('DB is connected...')).catch(e => console.log(e))

app.get('/', (req, res, next) => {
    res.send('<h2>Hello World!Bye!!Temur!</h2>')
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log('App is running...')
})