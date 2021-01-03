import createMuiTheme from "@material-ui/core/styles/createMuiTheme"

const theme = createMuiTheme({
    palette: {
        secondary: {
            main: '#f39200'
        }
    },
    typography: {
        fontFamily: 'Roboto, Trebuchet MS, sans-serif'
    }
})

export default theme