const express = require("express")

const app = express()

app.get('/', (req, res, next) => {
    res.send('<h2>Hello World!Bye!!Temur</h2>')
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log('App is running...')
})