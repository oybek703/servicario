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
import {autoLogin} from "../redux/actions"
import {useDispatch} from "react-redux"
import Services from "./Services"
import SentOffers from "./SentOffers"
import ReceivedOffers from "./ReceivedOffers"
import Collaborations from "./Collaborations"
import CollaborationPage from "./CollaborationPage"

function App() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(autoLogin())
        // eslint-disable-next-line
    }, [])
  return (
      <ThemeProvider theme={theme}>
          <CssBaseline/>
          <BrowserRouter>
              <Header/>
              <Switch>
                <Route path='/' exact component={Home}/>
                <Route path='/services' exact component={Services}/>
                <Route path='/services/new' component={CreateService}/>
                <Route path='/services/my' component={MyServices}/>
                <Route path='/services/:id' component={ServicePage}/>
                <Route path='/offers/sent' component={SentOffers}/>
                <Route path='/offers/received' component={ReceivedOffers}/>
                <Route path='/collaborations' exact component={Collaborations}/>
                <Route path='/collaborations/:id' component={CollaborationPage}/>
                <Route path='/register' component={RegisterPage}/>
                <Route path='/login' component={LoginPage}/>
            </Switch>
          </BrowserRouter>
      </ThemeProvider>
  )
}

export default App
