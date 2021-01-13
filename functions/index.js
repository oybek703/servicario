const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp()

const firestore = admin.firestore()

exports.onUserStatusChanged = functions.database.ref('/status/{uid}')
    .onUpdate(((change, context) => {
        const eventStatus = change.after.val()
        const userFireStoreRef = firestore.doc(`/profiles/${context.params.uid}`)
        change.after.ref.once('value').then(statusSnapshot => {
            const status = statusSnapshot.val()
            if (status.last_changed > eventStatus.last_changed) {
                return null
            }
            eventStatus.last_changed = new Date(eventStatus.last_changed)
            return userFireStoreRef.update(eventStatus)
        })
}))