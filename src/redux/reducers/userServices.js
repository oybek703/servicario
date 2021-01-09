import {
    FETCH_USER_SERVICES_ERROR,
    FETCH_USER_SERVICES_START,
    FETCH_USER_SERVICES_SUCCESS
} from "../types"

const initialState = {
    items: [],
    loading: false,
    error: null
}

const userServices = (state = initialState, action) => {
    const {type, payload} = action
    switch (type) {
        case FETCH_USER_SERVICES_START:
            return {...state, loading: true, error: null, items: []}
        case FETCH_USER_SERVICES_SUCCESS:
            return {...state, items: payload, loading: false, error: null}
        case FETCH_USER_SERVICES_ERROR:
            return {...state, loading: false, error: payload}
        default:
            return state
    }
}

export default userServices