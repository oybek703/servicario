import React, {Fragment, useEffect, useState} from 'react'
import {Button, Card, Container, Fab, makeStyles, useMediaQuery} from "@material-ui/core"
import Grid from "@material-ui/core/Grid"
import CircularProgress from "@material-ui/core/CircularProgress"
import {useDispatch, useSelector} from "react-redux"
import {
    fetchCollaborationById,
    listenForChatMessagesUpdate,
    listenForMembersStatus,
    sendUserMessage, startCollaboration
} from "../redux/actions"
import Reloader from "./UI/Reloader"
import withAuth from "./hoc/withAuth"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import Avatar from "@material-ui/core/Avatar"
import ListItemText from "@material-ui/core/ListItemText"
import Badge from "@material-ui/core/Badge"
import withStyles from "@material-ui/core/styles/withStyles"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import TextField from "@material-ui/core/TextField"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Message from "./UI/Message"
import SendIcon from '@material-ui/icons/Send'
import Typography from "@material-ui/core/Typography"
import Alert from "./UI/Alert"
import IconButton from "@material-ui/core/IconButton"
import RefreshIcon from '@material-ui/icons/Refresh'
import {firestore} from "../firebase"
import {CHAT_MESSAGES_RECEIVED, MEMBERS_STATUS_UPDATED} from "../redux/types"
import Timer from "./UI/Timer"

const StyledBadge = withStyles((theme) => ({
    root: {
        width: 10,
        height: 10,
        backgroundColor: ({status}) => status === 'online' ? '#44b700' : 'crimson',
        borderRadius: '50%'
    }
}))(Badge)

const useStyles = makeStyles(theme => ({
    page: {
        marginTop: '1em'
    },
    membersArea: {
        maxHeight: '25em',
        overflowY: 'scroll',
        [theme.breakpoints.down('sm')]: {
            maxHeight: '18em'
        }
    },
    membersList: {
        minHeight: '23em'
    },
    memberUpdater: {
        position: 'sticky',
        bottom: '4%',
        left: '90%',
        backgroundColor: '#eeeeee',
        [theme.breakpoints.down('sm')]: {
            bottom: '5%',
            left: '85%'
        }
    },
    chat: {
        maxHeight: '25em',
        overflowY: 'scroll',
        backgroundColor: 'gray',
        [theme.breakpoints.down('sm')]: {
            maxHeight: '18em'
        }
    },
    chatArea: {
        minHeight: '23em',
        backgroundColor: 'gray',
        color: 'white',
        padding: '1em'
    },
    chatUpdater: {
        position: 'sticky',
        bottom: '3%',
        left: '97%',
        [theme.breakpoints.down('sm')]: {
            bottom: '5%',
            left: '90%'
        }
    },
    form: {
        width: '100%',
        padding: '.5em 0'
    },
    textField: {
        minWidth: '15em',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '.5em'
        }
    },
    startCollaboration: {
        [theme.breakpoints.down('sm')]: {
            marginBottom: '.5em'
        }
    },
    title: {
        margin: '1em auto'
    },
    cardContent: {
        padding: '0'
    },
    lastOnline: {
        fontSize: '.8em'
    }
}))

