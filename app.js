const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const axios = require('axios')
const app = express()

// app config
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    // get words from trello (progress)
    // select word from static algorithm
    // extract word and defination
    // generate seneteces
    // push notification

    

})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server is connected on port ${PORT}`)
})