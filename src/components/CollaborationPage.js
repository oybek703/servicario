import React, {useEffect} from 'react'
import {Button, Card, Container, makeStyles, useMediaQuery} from "@material-ui/core"
import Grid from "@material-ui/core/Grid"
import CircularProgress from "@material-ui/core/CircularProgress"
import {useDispatch, useSelector} from "react-redux"
import {fetchCollaborationById} from "../redux/actions"
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
        minHeight: '50em'
    },
    chat: {
        maxHeight: '25em',
        overflowY: 'scroll',
        [theme.breakpoints.down('sm')]: {
            maxHeight: '18em'
        }
    },
    chatArea: {
        minHeight: '40em',
        backgroundColor: 'gray',
        color: 'white',
        padding: '1em'
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
    }
}))

const CollaborationPage = ({match: {params: {id}}}) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const matchXS = useMediaQuery(theme => theme.breakpoints.down('xs'))
    const {collaboration, loading, error} = useSelector(state => state.collaboration)
    const handleReload = () => dispatch(fetchCollaborationById(id))
    // console.log(collaboration)
    useEffect(() => {
        dispatch(fetchCollaborationById(id))
    }, [dispatch, id])
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
                                    <Button variant='contained' size='small' color='primary'>Start</Button>
                                </CardActions>
                            </Grid>
                            <Grid container>
                                <Grid component={Card} elevation={0} item xs={3}  className={classes.membersArea}>
                                    <List className={classes.membersList}>
                                        {collaboration.allowedPeople.map((m, index) => (
                                            <ListItem key={index}>
                                                <ListItemAvatar>
                                                    <Badge overlap="circle" anchorOrigin={{vertical: 'bottom', horizontal: 'right',}}
                                                           badgeContent={<StyledBadge variant='dot' status='online'/>}>
                                                        <Avatar variant='circular' src={m.avatar}/>
                                                    </Badge>
                                                    {matchXS && <ListItemText primary={m.name}/>}
                                                </ListItemAvatar>
                                                {!matchXS && <ListItemText primary={m.name}/>}
                                            </ListItem>
                                        ))}
                                    </List>
                                </Grid>
                                <Grid  component={List} disablePadding item xs={9}  className={classes.chat}>
                                    <Grid container direction='column' className={classes.chatArea}>
                                        {
                                            ['Hello firebase!', 'Hello User', 'How are you?', 'I am fine thanks.', 'Can you teach me React?', 'Yes, of course.'].map((m, index) => (
                                                <Grid key={index} item container justify={index % 2 !== 0 && 'flex-end'}>
                                                    <Message msg={m} left={index % 2 === 0}/>
                                                </Grid>
                                            ))
                                        }
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid component={Card} square elevation={0} item className={classes.form}>
                                <form>
                                    <Container>
                                        <Grid container alignItems='flex-start' justify='space-between'>
                                            <Grid item sm={8}>
                                                <TextField variant='outlined' className={classes.textField} size='small' fullWidth placeholder='Enter message'/>
                                            </Grid>
                                            <Grid item sm={4} container justify={matchXS ? 'flex-start' : 'center'}>
                                                <Button variant='contained' color='secondary'>Send</Button>
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