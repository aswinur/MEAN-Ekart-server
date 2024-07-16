require('dotenv').config()
const express = require('express')
const cors = require('cors')
require('./Connection/db')
const router=require('./Routes/routes')

const ekart = express()
ekart.use(cors())
ekart.use(express.json())
ekart.use(router)

const PORT = 3000 || process.env.PORT

ekart.listen(PORT, () => {
    console.log(`Ekart server running at ${PORT}`);
})

ekart.get('/', (req, res) => {
    res.send("<h1> Ekart server is active... Waiting for user request...</h1>")
})