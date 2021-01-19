import {firestore, Timestamp} from "../firebase"
import firebase from '../firebase'
import 'firebase/auth'
import {
    CHAT_MESSAGES_RECEIVED,
    CLEAR_AUTH_ERROR, CLEAR_SEND_MESSAGE_STATUS,
    CREATE_COLLABORATION_CLEAR,
    CREATE_COLLABORATION_START,
    CREATE_COLLABORATION_SUCCESS,
    CREATE_OFFER_CLEAR,
    CREATE_OFFER_START,
    CREATE_OFFER_SUCCESS,
    CREATE_SERVICE_START,
    CREATE_SERVICE_SUCCESS,
    FETCH_COLLABORATIONS_ERROR,
    FETCH_COLLABORATIONS_START,
    FETCH_COLLABORATIONS_SUCCESS,
    FETCH_RECEIVED_OFFERS_ERROR,
    FETCH_RECEIVED_OFFERS_START,
    FETCH_RECEIVED_OFFERS_SUCCESS,
    FETCH_SENT_OFFERS_ERROR,
    FETCH_SENT_OFFERS_START,
    FETCH_SENT_OFFERS_SUCCESS,
    FETCH_SERVICE_ERROR,
    FETCH_SERVICE_START,
    FETCH_SERVICE_SUCCESS,
    FETCH_SERVICES_ERROR,
    FETCH_SERVICES_START,
    FETCH_SERVICES_SUCCESS,
    FETCH_SINGLE_COLLABORATION_ERROR,
    FETCH_SINGLE_COLLABORATION_START,
    FETCH_SINGLE_COLLABORATION_SUCCESS, FETCH_SINGLE_COLLABORATION_UPDATED,
    FETCH_USER_SERVICES_ERROR,
    FETCH_USER_SERVICES_START,
    FETCH_USER_SERVICES_SUCCESS, FINISH_COLLABORATION,
    LOGIN_USER_ERROR,
    LOGIN_USER_START,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER,
    MARK_AS_READ_START,
    MARK_AS_READ_SUCCESS, MEMBERS_STATUS_UPDATED,
    REGISTER_USER_ERROR,
    REGISTER_USER_START,
    REGISTER_USER_SUCCESS, SEND_MESSAGE_START, SEND_MESSAGE_SUCCESS, START_COLLABORATION, START_COLLABORATION_LOADING,
    UPDATE_OFFER_START,
    UPDATE_OFFER_SUCCESS,
    USER_MESSAGES_RECEIVED
} from "./types"

//SERVICES

const rejectCache = snapshot => {
    const cache = snapshot.metadata.fromCache
    if(cache) {
        throw new Error('Network is not available cache rejected!')
    }
}

export function fetchServices() {
   return async dispatch => {
       try {
           dispatch({type: FETCH_SERVICES_START})
           const snapshot = await firestore.collection('services').get()
           rejectCache(snapshot)
           dispatch({type: FETCH_SERVICES_SUCCESS, payload: snapshot.docs.map(doc => ({id: doc.id ,...doc.data()}))})
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
            const {user: uid} = snapshot.data()
            const {name} = (await getUserById(uid)).data()
            dispatch({type: FETCH_SERVICE_SUCCESS, payload: {...snapshot.data(), user: {uid, name}}})
        } catch (e) {
            dispatch({type: FETCH_SERVICE_ERROR, payload: e.message})
        }
    }
}

export const createNewService = (newService) => {
    return async dispatch => {
        try {
            dispatch({type: CREATE_SERVICE_START})
            const {id} = await firestore.collection('services').add(newService)
            dispatch({type: CREATE_SERVICE_SUCCESS, payload: id})
        } catch (e) {
            console.error(e)
        }

    }
}

export const fetchUserServices = uid => {
    return async dispatch => {
        try {
            dispatch({type: FETCH_USER_SERVICES_START})
            const userServices = await firestore.collection('services').where('user', '==', uid).get()
            rejectCache(userServices)
            const items = userServices.docs.map(doc => ({id: doc.id, ...doc.data()}))
            dispatch({type: FETCH_USER_SERVICES_SUCCESS, payload: items})
        } catch (e) {
            dispatch({type: FETCH_USER_SERVICES_ERROR, payload: {code: e.code, message: e.message}})
        }
    }
}

