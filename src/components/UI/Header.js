import React, {Fragment, useEffect, useRef, useState} from 'react'
import AppBar from "@material-ui/core/AppBar"
import {Button, IconButton, Tabs, Toolbar, Typography, useMediaQuery} from "@material-ui/core"
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
import Divider from "@material-ui/core/Divider"
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import Tooltip from "@material-ui/core/Tooltip"
import {useDispatch, useSelector} from "react-redux"
import {logoutUser} from "../../redux/actions"
import Chip from "@material-ui/core/Chip"
import firebase from 'firebase/app'
import 'firebase/auth'
import {firestore} from "../../firebase"
import Avatar from "@material-ui/core/Avatar"
import ExpandMore from "@material-ui/icons/ExpandMore"
import Popper from "@material-ui/core/Popper"
import Paper from "@material-ui/core/Paper"
import ClickAwayListener from "@material-ui/core/ClickAwayListener"
import MenuList from "@material-ui/core/MenuList"
import MenuItem from "@material-ui/core/MenuItem"
import Grow from "@material-ui/core/Grow"


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
    btnTab: {
        '&:hover': {
            backgroundColor: 'transparent'
        }
    },
    tab: {
        display: 'none'
    },
    logo: {
        textDecoration: 'none',
        color: 'inherit'
    },
    listItem: {
        textAlign: 'center',
        paddingTop: '1em'
    },
    menuRegister: {
        width: '100%',
        textAlign: 'center'
    },
    listItemBtn: {
        '&.Mui-selected': {
            backgroundColor: 'transparent'
        }
    }
}))

