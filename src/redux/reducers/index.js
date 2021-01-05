import {combineReducers} from "redux"
import services from "./servicesReducer"
import service from "./serviceReducer"

const rootReducer = combineReducers({services, service})

export default rootReducer