import React, {Fragment, useEffect, useState} from 'react'
import {Button, CardContent, Container, makeStyles, Typography} from "@material-ui/core"
import withAuth from "./hoc/withAuth"
import {useDispatch, useSelector} from "react-redux"
import {createNewCollaboration, fetchUserSentOffers} from "../redux/actions"
import CircularProgress from "@material-ui/core/CircularProgress"
import Grid from "@material-ui/core/Grid"
import {Link} from "react-router-dom"
import Card from "@material-ui/core/Card"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import List from "@material-ui/core/List"
import Reloader from "./UI/Reloader"
import CardActions from "@material-ui/core/CardActions"
import {firestore, Timestamp} from "../firebase"
import Report from "./UI/Report"
import Alert from "./UI/Alert"

const useStyles = makeStyles(theme => ({
    main: {
        marginTop: '1em'
    },
    card: {
        marginTop: '2em',
        maxWidth: '25em'
    },
    cardImg: {
        maxWidth: '15em',
        maxHeight: '15em',
        marginBottom: '.5em'
    },
    offerInfo: {
        marginTop: '1em',
        backgroundColor: 'gray',
        color: 'white'
    },
    pending: {
        backgroundColor: theme.palette.warning.light,
        color: 'white'
    },
    accepted: {
        backgroundColor: theme.palette.success.light,
        color: 'white'
    },
    declined: {
        backgroundColor: theme.palette.error.light,
        color: 'white'
    }
}))

const SentOffers = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [snackbar, setSnackbar] = useState(false)
    const {items, loading, error} = useSelector(state => state.sentOffers)
    const {collaborationId ,loading: collaborationLoading} = useSelector(state => state.createCollaboration)
    const {user: {uid}} = useSelector(state => state.auth)
    const handleReload = () => dispatch(fetchUserSentOffers(uid))
    const handleCollaborate = offer => {
        const newCollaboration = {
            service: {...offer.service},
            time: offer.time * 3600,
            allowedPeople: [offer.fromUser.uid, offer.toUser.uid],
            joinedPeople: [],
            toUser: offer.toUser.name,
            fromUser: offer.fromUser.name,
            fromOffer: offer.id,
            createdAt: Timestamp.fromDate(new Date()),
            status: 'pending'
        }
        const newMessage = {
            isRead: false,
            type: 'invitation',
            text: `Hello ${offer.toUser.name}, please join collaboration as soon as possible`,
            cta: `/collaborations`,
            fromUser: offer.fromUser.name,
            serviceTitle: offer.service.title,
            toUser: offer.toUser.uid,
            createdAt: Timestamp.fromDate(new Date())
        }
        dispatch(createNewCollaboration(newCollaboration, newMessage))
    }
    useEffect(() => {
        dispatch(fetchUserSentOffers(uid))
        const unsubscribeFromUpdate = firestore.collection('offers').onSnapshot(() => dispatch(fetchUserSentOffers(uid)))
        return unsubscribeFromUpdate
    //    eslint-disable-next-line
    }, [])
    useEffect(() => {
        collaborationId && setSnackbar(true)
    //    eslint-disable-next-line
    }, [collaborationLoading])
    return (
        <Container>
            <Report snackbar={snackbar} setSnackBar={setSnackbar} success message='Collaboration successfully created!'/>
            <Typography variant='h4' color='primary' className={classes.main} align='center'>Sent Offers</Typography>
            <Grid container justify='space-evenly'>
                {
                    loading
                        ? <CircularProgress color='secondary'/>
                        : error
                            ? <Reloader handleReload={handleReload}/>
                            : <Fragment>
                            {
                                !items.length
                                    ? <>
                                        <Grid container>
                                            <Alert type='info' message='You have not sent any offers yet..' />
                                        </Grid>
                                        <Grid item>
                                            <Button variant='contained' color='secondary' component={Link} to='/services'>Sent Offer</Button>
                                        </Grid>
                                    </>
                                    : items.map((offer, index) => <Grid key={index} item>
                                        <Card variant='outlined' className={classes.card}>
                                            <CardContent>
                                                <Grid container  justify='center'>
                                                    <img  className={classes.cardImg} src={offer.service.image} alt='Service icon'/>
                                                </Grid>
                                                <Typography align='center' paragraph variant='body2' gutterBottom>{offer.service.title}</Typography>
                                                <Grid container justify='center'>
                                                    <List disablePadding>
                                                        {
                                                            offer.status === 'pending'
                                                                ? <ListItem classes={{root: classes.pending}}><ListItemText disableTypography>{offer.status}</ListItemText></ListItem>
                                                                : offer.status === 'accepted'
                                                                    ? <ListItem classes={{root: classes.accepted}}><ListItemText disableTypography>{offer.status}</ListItemText></ListItem>
                                                                    : <ListItem classes={{root: classes.declined}}><ListItemText disableTypography>{offer.status}</ListItemText></ListItem>
                                                        }
                                                    </List>
                                                </Grid>
                                                <Grid container>
                                                    <List className={classes.offerInfo}>
                                                        <ListItem>To: {offer.toUser.name}</ListItem>
                                                        <ListItem>Note: {offer.note}</ListItem>
                                                        <ListItem>Price: {offer.price}$</ListItem>
                                                        <ListItem>Time: {offer.time} hours</ListItem>
                                                    </List>
                                                </Grid>
                                                <CardActions>
                                                    {
                                                        offer.status === 'accepted' && !offer.collaborationCreated &&
                                                        <Button disabled={collaborationLoading} endIcon={collaborationLoading && <CircularProgress size='20px'/>}
                                                            onClick={() => handleCollaborate(offer)} variant='contained' color='primary'>Collaborate</Button>
                                                    }
                                                </CardActions>
                                            </CardContent>
                                        </Card>
                                    </Grid>)
                            }
                        </Fragment>
                }
            </Grid>
        </Container>
    )
}

export default withAuth(SentOffers)