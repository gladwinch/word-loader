const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const utils = require('./utils')
const fetchWord = require('./services/fetchWord')
const findSentence = require('./services/findSentence')
const app = express()

// app config
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.get('/api/notify', async (_, res) => {
    try {
        let card = await fetchWord()
        let sentences = await findSentence(card.word)

        let s1Index = utils.getRandomInt(0, sentences.length - 1)
        let s2Index = utils.getRandomInt(0, sentences.length - 1)
        card.sentences = [sentences[s1Index], sentences[s2Index]]

        // :TODO push notification
        res.json({ success: true, data: card })
    } catch (error) {
        console.log(error)
    }
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server is connected on port ${PORT}`)
})