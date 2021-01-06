import createMuiTheme from "@material-ui/core/styles/createMuiTheme"

const lightBlue = '#4fc1ea'
const lightOrange = '#f39200'

const theme = createMuiTheme({
    palette: {
        common: {
            dark: '#5b5b5b'
        },
        secondary: {
            main: lightOrange
        },
        primary: {
            main: lightBlue
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
                },
                '&$selected': {
                    color: lightOrange
                }
            }
        },
        MuiDrawer: {
            paper: {
                minWidth: 200
            }
        },
        MuiButton: {
            label: {
                textTransform: 'none'
            }
        },
        MuiListItem: {
            root: {
                '&$selected': {
                    backgroundColor: lightBlue
                }
            }
        }
    }
})

export default theme