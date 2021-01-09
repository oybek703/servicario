import createMuiTheme from "@material-ui/core/styles/createMuiTheme"

const lightBlue = '#4fc1ea'
const lightOrange = '#f39200'
const darkGrey = '#5b5b5b'

const theme = createMuiTheme({
    palette: {
        common: {
            dark: darkGrey
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
            color: 'blue',
            minWidth: 100,
        }
    },
    overrides: {
        MuiTab: {
            root: {
                padding: '2px 4px',
                '@media (min-width: 600px)': {
                    minWidth: 110
                }
            }
        },
        MuiDrawer: {
            paper: {
                minWidth: 200,
                backgroundColor: '#eeeeee'
            }
        },
        MuiButton: {
            label: {
                color: 'white',
                fontSize: '1em'
            }
        },
        MuiLink: {
            root: {
                cursor: 'pointer'
            }
        },
        MuiButtonBase: {
            root: {
                '&$disabled': {
                    cursor: 'not-allowed',
                    pointerEvents: 'fill'
                }
            }
        },
        MuiCircularProgress: {
            colorPrimary: {
                color: 'blue'
            }
        },
        MuiListItemText: {
            root: {
                textAlign: 'center'
            },
            primary: {
                fontSize: '1em'
            }
        },
        MuiList: {
            root: {
                backgroundColor: '#eeeeee'
            }
        },
        MuiListItem: {
            root: {
                '&$focusVisible': {
                    backgroundColor: 'transparent'
                }
            }
        }
    }
})

export default theme