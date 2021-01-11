import {
    CREATE_COLLABORATION_CLEAR,
    CREATE_COLLABORATION_START,
    CREATE_COLLABORATION_SUCCESS,
    USER_MESSAGES_RECEIVED
} from "../types"

const initialState = {
    collaborationId: null,
    loading: false
}

const createCollaboration = (state = initialState, action) => {
    const {type, payload} = action
    switch (type) {
        case CREATE_COLLABORATION_START:
            return {...state, loading: true, collaborationId: null}
        case CREATE_COLLABORATION_SUCCESS:
            return {...state, loading: false, collaborationId: payload}
        case CREATE_COLLABORATION_CLEAR:
            return {loading: false, collaborationId: null}
        default:
            return state
    }
}

const messagesInitialState = {
    messages: []
}

export const userMessages = (state = messagesInitialState, action) => {
    const {type, payload} = action
    switch (type) {
        case USER_MESSAGES_RECEIVED:
            return {...state, messages: payload}
        default:
            return state
    }
}

export default createCollaboration