const CollaborationPage = ({match: {params: {id}}}) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const matchXS = useMediaQuery(theme => theme.breakpoints.down('xs'))
    const {collaboration, loading, error} = useSelector(state => state.collaboration)
    const { collaborationStatus, loading: startCollaborationLoading} = useSelector(state => state.activeCollaboration)
    const {user} = useSelector(state => state.auth)
    const {messageId, loading:messageLoading, chatMessages} = useSelector(state => state.sendMessage)
    const [message, setMessage] = useState('')
    const handleReload = () => dispatch(fetchCollaborationById(id))
    const handleMembersUpdate = async () => {
        const userIds = collaboration.allowedPeople.map(p => p.uid)
        const snapshot = await firestore.collection('profiles').where('uid' , 'in', userIds).get()
        const members = snapshot.docs.map(doc => doc.data())
        dispatch({type: MEMBERS_STATUS_UPDATED, payload: members})
    }
    const handleChatUpdate = async () => {
        const snapshot = await firestore.collection(`/collaborations/${collaboration.id}/messages`).get()
        const messages = snapshot.docs.map(doc => doc.data())
        dispatch({type: CHAT_MESSAGES_RECEIVED, payload: messages})
    }
    const handleSubmit = e => {
        e.preventDefault()
        dispatch(sendUserMessage(collaboration.id, message))
    }
    const handleStartCollaboration = () => dispatch(startCollaboration(id, collaboration.time))
    useEffect(() => {
        dispatch(fetchCollaborationById(id))
        dispatch(listenForMembersStatus())
        dispatch(listenForChatMessagesUpdate(id))
    //    eslint-disable-next-line
    }, [])
    useEffect(() => {
        if(messageId) {
            setMessage('')
        }
    }, [messageId])
    useEffect(() => {
        const chatArea = document.getElementById('chat-area')
        if(chatArea) {
            const chatScrollHeight = chatArea.scrollHeight
            chatArea.scrollBy(0, chatScrollHeight)
        }
    }, [chatMessages])
    return (
        <Container>
            <Grid className={classes.page} container justify='center' alignItems='center'>
                {
                    loading
                        ? <CircularProgress color='secondary'/>
                        : error
                        ? <Reloader handleReload={handleReload}/>
                        : <Container>
                            <Grid className={classes.title} component={Card} container justify='space-evenly' alignItems='center'>
                                <CardContent classes={{root: classes.cardContent}}>
                                    <ListItem component='span' disableGutters>
                                        {!matchXS && <ListItemIcon><Avatar src={collaboration.service.image}/></ListItemIcon>}
                                        <ListItemText>{collaboration.service.title}</ListItemText>
                                    </ListItem>
                                </CardContent>
                                <CardActions classes={{root: classes.cardContent}}>
                                    {collaboration.status === 'started' || collaborationStatus === 'started'
                                        ? collaboration.expiresAt && <Timer expiresAt={collaboration.expiresAt}/>
                                        : collaboration.status === 'finished' || collaborationStatus === 'finished'
                                            ? <Typography variant='h6' color='secondary'>Collaboration finished.</Typography>
                                            : <Button onClick={handleStartCollaboration} disabled={startCollaborationLoading} endIcon={startCollaborationLoading && <CircularProgress size='10px'/>} variant='contained' size='small' color='primary'>Start</Button>
                                    }
                                </CardActions>
                            </Grid>
                            <Grid container>
                                <Grid component={Card} elevation={0} item xs={3}  className={classes.membersArea}>
                                    <List component='div'>
                                        <List className={classes.membersList}>
                                            {collaboration.joinedPeople.map((m, index) => (
                                                <Fragment key={index}>
                                                <ListItem >
                                                    <ListItemAvatar>
                                                        <Fragment>
                                                        <Badge overlap="circle" anchorOrigin={{vertical: 'bottom', horizontal: 'right',}}
                                                               badgeContent={<StyledBadge variant='dot' status={m.state === 'online' ? 'online' : 'offline'}/>}>
                                                            <Avatar variant='circular' src={m.avatar}/>
                                                        </Badge>
                                                        {matchXS && <ListItemText primary={m.name} />}
                                                        </Fragment>
                                                    </ListItemAvatar>
                                                    {!matchXS && <ListItemText primary={m.name} />}
                                                </ListItem>
                                                    {m.state === 'offline' && <Typography className={classes.lastOnline} component='p' variant='body2' align='center'>{`last online at ${new Date(m.last_changed.seconds * 1000).toLocaleTimeString()}`}</Typography>}
                                                </Fragment>
                                            ))}
                                        </List>
                                        <IconButton title='Update member status' size='small' className={classes.memberUpdater} onClick={handleMembersUpdate}><Fab component='span' size='small'><RefreshIcon/></Fab></IconButton>
                                    </List>
                                </Grid>
                                <Grid  component={List} disablePadding item xs={9}  className={classes.chat} id='chat-area'>
                                    <Grid container direction='column' className={classes.chatArea}>
                                        {
                                            !chatMessages.length ? <Alert type='info' message='No any messages yet...'/> :
                                            chatMessages.sort((m1, m2) => m1.createdAt.seconds - m2.createdAt.seconds).map((m, index) => (
                                                <Grid key={index} item container justify={m.user.uid !== user.uid ? 'flex-end' : 'flex-start'}>
                                                    <Message createdAt={m.createdAt} user={m.user} msg={m.message} left={m.user.uid === user.uid}/>
                                                </Grid>
                                            ))
                                        }
                                    </Grid>
                                    <IconButton disabled={collaboration.status !== 'started'} title={collaboration.status !== 'started' ? 'Collaboration is not started' : 'Update chat status'} size='small' className={classes.chatUpdater} onClick={handleChatUpdate}><Fab disabled={collaboration.status !== 'started'} component='span' size='small'><RefreshIcon/></Fab></IconButton>
                                </Grid>
                            </Grid>
                            <Grid component={Card} square elevation={0} item className={classes.form}>
                                <form onSubmit={handleSubmit}>
                                    <Container>
                                        <Grid container alignItems='flex-start' justify='space-between'>
                                            <Grid item sm={8}>
                                                <TextField
                                                    disabled={messageLoading || collaboration.status !== 'started'}
                                                    value={message} onChange={({target: {value}}) => setMessage(value)} variant='outlined' className={classes.textField} size='small' fullWidth placeholder='Enter message'/>
                                            </Grid>
                                            <Grid item sm={4} container justify={matchXS ? 'flex-start' : 'center'}>
                                                {
                                                   <Button type='submit' variant='contained' color='primary'
                                                           disabled={messageLoading || collaboration.status !== 'started'}
                                                           endIcon={messageLoading && <CircularProgress color='secondary' size='15px'/>}><SendIcon/></Button>
                                                }
                                            </Grid>
                                        </Grid>
                                    </Container>
                                </form>
                            </Grid>
                        </Container>
                }
            </Grid>
        </Container>
    )
}

export default withAuth(CollaborationPage)