import {FETCH_COLLABORATIONS_ERROR, FETCH_COLLABORATIONS_START, FETCH_COLLABORATIONS_SUCCESS} from "../types"

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

export default userCollaborations