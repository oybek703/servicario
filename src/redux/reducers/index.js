import {combineReducers} from "redux"
import services from "./servicesReducer"
import service from "./serviceReducer"
import auth from "./authReducer"

const rootReducer = combineReducers({services, service, auth})

export default rootReducer