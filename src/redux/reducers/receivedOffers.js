import {FETCH_RECEIVED_OFFERS_ERROR, FETCH_RECEIVED_OFFERS_START, FETCH_RECEIVED_OFFERS_SUCCESS} from "../types"

const initialState = {
    items: [],
    loading: true,
    error: null
}

const receivedOffers = (state = initialState, action) => {
    const {type, payload} = action
    switch (type) {
        case FETCH_RECEIVED_OFFERS_START:
            return {...state, loading: true, error: null, items: []}
        case FETCH_RECEIVED_OFFERS_SUCCESS:
            return {...state, items: payload, loading: false, error: null}
        case FETCH_RECEIVED_OFFERS_ERROR:
            return {...state, loading: false, error: payload}
        default:
            return state
    }
}

export default receivedOffers