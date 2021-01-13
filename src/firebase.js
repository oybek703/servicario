import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyBXtMml5d0gNCIw2Omu80wwkYz-yTK1M0E",
    authDomain: "servicario-mr.firebaseapp.com",
    databaseURL: "https://servicario-mr-default-rtdb.firebaseio.com",
    projectId: "servicario-mr",
    storageBucket: "servicario-mr.appspot.com",
    messagingSenderId: "59968472958",
    appId: "1:59968472958:web:23a5c9c3b17c1fdb58152f"
}

firebase.initializeApp(firebaseConfig)

export const firestore = firebase.firestore()
export  default  firebase
export const {Timestamp} = firebase.firestore
