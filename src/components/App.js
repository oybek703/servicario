import React from "react"
import {makeStyles, ThemeProvider} from '@material-ui/core/styles'
import theme from "./UI/Theme"
import {Typography} from "@material-ui/core"
import {BrowserRouter} from "react-router-dom"
import Header from "./UI/Header"
import CssBaseline from "@material-ui/core/CssBaseline"
import Container from "@material-ui/core/Container"
import Box from "@material-ui/core/Box"

function App() {
  return (
      <ThemeProvider theme={theme}>
          <CssBaseline/>
          <Header/>
          <BrowserRouter>
            <Typography color='primary' variant='h1'>Main Content</Typography>
              <Container>
                  <Box my={2}>
                      {[...new Array(32)]
                          .map(
                              () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
                          )
                          .join('\n')}
                  </Box>
              </Container>
          </BrowserRouter>
      </ThemeProvider>
  )
}

export default App
