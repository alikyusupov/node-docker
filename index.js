const { 
    MONGO_USER, 
    MONGO_PASSWORD, 
    MONGO_IP, 
    MONGO_PORT, 
    SESSION_SECRET, 
    REDIS_HOST, 
    REDIS_PORT } = require("./config/config")

const express = require("express")

const mongoose = require("mongoose")

const blogRouter = require("./routes/blog-routes")

const userRouter = require("./routes/user-routes")

const session = require("express-session")

const cors = require("cors")

let RedisStore = require("connect-redis")(session)

const { createClient } = require("redis")

let redisClient = createClient({ url: `redis://${REDIS_HOST}:${REDIS_PORT}` })

redisClient.on('connect', () => console.log('Redis is connected...'))

redisClient.on('error', (err) => console.log(err))

const app = express()

app.use(express.json())

app.enable('trust proxy')

app.use(cors({}))

app.use(session({
    store: new RedisStore({ 
        client: redisClient,
     }),
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // if true only transmit cookie over https
        httpOnly: false, // if true prevent client side JS from reading the cookie 
        maxAge: 1000 * 10 // session max age in miliseconds
    }
}))

mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`)
.then(() => console.log('DB is connected...'))
.catch(e => console.log(e))

app.get('/api/v1', (req, res, next) => {
    console.log("Running here...");
    res.send('<h2>Hello World!Bye!!Posya!</h2>')
})

app.use('/api/v1/blogs', blogRouter)
app.use('/api/v1/users', userRouter)

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log('App is running...')
})