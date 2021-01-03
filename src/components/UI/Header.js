import React, {Fragment} from 'react'
import AppBar from "@material-ui/core/AppBar"
import {IconButton, Toolbar} from "@material-ui/core"
import {makeStyles} from "@material-ui/core/styles"
import useScrollTrigger from "@material-ui/core/useScrollTrigger"
import Zoom from "@material-ui/core/Zoom"
import MenuIcon from '@material-ui/icons/Menu'
import Fab from "@material-ui/core/Fab"
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import CssBaseline from "@material-ui/core/CssBaseline"

const useScrollStyles = makeStyles(theme => ({
    root: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    }
}))

const useStyles = makeStyles(theme => ({
    appbar: {
        backgroundColor: '#eeeeee'
    }
}))

function ScrollTop({children}) {
    const classes = useScrollStyles()
    const trigger = useScrollTrigger({
        target: window,
        disableHysteresis: true,
        threshold: 100,
    })

    const handleClick = () => {
        const anchor = document.querySelector('#back-to-top-anchor')

        if (anchor) {
            anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
    }

    return (
        <Zoom in={trigger}>
            <div onClick={handleClick} role="presentation" className={classes.root}>
                {children}
            </div>
        </Zoom>
    )
}

const Header = ({props}) => {
    const classes = useStyles()
    return (
        <Fragment>
            <AppBar classes={{root: classes.appbar}} >
                <Toolbar>
                    <IconButton color='secondary'><MenuIcon fontSize='large' /></IconButton>
                </Toolbar>
            </AppBar>
            <Toolbar id="back-to-top-anchor" />
            <ScrollTop {...props}>
                <Fab color="secondary" size="small" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon />
                </Fab>
            </ScrollTop>
        </Fragment>
    )
}

export default Header