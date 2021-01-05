import {FETCH_SERVICES_START, FETCH_SERVICES_SUCCESS} from "../types"

const initialState = {
    items: [],
    loading: true
}

const services = (state = initialState, action) => {
    const {type, payload} = action
    switch (type) {
        case FETCH_SERVICES_START:
            return {...state, loading: true}
        case FETCH_SERVICES_SUCCESS:
            return {...state, items: payload,loading: false}
        default:
            return state
    }
}
export default services