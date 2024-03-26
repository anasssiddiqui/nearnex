let firebaseAdmin = require("firebase-admin");
const {firebaseDB} = require("../utility/config");
const serviceAccount = require('../firebase/snoozecare-b0b64-firebase-adminsdk-iy5jp-2eea88f4a0.json');

const firebaseApp = firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    databaseURL: firebaseDB,
});

module.exports = {
    firebaseApp
}