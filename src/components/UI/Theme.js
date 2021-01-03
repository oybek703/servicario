import createMuiTheme from "@material-ui/core/styles/createMuiTheme"

const theme = createMuiTheme({
    palette: {
        common: {
            dark: '#5b5b5b'
        },
        secondary: {
            main: '#f39200'
        },
        primary: {
            main: '#4fc1ea'
        }
    },
    typography: {
        fontFamily: 'Roboto, Trebuchet MS, sans-serif',
        fontWeightRegular: 500,
        roundedButton: {
            borderRadius: 50,
            color: 'white',
            minWidth: 100,
        }
    },
    overrides: {
        MuiTab: {
            root: {
                '@media (min-width: 600px)': {
                    minWidth: 70
                }
            }
        },
        MuiDrawer: {
            paper: {
                minWidth: 180
            }
        },
        MuiButton: {
            label: {
                textTransform: 'none'
            }
        }
    }
})

export default theme