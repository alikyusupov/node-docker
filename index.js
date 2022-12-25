const express = require("express")

const mongoose = require("mongoose")

const blogRouter = require("./routes/blog-routes")

const userRouter = require("./routes/user-routes")

const app = express()

app.use(express.json())

const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT } = require("./config/config")

mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`)
.then(() => console.log('DB is connected...'))
.catch(e => console.log(e))

app.get('/', (req, res, next) => {
    res.send('<h2>Hello World!Bye!!Temur!</h2>')
})

app.use('/api/v1/blogs', blogRouter)
app.use('/api/v1/users', userRouter)

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log('App is running...')
})