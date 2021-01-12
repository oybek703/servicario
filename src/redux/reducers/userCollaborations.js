import {
    FETCH_COLLABORATIONS_ERROR,
    FETCH_COLLABORATIONS_START,
    FETCH_COLLABORATIONS_SUCCESS, FETCH_SINGLE_COLLABORATION_ERROR,
    FETCH_SINGLE_COLLABORATION_START, FETCH_SINGLE_COLLABORATION_SUCCESS
} from "../types"

const initialState = {
    collaborations: [],
    loading: false,
    error: null
}

const userCollaborations = (state = initialState, action) => {
    const {type, payload} = action
    switch (type) {
        case FETCH_COLLABORATIONS_START:
            return {...state, loading: true, error: null}
        case FETCH_COLLABORATIONS_SUCCESS:
            return {...state, loading: false, collaborations: payload, error: null}
        case FETCH_COLLABORATIONS_ERROR:
            return {...state,loading: false, error: payload}
        default:
            return state
    }
}

const collaborationInitialState = {
    collaboration: {},
    loading: true,
    error: null
}

export const collaboration = (state = collaborationInitialState, action) => {
    const {type, payload} = action
    switch (type) {
        case FETCH_SINGLE_COLLABORATION_START:
            return {...state, loading: true, error: null}
        case FETCH_SINGLE_COLLABORATION_SUCCESS:
            return {...state, loading: false, error: null, collaboration: payload}
        case FETCH_SINGLE_COLLABORATION_ERROR:
            return {...state, loading: false, error: payload}
        default:
            return state
    }
}

export default userCollaborations