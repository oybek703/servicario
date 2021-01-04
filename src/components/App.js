import React, {useEffect} from "react"
import {ThemeProvider} from '@material-ui/core/styles'
import theme from "./UI/Theme"
import {BrowserRouter, Switch, Route} from "react-router-dom"
import Header from "./UI/Header"
import CssBaseline from "@material-ui/core/CssBaseline"
import Home from "./Home"
import ServicePage from "./ServicePage"
import {firestore} from "../firebase"

function App() {
    useEffect(() => {
        firestore.collection('services').get().then(snapshot => {
            snapshot.forEach(doc => console.log(doc.data()))
        })
    })
  return (
      <ThemeProvider theme={theme}>
          <CssBaseline/>
          <BrowserRouter>
              <Header/>
              <Switch>
                <Route path='/' exact component={Home}/>
                <Route path='/services/:id' component={ServicePage}/>
            </Switch>
          </BrowserRouter>
      </ThemeProvider>
  )
}

export default App
