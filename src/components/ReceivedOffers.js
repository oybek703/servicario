import React, {Fragment, useEffect} from 'react'
import {Button, CardContent, Container, makeStyles, Typography} from "@material-ui/core"
import withAuth from "./hoc/withAuth"
import {useDispatch, useSelector} from "react-redux"
import {fetchUserReceivedOffers, updateOffer} from "../redux/actions"
import Grid from "@material-ui/core/Grid"
import CircularProgress from "@material-ui/core/CircularProgress"
import Reloader from "./UI/Reloader"
import Card from "@material-ui/core/Card"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import CardActions from "@material-ui/core/CardActions"
import {firestore} from "../firebase"

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

const ReceivedOffers = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const {items, loading, error} = useSelector(state => state.receivedOffers)
    const {loading: updateLoading} = useSelector(state => state.updateOffer)
    const {user: {uid}} = useSelector(state => state.auth)
    const handleReload = () => dispatch(fetchUserReceivedOffers(uid))
    useEffect(() => {
        dispatch(fetchUserReceivedOffers(uid))
        const unsubScribeFromRealtimeUpdates = firestore.collection('offers').onSnapshot(() => {
            dispatch(fetchUserReceivedOffers(uid))
        })
        return unsubScribeFromRealtimeUpdates
        //    eslint-disable-next-line
    }, [])
    return (
        <Container>
            <Typography variant='h4' color='primary' paragraph gutterBottom className={classes.main} align='center'>Received Offers</Typography>
            <Grid container justify='space-evenly'>
                {
                    loading
                        ? <CircularProgress color='secondary'/>
                        : error
                        ? <Reloader handleReload={handleReload}/>
                        : <Fragment>
                            {
                                !items.length
                                    ? <Grid>
                                        <Typography paragraph gutterBottom align='center'>No offers received yet...</Typography>
                                    </Grid>
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
                                                            updateLoading
                                                                ? <CircularProgress size='20px'/>
                                                                : offer.status === 'pending' ? <ListItem classes={{root: classes.pending}}>
                                                                <ListItemText disableTypography>{offer.status}</ListItemText>
                                                            </ListItem> :
                                                            offer.status === 'accepted' ? <ListItem classes={{root: classes.accepted}}>
                                                            <ListItemText disableTypography>{offer.status}</ListItemText>
                                                            </ListItem> :
                                                            <ListItem classes={{root: classes.declined}}>
                                                                <ListItemText disableTypography>{offer.status}</ListItemText>
                                                            </ListItem>
                                                        }
                                                    </List>
                                                </Grid>
                                                <Grid container>
                                                    <List className={classes.offerInfo}>
                                                        <ListItem>From: {offer.fromUser.name}</ListItem>
                                                        <ListItem>Note: {offer.note}</ListItem>
                                                        <ListItem>Price: {offer.price} $</ListItem>
                                                        <ListItem>Time: {offer.time}</ListItem>
                                                    </List>
                                                </Grid>
                                                <CardActions>
                                                    {
                                                        offer.status === 'pending'
                                                        ? <Fragment>
                                                                <Button disabled={updateLoading}
                                                                      onClick={() => dispatch(updateOffer(offer.id, 'accepted'))} size='small' color='primary' variant='contained'>Accept</Button>
                                                                <Button disabled={updateLoading}
                                                                        className={classes.declined}
                                                                      onClick={() => dispatch(updateOffer(offer.id, 'declined'))} size='small' color='secondary' variant='contained'>Decline</Button>
                                                            </Fragment>
                                                        : null
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

export default withAuth(ReceivedOffers)