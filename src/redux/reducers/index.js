import {combineReducers} from "redux"
import services from "./servicesReducer"
import service from "./serviceReducer"
import auth from "./authReducer"
import createService from "./createService"
import userServices from "./userServices"
import createOffer from "./createOffer"
import sentOffers from "./sentOffers"
import receivedOffers from "./receivedOffers"
import updateOffer from "./updateOffer"

const rootReducer = combineReducers(
    {
        services,
        service,
        auth,
        createService,
        userServices,
        createOffer,
        sentOffers,
        receivedOffers,
        updateOffer
    }
)

export default rootReducer