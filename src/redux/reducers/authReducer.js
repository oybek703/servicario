import {REGISTER_USER_ERROR, REGISTER_USER_START, REGISTER_USER_SUCCESS} from "../types"

const initialState = {
    user: null,
    loading: false,
    error: null
}

const auth = (state = initialState, action) => {
    const {type, payload} = action
    switch (type) {
        case REGISTER_USER_START:
            return {...state, loading: true, user: null, error: null}
        case REGISTER_USER_SUCCESS:
            return {...state, loading: false, user: payload}
        case REGISTER_USER_ERROR:
            return {...state, loading: false, error: payload}
        default:
            return state
    }
}

export default auth