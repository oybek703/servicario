import {applyMiddleware, compose, createStore} from "redux"
import rootReducer from "./reducers"
import thunk from "redux-thunk"

const logMiddleware = ({getState}) => dispatch => action => {
    console.group('%c action', 'color: lightgreen', action.type)
    console.log('%c prevState', 'color: lightblue', getState())
    console.log('%c action', 'color: darkgrey', getState())
    const returnValue = dispatch(action)
    console.log('%c nextState', 'color: red', getState())
    console.groupEnd()
    return returnValue
}

const thunkMiddleware = ({getState}) => dispatch => action => {
    if(typeof action === 'function') {
      return action(getState, dispatch)
    }
    return dispatch(action)
}

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk, logMiddleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    )
)

export default store