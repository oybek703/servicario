import {FETCH_SERVICE_START, FETCH_SERVICE_SUCCESS} from "../types"

const initialState = {
    item: {},
    loading: true
}

const service = (state = initialState, action) => {
    const {type, payload} = action
    switch (type) {
        case FETCH_SERVICE_START:
            return {...state, loading: true}
        case FETCH_SERVICE_SUCCESS:
            return {...state, item: payload,loading: false}
        default:
            return state
    }
}

export default service