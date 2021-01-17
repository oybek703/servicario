import {
    FETCH_COLLABORATIONS_ERROR,
    FETCH_COLLABORATIONS_START,
    FETCH_COLLABORATIONS_SUCCESS,
    FETCH_SINGLE_COLLABORATION_ERROR,
    FETCH_SINGLE_COLLABORATION_START,
    FETCH_SINGLE_COLLABORATION_SUCCESS, FETCH_SINGLE_COLLABORATION_UPDATED, FINISH_COLLABORATION,
    MEMBERS_STATUS_UPDATED, START_COLLABORATION,
    START_COLLABORATION_LOADING
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
        case FETCH_SINGLE_COLLABORATION_UPDATED:
            return {...state, loading: false, error: null, collaboration: payload}
        case MEMBERS_STATUS_UPDATED:
            return {...state, collaboration: {...state.collaboration, joinedPeople: payload}}
        case FETCH_SINGLE_COLLABORATION_ERROR:
            return {...state, loading: false, error: payload}
        default:
            return state
    }
}

const activeCollaborationInitialState = {
    collaborationStatus: 'pending',
    loading: false
}

export const activeCollaboration = (state = activeCollaborationInitialState, action) => {
    const {type} = action
    switch (type) {
        case START_COLLABORATION_LOADING:
            return {...state, loading: true}
        case START_COLLABORATION:
            return {...state, loading: false, collaborationStatus: 'started'}
        case FINISH_COLLABORATION:
            return {...state, loading: false, collaborationStatus: 'finished'}
        default:
            return state
    }
}

export default userCollaborations