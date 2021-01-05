import {firestore} from "../firebase"
import {FETCH_SERVICES_START, FETCH_SERVICES_SUCCESS} from "./types"

export function fetchServices() {
   return async dispatch => {
       let items = []
       dispatch({type: FETCH_SERVICES_START})
       const snapshot = await firestore.collection('services').get()
       snapshot.forEach(doc => items = doc.data())
       console.log(items)
       dispatch({type: FETCH_SERVICES_SUCCESS, payload: items})
   }
}