const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const webpush = require('web-push')
const utils = require('./utils')
const fetchWord = require('./services/fetchWord')
const findSentence = require('./services/findSentence')
const app = express()

// app config
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

// web-push config
webpush.setVapidDetails(
    'mailto:test@test.com',
    process.env.PUBLIC_VAPID_KEY,
    process.env.PRIVATE_VAPID_KEY
)

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
        console.error(':ROUTE /api/notify',error)
    }
})

app.post('/api/subscribe', async (_, res) => {
    try {
        // get push subscription object
        const subscription = req.body

        // send 201 - resouces created
        res.status(201).json({})

        // create payload
        const payload = JSON.stringify({ title: "push test" })

        // pass object to send notification
        webpush.sendNotification(subscription, payload)
            .catch(err => {
                console.error(err)
            })
    } catch (error) {
        console.error(':ROUTE /api/subscribe',error)
    }
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server is connected on port ${PORT}`)
})