//PROFILES

export const logoutUser = () => {
    return async (dispatch, getState) => {
        const isOfflineForDatabase = {state: 'offline', last_changed: firebase.database.ServerValue.TIMESTAMP}
        const {user} = getState().auth
        if(user) {
            await firebase.database().ref(`/status/${user.uid}`).set(isOfflineForDatabase)
        }
        localStorage.removeItem('session')
        await firebase.auth().signOut()
        dispatch({type: LOGOUT_USER})
    }
}

const autoLogout = (time) => {
    return async dispatch => {
        setTimeout(() => {
            dispatch(logoutUser())
        }, time * 1000)
    }
}

export const autoLogin = () => {
    return async dispatch => {
        const session = JSON.parse(localStorage.getItem('session'))
        if(session) {
            const {expirationTime} = session
            if(new Date(expirationTime).getTime() < new Date().getTime()) {
                dispatch(logoutUser())
            } else {
                dispatch({type: LOGIN_USER_SUCCESS, payload: session})
                dispatch(autoLogout((new Date(expirationTime).getTime() - new Date().getTime()) / 1000))
            }
        } else {
            dispatch(logoutUser())
        }
    }
}

export const registerNewUser = ({name, email, password, avatar}) => {
    return async dispatch => {
        try {
            dispatch({type: REGISTER_USER_START})
            const {user} = await firebase.auth().createUserWithEmailAndPassword(email, password)
            const userProfile = {uid: user.uid, name, avatar, email}
            await firestore.collection('profiles').doc(user.uid).set(userProfile)
            const {userSession, expirationTime, messages} = await saveSession(user)
            dispatch({type: REGISTER_USER_SUCCESS, payload: userSession})
            dispatch({type: USER_MESSAGES_RECEIVED, payload: messages})
            dispatch(autoLogout((new Date(expirationTime).getTime() - new Date().getTime()) / 1000))
        } catch (e) {
            dispatch({type: REGISTER_USER_ERROR, payload: {message: e.message, code: e.code}})
            setTimeout(() => dispatch({type: CLEAR_AUTH_ERROR}), 300)
        }
    }
}

export const signInUser = ({email, password}) => {
    return async dispatch => {
        try {
            dispatch({type: LOGIN_USER_START})
            const {user} = await firebase.auth().signInWithEmailAndPassword(email, password)
            const {userSession, expirationTime, messages} = await saveSession(user)
            dispatch({type: LOGIN_USER_SUCCESS, payload: userSession})
            dispatch({type: USER_MESSAGES_RECEIVED, payload: messages})
            dispatch(autoLogout((new Date(expirationTime).getTime() - new Date().getTime()) / 1000))
        } catch (e) {
            dispatch({type: LOGIN_USER_ERROR, payload: {message: e.message, code: e.code}})
            setTimeout(() => dispatch({type: CLEAR_AUTH_ERROR}), 300)
        }
    }
}

export const checkUserStatus = uid => {
    const userRealtimeDatabaseRef = firebase.database().ref(`/status/${uid}`)
    const isOfflineForDatabase = {state: 'offline', last_changed: firebase.database.ServerValue.TIMESTAMP}
    const isOnlineForDatabase = {state: 'online', last_changed: firebase.database.ServerValue.TIMESTAMP}
    firebase.database().ref('.info/connected').on('value', snapshot => {
        if(!snapshot.val()) {return}
        userRealtimeDatabaseRef.onDisconnect().set(isOfflineForDatabase)
            .then(() => userRealtimeDatabaseRef.set(isOnlineForDatabase))
    })
}

