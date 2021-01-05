import {combineReducers} from "redux"
import services from "./servicesReducer"

const rootReducer = combineReducers({services})

export default rootReducer