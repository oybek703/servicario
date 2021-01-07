import {firestore} from "../firebase"
import firebase from 'firebase/app'
import 'firebase/auth'
import {
    FETCH_SERVICE_ERROR,
    FETCH_SERVICE_START,
    FETCH_SERVICE_SUCCESS,
    FETCH_SERVICES_ERROR,
    FETCH_SERVICES_START,
    FETCH_SERVICES_SUCCESS, LOGIN_USER_ERROR,
    LOGIN_USER_START,
    LOGIN_USER_SUCCESS, LOGOUT_USER,
    REGISTER_USER_ERROR,
    REGISTER_USER_START,
    REGISTER_USER_SUCCESS
} from "./types"

//SERVICES

export function fetchServices() {
   return async dispatch => {
       try {
           dispatch({type: FETCH_SERVICES_START})
           const snapshot = await firestore.collection('services').get()
           const cache = snapshot.metadata.fromCache
           if(cache) {
               throw new Error('Network is not available cache rejected!')
           }
           dispatch({type: FETCH_SERVICES_SUCCESS, payload: snapshot.docs.map(doc => doc.data())})
       } catch (e) {
           dispatch({type: FETCH_SERVICES_ERROR, payload: e.message})
       }
   }
}

export function fetchService(serviceId) {
    return async dispatch => {
        try {
            dispatch({type: FETCH_SERVICE_START})
            const snapshot = await firestore.collection('services').doc(serviceId).get()
            dispatch({type: FETCH_SERVICE_SUCCESS, payload: {...snapshot.data()}})
        } catch (e) {
            dispatch({type: FETCH_SERVICE_ERROR, payload: e.message})
        }
    }
}

//PROFILES

export const registerNewUser = ({name, email, password, avatar}) => {
    return async dispatch => {
        try {
            dispatch({type: REGISTER_USER_START})
            const {user} = await firebase.auth().createUserWithEmailAndPassword(email, password)
            const userProfile = {uid: user.uid, name, avatar, email, services: [], description: ''}
            await firestore.collection('profiles').doc(user.uid).set(userProfile)
            dispatch({type: REGISTER_USER_SUCCESS, payload: user})
        } catch (e) {
            dispatch({type: REGISTER_USER_ERROR, payload: {message: e.message, code: e.code}})
        }
    }
}

export const signInUser = ({email, password}) => {
    return async dispatch => {
        try {
            dispatch({type: LOGIN_USER_START})
            const {user} = await firebase.auth().signInWithEmailAndPassword(email, password)
            dispatch({type: LOGIN_USER_SUCCESS, payload: user})
        } catch (e) {
            dispatch({type: LOGIN_USER_ERROR, payload: {message: e.message, code: e.code}})
        }
    }
}

export const logoutUser = () => {
    return async dispatch => {
        await firebase.auth().signOut()
        dispatch({type: LOGOUT_USER})
    }
}