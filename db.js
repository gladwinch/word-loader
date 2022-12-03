const admin = require("firebase-admin")
const serviceAccount = require("keys.json")

const serviceAccount = {
    type: process.env.FS_TYPE,
    project_id: process.env.FS_PROJECT_ID,
    private_key_id: process.env.FS_PRIVATE_KEY_ID,
    private_key: process.env.FS_PRIVATE_KEY,
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

db.collection('list')