import {combineReducers} from "redux"
import services from "./servicesReducer"
import service from "./serviceReducer"
import auth from "./authReducer"
import createService from "./createService"
import userServices from "./userServices"

const rootReducer = combineReducers({services, service, auth, createService, userServices})

export default rootReducer