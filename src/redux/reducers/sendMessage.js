import {CLEAR_SEND_MESSAGE_STATUS, SEND_MESSAGE_ERROR, SEND_MESSAGE_START, SEND_MESSAGE_SUCCESS} from "../types"

const initialState = {
    messageId: null,
    loading: false
}

const sendMessage = (state = initialState, action) => {
    const {type, payload} = action
    switch (type) {
        case SEND_MESSAGE_START:
            return {...state, loading: true, error: null}
        case SEND_MESSAGE_SUCCESS:
            return {...state, loading: false, messageId: payload}
        case CLEAR_SEND_MESSAGE_STATUS:
            return {...state, loading: false, messageId: null}
        default:
            return state
        }
}

export default sendMessage