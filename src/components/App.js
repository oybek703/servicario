import React, {useEffect} from "react"
import {ThemeProvider} from '@material-ui/core/styles'
import theme from "./UI/Theme"
import {BrowserRouter, Switch, Route} from "react-router-dom"
import Header from "./UI/Header"
import CssBaseline from "@material-ui/core/CssBaseline"
import Home from "./Home"
import ServicePage from "./ServicePage"
import RegisterPage from "./RegisterPage"
import LoginPage from "./LoginPage"
import CreateService from "./CreateService"
import MyServices from "./MyServices"
import {autoLogin, checkUserStatus} from "../redux/actions"
import {useDispatch, useSelector} from "react-redux"
import Services from "./Services"
import SentOffers from "./SentOffers"
import ReceivedOffers from "./ReceivedOffers"
import Collaborations from "./Collaborations"
import CollaborationPage from "./CollaborationPage"
import FaqPage from "./FaqPage"
import ErrorBoundary from "./UI/ErrorBoundary"

function App() {
    const dispatch = useDispatch()
    const {user} = useSelector(state => state.auth)
    useEffect(() => {
        dispatch(autoLogin())
        // eslint-disable-next-line
    }, [])
    useEffect(() => {
        if(user) {
            checkUserStatus(user.uid)
        }
    }, [user])
  return (
      <ThemeProvider theme={theme}>
          <CssBaseline/>
          <ErrorBoundary>
            <BrowserRouter>
              <Header/>
              <Switch>
                <Route path='/' exact component={Home}/>
                <Route path='/services' exact component={Services}/>
                <Route path='/services/new' component={CreateService}/>
                <Route path='/services/my' component={MyServices}/>
                <Route path='/services/:id' component={ServicePage}/>
                <Route path='/offers/sent' component={SentOffers}/>
                <Route path='/faq' component={FaqPage}/>
                <Route path='/offers/received' component={ReceivedOffers}/>
                <Route path='/collaborations' exact component={Collaborations}/>
                <Route path='/collaborations/:id' component={CollaborationPage}/>
                <Route path='/register' component={RegisterPage}/>
                <Route path='/login' component={LoginPage}/>
            </Switch>
          </BrowserRouter>
          </ErrorBoundary>
      </ThemeProvider>
  )
}

export default App