const saveSession = async (user) => {
    const {expirationTime, token} = await user.getIdTokenResult()
    const {name, avatar} = (await firestore.collection('profiles').doc(user.uid).get()).data()
    const messages = (await firestore.collection(`profiles/${user.uid}/messages`).get()).docs.map(doc => ({id: doc.id , ...doc.data()}))
    const userSession = {expirationTime: new Date(expirationTime).getTime(), token, uid: user.uid, name, avatar}
    localStorage.setItem('session', JSON.stringify(userSession))
    return {userSession, expirationTime, messages}
}

const getUserById = async uid => firestore.doc(`profiles/${uid}`).get()

//OFFERS

export const createNewOffer = newOffer => {
    return async dispatch => {
        dispatch({type: CREATE_OFFER_START})
        const {id} = await firestore.collection('offers').add(newOffer)
        dispatch({type: CREATE_OFFER_SUCCESS, payload: id})
        dispatch({type: CREATE_OFFER_CLEAR})
    }
}

export const fetchUserSentOffers = uid => {
    return async dispatch => {
        try {
            dispatch({type: FETCH_SENT_OFFERS_START})
            const snapshot = await firestore.collection('offers').where('fromUser.uid', '==', uid).get()
            rejectCache(snapshot)
            dispatch({type: FETCH_SENT_OFFERS_SUCCESS, payload: snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))})
        } catch (e) {
            dispatch({type: FETCH_SENT_OFFERS_ERROR, payload: {code: e.code, message: e.message}})
        }
    }
}

export const fetchUserReceivedOffers = uid => {
    return async dispatch => {
        try {
            dispatch({type: FETCH_RECEIVED_OFFERS_START})
            const snapshot = await firestore.collection('offers').where('toUser.uid', '==', uid).get()
            rejectCache(snapshot)
            dispatch({type: FETCH_RECEIVED_OFFERS_SUCCESS, payload: snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))})
        } catch (e) {
            dispatch({type: FETCH_RECEIVED_OFFERS_ERROR, payload: {code: e.code, message: e.message}})
        }
    }
}

export const updateOffer = (offerId, status) => {
    return async dispatch => {
        dispatch({type: UPDATE_OFFER_START})
        await firestore.collection('offers').doc(offerId).update({status})
        dispatch({type: UPDATE_OFFER_SUCCESS, payload: `update: ${status}`})
    }
}

//COLLABORATIONS

export const createNewCollaboration = (newCollaboration, newMessage) => {
    return async dispatch => {
        dispatch({type: CREATE_COLLABORATION_START})
        await firestore.collection('collaborations').add(newCollaboration)
        await firestore.collection('profiles').doc(newMessage.toUser).collection('messages').add(newMessage)
        await  firestore.collection('offers').doc(newCollaboration.fromOffer).update({collaborationCreated: true})
        dispatch({type: CREATE_COLLABORATION_SUCCESS, payload: 'collaboration created'})
        dispatch({type: CREATE_COLLABORATION_CLEAR})
    }
}

export const listenForMessageUpdates = uid => {
    return (dispatch, getState) => {
        const {user} = getState().auth
        const unsubscribeFromMessages = firestore.collection('profiles').doc(uid).collection('messages').onSnapshot(snapshot => {
            const newMessages = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()})).filter(m => !m.isRead)
            dispatch({type: USER_MESSAGES_RECEIVED, payload: newMessages})
        })
        if (!user) {
            unsubscribeFromMessages()
        }
    }

}

export const markMessageAsRead = (uid ,messageId) => {
    return async dispatch => {
        dispatch({type: MARK_AS_READ_START})
        await firestore.doc(`profiles/${uid}/messages/${messageId}`).update({isRead: true})
        dispatch({type: MARK_AS_READ_SUCCESS, payload: `message ${messageId} marked as read`})
    }
}

export const fetchUserCollaborations = uid => {
    return async dispatch => {
        try {
            dispatch({type: FETCH_COLLABORATIONS_START})
            const snapshot = await firestore.collection('collaborations').where('allowedPeople', 'array-contains', uid).get()
            rejectCache(snapshot)
            const collaborations = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
            dispatch({type: FETCH_COLLABORATIONS_SUCCESS, payload: collaborations})
        } catch (e) {
            dispatch({type: FETCH_COLLABORATIONS_ERROR, payload: {code: e.code, message: e.message}})
        }
    }
}

