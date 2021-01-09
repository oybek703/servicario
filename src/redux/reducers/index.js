import {combineReducers} from "redux"
import services from "./servicesReducer"
import service from "./serviceReducer"
import auth from "./authReducer"
import createService from "./createService"

const rootReducer = combineReducers({services, service, auth, createService})

export default rootReducer