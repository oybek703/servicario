import React from "react"
import {ThemeProvider} from '@material-ui/core/styles'
import theme from "./UI/Theme"
import {BrowserRouter, Switch, Route} from "react-router-dom"
import Header from "./UI/Header"
import CssBaseline from "@material-ui/core/CssBaseline"
import Home from "./Home"

function App() {
  return (
      <ThemeProvider theme={theme}>
          <CssBaseline/>
          <Header/>
          <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Home}/>
            </Switch>
          </BrowserRouter>
      </ThemeProvider>
  )
}

export default App
