const dotenv = require('dotenv')
dotenv.config()

const admin = require("firebase-admin")
const serviceAccount = {
    type: process.env.FS_TYPE,
    project_id: process.env.FS_PROJECT_ID,
    private_key_id: process.env.FS_PRIVATE_KEY_ID,
    private_key: process.env.FS_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.FS_CLIENT_EMAIL,
    client_id: process.env.FS_CLIENT_ID,
    auth_uri: process.env.FS_AUTH_URI,
    token_uri: process.env.FS_TOKEN_URI ,
    auth_provider_x509_cert_url: process.env.FS_AUTH_CERT, 
    client_x509_cert_url: process.env.FS_CLIENT_CERT_URL
} 

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore()
const listRef = db.collection('list').doc('word-list')

async function fetchList() {
    let response = await listRef.get()
    return response.data()
}

async function getSubscription() {
    const subRef = db.collection('subscription').doc('AJMPLRbXhoGFnGxWc12Q')
    let response = await subRef.get()
    let sub = response.data()

    return {
        endpoint: sub.endpoint,
        expirationTime: sub.expirationTime,
        keys: {
            p256dh: sub.keys_p256dh,
            auth: sub.keys_auth
        } 
    }
}   

async function resetList() {
    // reset list property
    await db.collection('list').doc('word-list').update({
        'context-practice': 2,
        'known-word': 1,
        'learn-word': 3,
        'new-word': 4,
        'practice-word': 3
    })
}

async function updateList(field, value) {
    listRef.update({ [field]: value })
}

async function findAndSaveSubscription(sub) {
    // let subscription = {
    //     endpoint: sub.endpoint,
    //     expirationTime: sub.expirationTime,
    //     [`keys_`]
    //     keys: {
    //         p256dh: 'BJ0PrFj_Bz-Lh3C9cJ5RiAoJ1fRcRFo99DWKpqouNSAOTS4SwWvsF53LbAqt4uGu5lKwBwUEt1JIMiZklV8rt4U',
    //         auth: 'F-zHzN3fHqdJUVvTMBCUAA'
    //     }
    // }
}

module.exports = {
    fetchList,
    updateList,
    getSubscription,
    resetList
}