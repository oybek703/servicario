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
import createCollaboration, {userMessages} from "./createCollaboration"
import markAsRead from "./markMessageRead"
import userCollaborations, {collaboration} from "./userCollaborations"
import sendMessage from "./sendMessage"

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
        updateOffer,
        createCollaboration,
        userMessages,
        markAsRead,
        userCollaborations,
        collaboration,
        sendMessage
    }
)

export default rootReducer