const Header = (props) => {
    const {location: {pathname}} = props
    const classes = useStyles()
    const matchSM = useMediaQuery(theme => theme.breakpoints.down('sm'))
    const dispatch = useDispatch()
    const {user} = useSelector(state => state.auth)
    const manageRef = useRef(null)
    const [tab, setTab] = useState(0)
    const [drawer, setDrawer] = useState(false)
    const [manage, setManage] = useState(false)
    const [menuDrawer, setMenuDrawer] = useState(false)
    const [menuSelectedIndex, setMenuSelectedIndex] = useState(0)
    const [name, setName] = useState('')
    const [avatar, setAvatar] = useState('')
    const routes = ['Home', 'Services', 'FAQ', 'Login', 'Register']
    const signedUserRoutes = ['Home', 'Services', 'FAQ', 'Manage', 'Logout']
    const handleLogout = () => dispatch(logoutUser())
    useEffect(() => {
            switch (pathname) {
                case '/': setTab(0); setMenuSelectedIndex(0); break
                case '/faq': setTab(2); setMenuSelectedIndex(2); break
                case '/manage': setTab(3); setMenuSelectedIndex(3); break
                case '/login': setTab(4); setMenuSelectedIndex(4); break
                case '/register': setTab(5); setMenuSelectedIndex(5); break
                default: setTab(1); setMenuSelectedIndex(1)
            }
    }, [pathname, user])
    useEffect(() => {
        const unsubscribeUser = firebase.auth().onAuthStateChanged(user => {
            if(user) {
                const {uid} = user
                firestore.collection('profiles').doc(uid).get().then(snapshot => {
                    setName(snapshot.data().name)
                    setAvatar(snapshot.data().avatar)
                })
            }
        })
        return unsubscribeUser
    }, [])
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
                                            <IconButton color='inherit' onClick={() => setDrawer(false)}><CloseIcon/></IconButton>
                                        </div>
                                        <Divider/>
                                        <List disablePadding className={classes.drawerItems}>
                                            {
                                                ['User', 'Message', 'Images', 'Settings'].map(item => (
                                                    <ListItem key={item} button><ListItemText>{item}</ListItemText></ListItem>
                                                ))
                                            }
                                        </List>
                                    </SwipeableDrawer>
                                    <IconButton onClick={() => setDrawer(!drawer)} color='secondary'><MenuIcon /></IconButton>
                                    {user && name && avatar && <Chip avatar={<Avatar alt={name} src={avatar}/>} label={name}/>}
                                </Grid>
                            </Grid>
                            <Grid item>
                                {matchSM
                                    ? <Fragment>
                                            <IconButton onClick={() => setMenuDrawer(true)}>
                                                <MenuIcon color='primary'/>
                                            </IconButton>
                                            <SwipeableDrawer
                                                onClose={() => setMenuDrawer(false)}
                                                onOpen={() => setMenuDrawer(true)}
                                                open={menuDrawer}
                                                anchor='right'>
                                                    <div className={classes.drawerMenu}>
                                                        <Tooltip title='Close'>
                                                            <IconButton onClick={() => setMenuDrawer(false)}>
                                                                <ArrowForwardIosIcon color='primary'/>
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Divider/>
                                                    </div>
                                                    <Divider/>
                                                <List disablePadding>
                                                    {
                                                        (user ? signedUserRoutes : routes).map((route, index) => (
                                                            route === 'Register' || route === 'Logout'
                                                                ? <ListItem
                                                                    key={route}
                                                                    selected={index === menuSelectedIndex}
                                                                    classes={{root: classes.listItemBtn}}
                                                                    onClick={() => {setMenuDrawer(false); if(route === 'Logout') handleLogout()}}
                                                                    component={Link}
                                                                    to={route === 'Logout' ? '/' : '/register'}>
                                                                    <Button component='span' variant='contained' color='secondary' className={`${classes.register} ${classes.menuRegister}`}>
                                                                        <ListItemText>{route}</ListItemText>
                                                                    </Button>
                                                                </ListItem>
                                                                : <ListItem
                                                                key={route}
                                                                selected={index === menuSelectedIndex}
                                                                classes={{root: classes.listItem}}
                                                                onClick={() => {setMenuDrawer(false)}}
                                                                component={Link}
                                                                to={route === 'Home' ? '/' : `/${route.toLowerCase()}`}>
                                                                <ListItemText>{route}</ListItemText>
                                                            </ListItem>
                                                        ))
                                                    }
                                                </List>
                                            </SwipeableDrawer>
                                        </Fragment>
                                    : <Fragment>
                                            <Tabs value={tab}
                                                style={{borderBottom: 0 }}
                                                onChange={(event, newValue) => setTab(newValue)}
                                                TabIndicatorProps={{className: classes.tab}}>
                                            {
                                                (user ? signedUserRoutes : routes).map(route => (
                                                    route === 'Register' || route === 'Logout'
                                                        ? <Tab
                                                            key={route}
                                                            disableRipple
                                                            onClick={route === 'Logout' ? handleLogout : () => {}}
                                                            component={Link}
                                                            classes={{root: classes.btnTab}}
                                                            to={route === 'Logout' ? '/' : `/${route.toLowerCase()}`}
                                                            label={<Button className={classes.register} variant='contained' color='secondary' component='span'>{route}</Button>}/>
                                                        : route === 'Home'
                                                            ? <Tab key={route} component={Link} to='/' label={route}/>
                                                            : route === 'Manage'
                                                                ? <Tab key={route} ref={manageRef} component={Link} to='/services/my'
                                                                       onMouseEnter={() => setManage(true)}
                                                                       onMouseLeave={() => setManage(false)}
                                                                       label={<ListItem><ListItemText>{route}</ListItemText><ExpandMore fontSize='small'/></ListItem>}
                                                                        />
                                                                : <Tab key={route} component={Link} to={`/${route.toLowerCase()}`} label={route}/>
                                                ))
                                            }
                                        </Tabs>
                                        </Fragment>
                                }
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
            <Popper style={{zIndex: 1302}} placement='bottom-start' open={manage} anchorEl={manageRef.current} role={undefined} transition>
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: 'right top' }}
                    >
                        <Paper square elevation={0} onMouseLeave={() => setManage(false)}>
                            <ClickAwayListener onClickAway={() => setManage(false)}>
                                <MenuList disablePadding onMouseEnter={() => setManage(true)} autoFocusItem={manage} id="menu-list-grow">
                                    <MenuItem selected={false} component={Link} to='/services/new' onClick={() => setManage(false)}>Create service</MenuItem>
                                    <MenuItem selected={false} component={Link} to='/services/my' onClick={() => setManage(false)}>My services</MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </Fragment>
    )
}

export default withRouter(Header)