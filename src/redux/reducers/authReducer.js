import {
    AUTO_LOGIN, CLEAR_AUTH_ERROR,
    LOGIN_USER_ERROR,
    LOGIN_USER_START,
    LOGIN_USER_SUCCESS, LOGOUT_USER,
    REGISTER_USER_ERROR,
    REGISTER_USER_START,
    REGISTER_USER_SUCCESS
} from "../types"

const initialState = {
    user: null,
    loading: false,
    error: null
}

const auth = (state = initialState, action) => {
    const {type, payload} = action
    switch (type) {
        case REGISTER_USER_START:
        case LOGIN_USER_START:
            return {...state, loading: true, error: null}
        case REGISTER_USER_SUCCESS:
        case LOGIN_USER_SUCCESS:
        case AUTO_LOGIN:
            return {...state, loading: false, user: payload, error: null}
        case REGISTER_USER_ERROR:
        case LOGIN_USER_ERROR:
            return {...state, loading: false, error: payload}
        case LOGOUT_USER:
            return {...state, loading: false, error: null, user: null}
        case CLEAR_AUTH_ERROR:
            return {...state, error: null}
        default:
            return state
    }
}

export default auth