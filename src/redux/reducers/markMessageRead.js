import {MARK_AS_READ_START, MARK_AS_READ_SUCCESS} from "../types"

const initialState = {
    messageInfo: null,
    loading: false
}

const markAsRead =  (state = initialState, action) => {
    const {type, payload} = action
    switch (type) {
        case MARK_AS_READ_START:
            return {...state, loading: true, messageInfo: null }
        case MARK_AS_READ_SUCCESS:
            return {...state, loading: false, messageInfo: payload}
        default:
            return state
    }
}

export default markAsRead