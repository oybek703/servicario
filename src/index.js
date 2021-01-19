import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import {Provider} from "react-redux"
import store from "./redux/store"
import ErrorBoundary from "./components/UI/ErrorBoundary"
import {BrowserRouter} from "react-router-dom"

ReactDOM.render(<ErrorBoundary><BrowserRouter><Provider store={store}><App /></Provider></BrowserRouter></ErrorBoundary>, document.getElementById('root'))
