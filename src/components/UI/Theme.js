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
                textTransform: 'none',
                padding: '0 1px',
                '@media (min-width: 600px)': {
                    minWidth: 110
                },
                '&$selected': {
                    color: lightOrange
                },
                '&:hover': {
                    color: lightOrange
                }
            },
            wrapper: {
                fontSize: '1rem'
            }
        },
        MuiDrawer: {
            paper: {
                minWidth: 200
            }
        },
        MuiButton: {
            label: {
                textTransform: 'none',
                color: 'white',
                fontSize: '1.2em'
            }
        },
        MuiListItem: {
            root: {
                '&$selected': {
                    backgroundColor: lightBlue
                },
                '&$focusVisible': {
                    backgroundColor: 'transparent'
                },
                '&$gutters': {
                    padding: '2px 10px'
                }
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
        MuiList: {
            root: {
                backgroundColor: '#eeeeee'
            }
        },
        MuiMenuItem: {
            root: {
                minWidth: '12em',
                '&:hover': {
                    color: lightOrange,
                    backgroundColor: 'transparent'
                }
            }
        }
    }
})

export default theme