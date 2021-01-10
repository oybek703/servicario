import {
    UPDATE_OFFER_START,
    UPDATE_OFFER_SUCCESS
} from "../types"

const initialState = {
    offerId: null,
    loading: false
}

const updateOffer = (state = initialState, action) => {
    const {type, payload} = action
    switch (type) {
        case UPDATE_OFFER_START:
            return {...state, loading: true, offerId: null}
        case UPDATE_OFFER_SUCCESS:
            return {...state, loading: false, offerId: payload}
        default:
            return state
    }
}

export default updateOffer