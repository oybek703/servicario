import {CREATE_COLLABORATION_CLEAR, CREATE_COLLABORATION_START, CREATE_COLLABORATION_SUCCESS} from "../types"

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

export default createCollaboration