import {firestore} from "../firebase"
import {FETCH_SERVICE_START, FETCH_SERVICE_SUCCESS, FETCH_SERVICES_START, FETCH_SERVICES_SUCCESS} from "./types"

//SERVICES
export function fetchServices() {
   return async dispatch => {
       try {
           let items = []
           dispatch({type: FETCH_SERVICES_START})
           const snapshot = await firestore.collection('services').get()
           items = snapshot.docs.map(doc => doc.data())
           dispatch({type: FETCH_SERVICES_SUCCESS, payload: items})
       } catch (e) {
           console.error(`Error while loading services: `, e)
       }
   }
}

export function fetchService(serviceId) {
    return async dispatch => {
        dispatch({type: FETCH_SERVICE_START})
        const snapshot = await firestore.collection('services').doc(serviceId).get()
        dispatch({type: FETCH_SERVICE_SUCCESS, payload: {...snapshot.data()}})
    }
}

//PROFILES