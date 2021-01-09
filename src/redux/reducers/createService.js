import {CREATE_SERVICE_CLEAR, CREATE_SERVICE_START, CREATE_SERVICE_SUCCESS} from "../types"

const initialState = {
    serviceId: null,
    loading: false
}

const createService = (state = initialState, action) => {
    const {type, payload} = action
    switch (type) {
        case CREATE_SERVICE_START:
            return {...state, loading:  true, serviceId: null}
        case CREATE_SERVICE_SUCCESS:
            return {...state, loading: false, serviceId: payload}
        case CREATE_SERVICE_CLEAR:
            return {loading: false, serviceId: null}
        default:
            return state
    }
}

export default createService