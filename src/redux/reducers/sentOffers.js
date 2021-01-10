import {FETCH_SENT_OFFERS_ERROR, FETCH_SENT_OFFERS_START, FETCH_SENT_OFFERS_SUCCESS} from "../types"

const initialState = {
    items: [],
    loading: true,
    error: null
}

const sentOffers = (state = initialState, action) => {
    const {type, payload} = action
    switch (type) {
        case FETCH_SENT_OFFERS_START:
            return {...state, loading: true, error: null, items: []}
        case FETCH_SENT_OFFERS_SUCCESS:
            return {...state, items: payload, loading: false, error: null}
        case FETCH_SENT_OFFERS_ERROR:
            return {...state, loading: false, error: payload}
        default:
            return state
    }
}

export default sentOffers