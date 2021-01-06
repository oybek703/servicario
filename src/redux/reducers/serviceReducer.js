import {FETCH_SERVICE_ERROR, FETCH_SERVICE_START, FETCH_SERVICE_SUCCESS} from "../types"

const initialState = {
    item: {},
    loading: true,
    error: null
}

const service = (state = initialState, action) => {
    const {type, payload} = action
    switch (type) {
        case FETCH_SERVICE_START:
            return {...state, loading: true, error: null}
        case FETCH_SERVICE_SUCCESS:
            return {...state, item: payload,loading: false, error: null}
        case FETCH_SERVICE_ERROR:
            return {...state, loading: false, error: payload}
        default:
            return state
    }
}

export default service