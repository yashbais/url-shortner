const { envConfig } = require('./config/envConfig');  
const { connectMongoDb } = require('./config/connection')
const express = require('express')
const { PORT, CONNECTION_URL } = envConfig;
const { logReqRes } = require('./middlewares')
const userRouter = require('./routes/user')


const app = express()

connectMongoDb(CONNECTION_URL).then(() => {
    console.log("Mongodb connected")
}).catch((err) => {
    console.log("err", err)
})

app.use(express.urlencoded({ extended: false }))

app.use(logReqRes('log.txt'))

app.use("/api/users", userRouter)


app.listen(PORT, () => console.log("server started"))
