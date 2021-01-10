import {CREATE_OFFER_CLEAR, CREATE_OFFER_START, CREATE_OFFER_SUCCESS} from "../types"

const initialState = {
    offerId: null,
    loading: false
}

const createOffer = (state = initialState, action) => {
    const {type, payload} = action
    switch (type) {
        case CREATE_OFFER_START:
            return {...state, loading: true, offerId: null}
        case CREATE_OFFER_SUCCESS:
            return {...state, loading: false, offerId: payload}
        case CREATE_OFFER_CLEAR:
            return {loading: false, offerId: null}
        default:
            return state
    }
}

export default createOffer