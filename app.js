const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const webpush = require('web-push')
const cron = require('node-cron')
const utils = require('./utils')
const fetchWord = require('./services/fetchWord')
const findSentence = require('./services/findSentence')
const db = require('./db')
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

//setup cron job
cron.schedule('* * * * *', () => {
    console.log('running a task every minute');
})

app.get('/api/notify', async (_, res) => {
    try {
        let card = await fetchWord()
        const subscription = await db.getSubscription()

        if(!card) return res.json({ 
            success: true, message: "found no cards" 
        })

        let sentences = await findSentence(card.word)

        let s1Index = utils.getRandomInt(0, sentences.length - 1)
        let s2Index = utils.getRandomInt(0, sentences.length - 1)
        card.sentences = [sentences[s1Index], sentences[s2Index]]

        let bodyData = `${card.defination} \n ${card.sentences[0]} \n ${card.sentences[1]}`
        // create payload
        const payload = JSON.stringify({ 
            title: card.word, 
            body: bodyData,
            icon: "http://image.ibb.co/frYOFd/tmlogo.png"
        })

        // pass object to send notification
        webpush.sendNotification(subscription, payload)
            .catch(err => {
                console.error(err)
            })

        // :TODO push notification
        res.json({ success: true, data: card })
    } catch (error) {
        console.error(':ROUTE /api/notify',error)
    }
})

app.post('/api/subscribe', async (req, res) => {
    try {
        // get push subscription object
        const subscription = req.body

        // send 201 - resouces created
        res.status(201).json({})

        console.log('subscription: ', subscription)
    } catch (error) {
        console.error(':ROUTE /api/subscribe',error)
    }
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server is connected on port ${PORT}`)
})