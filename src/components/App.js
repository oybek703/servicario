import React from "react"
import {ThemeProvider} from '@material-ui/core/styles'
import theme from "./UI/Theme"
import {BrowserRouter, Switch, Route} from "react-router-dom"
import Header from "./UI/Header"
import CssBaseline from "@material-ui/core/CssBaseline"
import Home from "./Home"
import ServicePage from "./ServicePage"
import RegisterPage from "./RegisterPage"
import LoginPage from "./LoginPage"

function App() {
  return (
      <ThemeProvider theme={theme}>
          <CssBaseline/>
          <BrowserRouter>
              <Header/>
              <Switch>
                <Route path='/' exact component={Home}/>
                <Route path='/services/:id' component={ServicePage}/>
                <Route path='/register' component={RegisterPage}/>
                <Route path='/login' component={LoginPage}/>
            </Switch>
          </BrowserRouter>
      </ThemeProvider>
  )
}

export default App
