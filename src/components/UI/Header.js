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
import {listenForMessageUpdates, logoutUser, markMessageAsRead} from "../../redux/actions"
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
import Badge from "@material-ui/core/Badge"
import MailIcon from '@material-ui/icons/Mail'
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import ClickAwayListener from "@material-ui/core/ClickAwayListener"
import CircularProgress from "@material-ui/core/CircularProgress"
import Alert from "./Alert"

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
    },
    messages: {
        maxWidth: '5em',
        marginLeft: '-2em'
    },
    messagesContainer: {
        maxWidth: '12em',
        maxHeight: '12em',
        overflowX: 'hidden',
        overflowY: 'scroll'
    }
}))

const Header = (props) => {
    const {location: {pathname}, history} = props
    const classes = useStyles()
    const matchSM = useMediaQuery(theme => theme.breakpoints.down('sm'))
    const dispatch = useDispatch()
    const {user} = useSelector(state => state.auth)
    const {messages} = useSelector(state => state.userMessages)
    const {loading: markAsReadLoading} = useSelector(state => state.markAsRead)
    const manageRef = useRef(null)
    const messagesRef = useRef(null)
    const [tab, setTab] = useState(0)
    const [drawer, setDrawer] = useState(false)
    const [manage, setManage] = useState(false)
    const [message, setMessage] = useState(false)
    const [mobileManage, setMobileManage] = useState(false)
    const [menuSelectedIndex, setMenuSelectedIndex] = useState(0)
    const [name, setName] = useState('')
    const [avatar, setAvatar] = useState('')
    const routes = ['Home', 'Services', 'FAQ', 'Login', 'Sign Up']
    const signedUserRoutes = ['Home', 'Services', 'FAQ', 'Manage', 'Logout']
    const handleLogout = () => dispatch(logoutUser())
    const handleDropdownClose = () => {
        setManage(false)
        setMessage(false)
    }
    const handleMarkAsRead = (messageId, cta = null) => {
        setMessage(false)
        dispatch(markMessageAsRead(user.uid, messageId))
        if(cta) {
            history.push(cta)
        }
    }
    useEffect(() => {
            if(user) {setName(user.name); setAvatar(user.avatar)}
            switch (pathname) {
                case '/': setTab(0); setMenuSelectedIndex(0); break
                case '/faq': setTab(2); setMenuSelectedIndex(2); break
                case '/login': setTab(3); setMenuSelectedIndex(3); break
                case '/offers/sent':
                case '/collaborations':
                case '/offers/received': setTab(3); setMenuSelectedIndex(3); break
                case '/register': setTab(4); setMenuSelectedIndex(4); break
                default: setTab(1); setMenuSelectedIndex(1)
            }
    }, [pathname, user])
    useEffect(() => {
        user && dispatch(listenForMessageUpdates(user.uid))
    //    eslint-disable-next-line
    }, [user])
    return (
        <Fragment>
            <ElevationScroll >
                <AppBar elevation={0} classes={{root: classes.appbar}} >
                    <Toolbar>
                        <Grid container alignItems='center' justify='space-between'>
                            <Grid item>
                                <Grid container alignItems='center'>
                                    <Typography className={classes.logo} variant='h5' component={Link} to='/'>Servicario &nbsp;</Typography>
                                    {matchSM && user && messages.length !== 0 &&
                                    <ClickAwayListener onClickAway={handleDropdownClose}>
                                        <Badge title='Click to read new messages' ref={matchSM && messagesRef} onClick={() => setMessage(!message)} badgeContent={messages.length} color="primary"><MailIcon /></Badge>
                                    </ClickAwayListener>
                                    }
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
                                                TabIndicatorProps={{style: {display: 'none'}}}
                                                style={{borderBottom: 0 }}
                                                onChange={(event, newValue) => setTab(newValue === 5 ? 4 : newValue)}>
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
                                                {user &&
                                                <Tab classes={{wrapper: classes.messages}}
                                                     ref={messagesRef}
                                                     onMouseEnter={() => setMessage(true)}
                                                     onMouseLeave={handleDropdownClose}
                                                    label={<Badge badgeContent={messages.length} color="primary"><MailIcon /></Badge>}
                                                />
                                                }
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
                                            <ListItem onClick={() => {setDrawer(false); setMobileManage(false)}} component={Link} to='/collaborations'><ListItemText>My Collaborations</ListItemText></ListItem>
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
            {user && <Popper style={{zIndex: 1302}} open={manage} anchorEl={manageRef.current} role={undefined} transition>
                {({ TransitionProps }) => (
                    <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: 'right top' }}
                    >
                        <Paper square elevation={0}>
                            <MenuList classes={{root: classes.menu}} disablePadding onMouseLeave={handleDropdownClose} onMouseEnter={() => setManage(true)} autoFocusItem={manage} id="menu-list-grow">
                                <MenuItem selected={pathname === '/services/new'} component={Link} to='/services/new' onClick={handleDropdownClose}>Create service</MenuItem>
                                <MenuItem selected={pathname === '/services/my'} component={Link} to='/services/my' onClick={handleDropdownClose}>My services</MenuItem>
                                <MenuItem selected={pathname === '/offers/sent'} component={Link} to='/offers/sent' onClick={handleDropdownClose}>Sent Offers</MenuItem>
                                <MenuItem selected={pathname === '/offers/received'} component={Link} to='/offers/received' onClick={handleDropdownClose}>Received Offers</MenuItem>
                                <MenuItem selected={pathname === '/collaborations'} component={Link} to='/collaborations' onClick={handleDropdownClose}>My Collaborations</MenuItem>
                            </MenuList>
                        </Paper>
                    </Grow>
                )}
            </Popper>}
            {user && <Popper style={{zIndex: 1302}} open={message || markAsReadLoading} placement='bottom-start' anchorEl={messagesRef.current} role={undefined} transition>
                {({ TransitionProps }) => (
                    <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: 'right top' }}
                    >
                        <Paper square elevation={0} onMouseEnter={() => setMessage(true)}>
                            <ClickAwayListener onClickAway={handleDropdownClose}>
                                {
                                    !messages.length
                                        ? <Grid onMouseLeave={() => setMessage(false)}>
                                            {markAsReadLoading ? <Alert type='info' message='Loading...'/> : <Alert type='success' message='No unread messages yet (:'/>}
                                        </Grid>
                                        : <Grid container className={classes.messagesContainer}>
                                            {messages.filter(m => !m.isRead).map((message, index) => (<Grid item key={index}>
                                                <Card>
                                                    <List disablePadding>
                                                        <ListItem>
                                                            <ListItemText>From: &nbsp; {message.fromUser}</ListItemText>
                                                        </ListItem>
                                                    </List>
                                                    <CardContent>
                                                        <Typography variant='subtitle2' paragraph gutterBottom>{message.text}</Typography>
                                                    </CardContent>
                                                    <CardActions>
                                                        <Button onClick={() => handleMarkAsRead(message.id, message.cta)} variant='contained' size='small' color='primary'>Join</Button>
                                                        <Button disabled={markAsReadLoading} endIcon={markAsReadLoading && <CircularProgress size='15px'/>}
                                                                onClick={() => handleMarkAsRead(message.id)} variant='contained' size='small' color='secondary'>Later</Button>
                                                    </CardActions>
                                                </Card>
                                            </Grid>))}
                                        </Grid>
                                }
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>}
        </Fragment>
    )
}

export default withRouter(Header)