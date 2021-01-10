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
import {Link, withRouter} from "react-router-dom"
import Divider from "@material-ui/core/Divider"
import Tooltip from "@material-ui/core/Tooltip"
import {useDispatch, useSelector} from "react-redux"
import {logoutUser} from "../../redux/actions"
import Chip from "@material-ui/core/Chip"
import Avatar from "@material-ui/core/Avatar"
import ExpandMore from "@material-ui/icons/ExpandMore"
import Popper from "@material-ui/core/Popper"
import Paper from "@material-ui/core/Paper"
import MenuList from "@material-ui/core/MenuList"
import MenuItem from "@material-ui/core/MenuItem"
import Grow from "@material-ui/core/Grow"
import {ArrowBackIos} from "@material-ui/icons"
import ExpandLess from '@material-ui/icons/ExpandLess'
import Collapse from "@material-ui/core/Collapse"

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
        justifyContent: 'flex-end',
        alignItems: 'center',
        color: 'white',
        marginTop: '.4em'
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
    const [mobileManage, setMobileManage] = useState(false)
    const [menuSelectedIndex, setMenuSelectedIndex] = useState(0)
    const [name, setName] = useState('')
    const [avatar, setAvatar] = useState('')
    const routes = ['Home', 'Services', 'FAQ', 'Login', 'Sign Up']
    const signedUserRoutes = ['Home', 'Services', 'FAQ', 'Manage', 'Logout']
    const handleLogout = () => dispatch(logoutUser())
    const handleDropdownClose = () => setManage(false)
    useEffect(() => {
            if(user) {setName(user.name); setAvatar(user.avatar)}
            switch (pathname) {
                case '/': setTab(0); setMenuSelectedIndex(0); break
                case '/faq': setTab(2); setMenuSelectedIndex(2); break
                case '/login': setTab(3); setMenuSelectedIndex(3); break
                case '/offers/sent':
                case '/offers/received': setTab(3); setMenuSelectedIndex(3); break
                case '/register': setTab(4); setMenuSelectedIndex(4); break
                default: setTab(1); setMenuSelectedIndex(1)
            }
    }, [pathname, user])
    return (
        <Fragment>
            <ElevationScroll >
                <AppBar elevation={0} classes={{root: classes.appbar}} >
                    <Toolbar>
                        <Grid container alignItems='center' justify='space-between'>
                            <Grid item>
                                <Grid container alignItems='center'>
                                    <Typography className={classes.logo} variant='h5' component={Link} to='/'>Servicario &nbsp;</Typography>
                                    {!matchSM && user && name  && <Chip avatar={<Avatar alt={name} src={avatar}/>} label={name}/>}
                                </Grid>
                            </Grid>
                            <Grid item>
                                {matchSM
                                    ? <Fragment>
                                            {user && name && <Chip avatar={<Avatar alt={name} src={avatar}/>} label={name}/>}
                                            <IconButton onClick={() => setDrawer(!drawer)} color='secondary'><MenuIcon /></IconButton>
                                      </Fragment>
                                    : <Fragment>
                                            <Tabs value={tab}
                                                style={{borderBottom: 0 }}
                                                onChange={(event, newValue) => setTab(newValue)}>
                                                <Tab component={Link} to='/' label='Home'/>
                                                <Tab component={Link} to='/services' label='Services'/>
                                                <Tab component={Link} to='/faq' label='FAQ'/>
                                                {user && <Tab ref={manageRef} component={Link} to='/services/my'
                                                                   onMouseEnter={() => setManage(true)}
                                                                   onMouseLeave={handleDropdownClose}
                                                                   onClick={() => setTab(1)}
                                                                   label={<ListItem><ListItemText>Manage</ListItemText>
                                                                       {manage ? <ExpandLess/> : <ExpandMore/>}
                                                                   </ListItem>}/>}
                                                {user && <Tab
                                                    disableRipple
                                                    onClick={handleLogout}
                                                    component={Link}
                                                    classes={{root: classes.btnTab}}
                                                    to='/'
                                                    label={<Button className={classes.register} variant='contained' color='secondary' component='span'>Log Out</Button>}/>}
                                                }
                                                {!user && <Tab component={Link} to='/login' label='Sign In'/>}
                                                {!user && <Tab
                                                        disableRipple
                                                        onClick={handleLogout}
                                                        component={Link}
                                                        classes={{root: classes.btnTab}}
                                                        to='/register'
                                                        label={<Button className={classes.register} variant='contained' color='secondary' component='span'>Sign Up</Button>}/>}
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
            <SwipeableDrawer
                onClose={() => {setDrawer(false); setMobileManage(false)}}
                onOpen={() => setDrawer(true)}
                open={drawer}
                anchor='left'>
                <div className={classes.drawerMenu}>
                    <Typography color='primary' variant='h5'>Servicario </Typography>
                    <Tooltip title='Close'>
                        <IconButton onClick={() => setDrawer(false)}>
                            <ArrowBackIos color='primary'/>
                        </IconButton>
                    </Tooltip>
                    <Divider/>
                </div>
                <Divider/>
                <List disablePadding>
                    {
                        (user ? signedUserRoutes : routes).map((route, index) => (
                            route === 'Sign Up' || route === 'Logout'
                                ? <ListItem
                                    key={route}
                                    selected={index === menuSelectedIndex}
                                    classes={{root: classes.listItemBtn}}
                                    onClick={() => {setDrawer(false); if(route === 'Logout') handleLogout()}}
                                    component={Link}
                                    to={route === 'Logout' ? '/' : '/register'}>
                                    <Button component='span' variant='contained' color='secondary' className={`${classes.register} ${classes.menuRegister}`}>
                                        <ListItemText>{route}</ListItemText>
                                    </Button>
                                </ListItem>
                                : route === 'Manage'
                                ? <Fragment key={route}>
                                    <ListItem
                                        selected={index === menuSelectedIndex}
                                        classes={{root: classes.listItem}}
                                        onClick={() => {setMobileManage(!mobileManage)}}>
                                        <ListItemText>{route}</ListItemText>
                                        {mobileManage ? <ExpandLess/> : <ExpandMore/>}
                                    </ListItem>
                                    <Collapse in={mobileManage} unmountOnExit>
                                        <List disablePadding>
                                            <ListItem onClick={() => {setDrawer(false); setMobileManage(false)}} component={Link} to='/services/new'><ListItemText>Create service</ListItemText></ListItem>
                                            <ListItem onClick={() => {setDrawer(false); setMobileManage(false)}} component={Link} to='/services/my'><ListItemText>My services</ListItemText></ListItem>
                                            <ListItem onClick={() => {setDrawer(false); setMobileManage(false)}} component={Link} to='/offers/sent'><ListItemText>Sent Offers</ListItemText></ListItem>
                                            <ListItem onClick={() => {setDrawer(false); setMobileManage(false)}} component={Link} to='/offers/received'><ListItemText>Received Offers</ListItemText></ListItem>
                                        </List>
                                    </Collapse>
                                </Fragment>
                                :
                                <ListItem
                                    key={route}
                                    selected={index === menuSelectedIndex}
                                    classes={{root: classes.listItem}}
                                    onClick={() => {setDrawer(false)}}
                                    component={Link}
                                    to={route === 'Home' ? '/' : `/${route.toLowerCase()}`}>
                                    <ListItemText>{route}</ListItemText>
                                </ListItem>
                        ))
                    }
                </List>
            </SwipeableDrawer>
            <Popper style={{zIndex: 1302}} open={manage} anchorEl={manageRef.current} role={undefined} transition>
                {({ TransitionProps }) => (
                    <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: 'right top' }}
                    >
                        <Paper square elevation={0}>
                            <MenuList classes={{root: classes.menu}} disablePadding onMouseLeave={handleDropdownClose} onMouseEnter={() => setManage(true)} autoFocusItem={manage} id="menu-list-grow">
                                <MenuItem component={Link} to='/services/new' onClick={handleDropdownClose}>Create service</MenuItem>
                                <MenuItem component={Link} to='/services/my' onClick={handleDropdownClose}>My services</MenuItem>
                                <MenuItem component={Link} to='/offers/sent' onClick={handleDropdownClose}>Sent Offers</MenuItem>
                                <MenuItem component={Link} to='/offers/received' onClick={handleDropdownClose}>Received Offers</MenuItem>
                            </MenuList>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </Fragment>
    )
}

export default withRouter(Header)