import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBXtMml5d0gNCIw2Omu80wwkYz-yTK1M0E",
    authDomain: "servicario-mr.firebaseapp.com",
    projectId: "servicario-mr",
    storageBucket: "servicario-mr.appspot.com",
    messagingSenderId: "59968472958",
    appId: "1:59968472958:web:ede1955a1956f8be58152f"
}

firebase.initializeApp(firebaseConfig)

export const firestore = firebase.firestore()
export  default  firebase
export const {Timestamp} = firebase.firestore
