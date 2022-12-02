const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const axios = require('axios')
const app = express()

app.get('/', (req, res) => {
    res.json({ success: true, data: "gladwin" })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server is connected on port ${PORT}`)
})