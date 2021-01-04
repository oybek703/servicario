import React, {Fragment, useEffect, useState} from 'react'
import AppBar from "@material-ui/core/AppBar"
import {Button, IconButton, Tabs, Toolbar, Typography} from "@material-ui/core"
import {makeStyles} from "@material-ui/core/styles"
import useScrollTrigger from "@material-ui/core/useScrollTrigger"
import Zoom from "@material-ui/core/Zoom"
import MenuIcon from '@material-ui/icons/Menu'
import Fab from "@material-ui/core/Fab"
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import Grid from "@material-ui/core/Grid"
import Tab from "@material-ui/core/Tab"
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import CloseIcon from '@material-ui/icons/Close'
import {Link, withRouter} from "react-router-dom"

const useScrollStyles = makeStyles(theme => ({
    root: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    }
}))

function ScrollTop({children}) {
    const classes = useScrollStyles()
    const trigger = useScrollTrigger({
        target: window,
        disableHysteresis: true,
        threshold: 300,
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

function ElevationScroll({children}) {
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window,
    })
    return React.cloneElement(children, {
        elevation: trigger ? 6 : 0,
    })
}

const useStyles = makeStyles(theme => ({
    drawerMenu: {
        ...theme.mixins.toolbar,
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        color: 'white',
        marginTop: '.4em'
    },
    drawerItems: {
        color: 'white'
    },
    drawerContainer: {
        backgroundColor: '#474747'
    },
    appbar: {
        backgroundColor: '#eeeeee',
        color: '#000'
    },
    fab: {
        backgroundColor: 'gray',
        color: 'white'
    },
    register: {
        ...theme.typography.roundedButton
    },
    tab: {
        display: 'none'
    },
    logo: {
        textDecoration: 'none',
        color: 'inherit'
    }

}))

const Header = (props) => {
    const classes = useStyles()
    const {location: {pathname}} = props
    const [tab, setTab] = useState(0)
    const [drawer, setDrawer] = useState(false)
    useEffect(() => {
            pathname.includes('services') && setTab(1)
            pathname === '/' && setTab(0)
    }, [pathname])
    return (
        <Fragment>
            <ElevationScroll >
                <AppBar elevation={0} classes={{root: classes.appbar}} >
                    <Toolbar>
                        <Grid container alignItems='center' justify='space-between'>
                            <Grid item>
                                <Grid container alignItems='center'>
                                    <Typography className={classes.logo} variant='h5' component={Link} to='/'>Servicario &nbsp;</Typography>
                                    <SwipeableDrawer
                                        ModalProps={{BackdropProps: {invisible: true}}}
                                        classes={{paper: classes.drawerContainer}}
                                        open={drawer}
                                        onOpen={() =>
                                        {setDrawer(true)}}
                                        onClose={() => setDrawer(false)}>
                                        <div className={classes.drawerMenu} >
                                            <Typography variant='h4'>Menu</Typography>
                                            <IconButton color='inherit' onClick={() => setDrawer(false)}>
                                                <CloseIcon/>
                                            </IconButton>
                                        </div>
                                        <List disablePadding className={classes.drawerItems}>
                                            {
                                                ['User', 'Message', 'Images', 'Settings'].map(item => (
                                                    <ListItem key={item} button><ListItemText>{item}</ListItemText></ListItem>
                                                ))
                                            }
                                        </List>
                                    </SwipeableDrawer>
                                    <IconButton onClick={() => setDrawer(!drawer)} color='secondary'><MenuIcon /></IconButton>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Tabs value={tab}
                                      style={{borderBottom: 0 }}
                                      onChange={(event, newValue) => setTab(newValue)}
                                      TabIndicatorProps={{className: classes.tab}}>
                                    <Tab component={Link} to='/' label='Home'/>
                                    <Tab component={Link} to='/services' label='Services'/>
                                    <Tab component={Link} to='/faq' label='FAQ'/>
                                    <Tab component={Link} to='/' label='Dropdown'/>
                                    <Tab component={Link} to='login/' label='Login'/>
                                    <Tab
                                         disableRipple
                                         component={Link}
                                         to='/register'
                                         label={<Button className={classes.register} variant='contained' color='secondary' component='span'>Register</Button>}/>
                                </Tabs>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <Toolbar id="back-to-top-anchor" />
            <ScrollTop {...props}>
                <Fab  classes={{root: classes.fab}} color="secondary" size="medium" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon />
                </Fab>
            </ScrollTop>
        </Fragment>
    )
}

export default withRouter(Header)