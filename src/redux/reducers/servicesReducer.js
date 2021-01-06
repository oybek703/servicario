import {FETCH_SERVICES_ERROR, FETCH_SERVICES_START, FETCH_SERVICES_SUCCESS} from "../types"

const initialState = {
    items: [],
    loading: true,
    error: null
}

const services = (state = initialState, action) => {
    const {type, payload} = action
    switch (type) {
        case FETCH_SERVICES_START:
            return {...state, loading: true, error: null}
        case FETCH_SERVICES_SUCCESS:
            return {...state, items: payload,loading: false, error: null}
        case FETCH_SERVICES_ERROR:
            return {...state, loading: false, error: payload}
        default:
            return state
    }
}
export default services