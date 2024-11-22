const { envConfig } = require('./config/envConfig');  
const { connectMongoDb } = require('./config/connection')
const express = require('express')
const { PORT, CONNECTION_URL } = envConfig;
const { logReqRes } = require('./middlewares')
const urlRoute = require('./routes/url')


const app = express()
app.use(express.json())

app.use("/api/url", urlRoute)


connectMongoDb(CONNECTION_URL).then(() => {
    console.log("Mongodb connected")
}).catch((err) => {
    console.log("err", err)
})

app.use(express.urlencoded({ extended: false }))



app.listen(PORT, () => console.log("server started"))