export const fetchCollaborationById = collaborationId => {
    return async (dispatch, getState) => {
        try {
            let currentUserId;
            const {user} = getState().auth
            if(user) {
                currentUserId = user.uid
            }
            dispatch({type: FETCH_SINGLE_COLLABORATION_START})
            const doc = await firestore.collection('collaborations').doc(collaborationId).get()
            rejectCache(doc)
            const collaboration = {id: collaborationId, ...doc.data()}
            const snapshot = await Promise.all(collaboration.allowedPeople.map(async m => await firestore.doc(`profiles/${m}`).get()))
            const allowedPeople = snapshot.map(doc => doc.data())
            const members = allowedPeople.map(m => m.state === 'online' || m.uid === currentUserId ? m : null).filter(m => m)
            dispatch({type: FETCH_SINGLE_COLLABORATION_SUCCESS, payload: {id: doc.id, ...doc.data(), allowedPeople, joinedPeople: members}})
            firestore.collection('collaborations').doc(collaborationId).onSnapshot(async snapshot => {
                const {expiresAt} = snapshot.data()
                if(expiresAt && new Date().getTime() > expiresAt.toDate().getTime()) {
                    await firestore.collection('collaborations').doc(collaborationId).update({status: 'finished'})
                    dispatch({type: FINISH_COLLABORATION})
                }
                dispatch({type:FETCH_SINGLE_COLLABORATION_UPDATED, payload: {id: snapshot.id, ...snapshot.data(), allowedPeople, joinedPeople: members} })
            })
        } catch (e) {
            dispatch({type: FETCH_SINGLE_COLLABORATION_ERROR, payload: {code: e.code, message: e.message}})
        }
    }
}

export const listenForMembersStatus = () => {
     return async (dispatch, getState) => {
         const {collaboration} = getState().collaboration
         if(collaboration.allowedPeople) {
             const userIds = collaboration.allowedPeople.map(p => p.uid)
             firestore.collection('profiles').where('uid' , 'in', userIds).onSnapshot(snapshot => {
                 const members = snapshot.docs.map(doc => doc.data())
                 dispatch({type: MEMBERS_STATUS_UPDATED, payload: members})
             })
         }
     }
}

export const startCollaboration = (collaborationId, collaborationTime) => {
    return async dispatch => {
        dispatch({type: START_COLLABORATION_LOADING})
        const expiresAt = Timestamp.fromDate(new Date(new Date().getTime() + collaborationTime * 1000))
        await firestore.collection('collaborations').doc(collaborationId).update({expiresAt, status: 'started'})
        dispatch({type: START_COLLABORATION})
        setTimeout(async () => {
            await firestore.collection('collaborations').doc(collaborationId).update({status: 'finished'})
            dispatch({type: FINISH_COLLABORATION})
        }, collaborationTime * 1000)
    }
}

//CHAT MESSAGING

export const sendUserMessage = (collaborationId, message) => {
    return async (dispatch, getState) => {
        const {user: {uid, avatar}} = getState().auth
        const fullMessage = {message, user: {uid, avatar}, createdAt: Timestamp.fromDate(new Date())}
        dispatch({type: SEND_MESSAGE_START})
        await firestore.collection(`/collaborations/${collaborationId}/messages`).add(fullMessage)
        dispatch({type: SEND_MESSAGE_SUCCESS, payload: 'message sent'})
        setTimeout(() => dispatch({type: CLEAR_SEND_MESSAGE_STATUS}), 200)
    }
}

export const listenForChatMessagesUpdate = collaborationId => {
    return async dispatch => {
        firestore.collection(`/collaborations/${collaborationId}/messages`).onSnapshot(snapshot => {
            const messages = snapshot.docs.map(doc => doc.data())
            dispatch({type: CHAT_MESSAGES_RECEIVED, payload: messages})
        })
    }
}
