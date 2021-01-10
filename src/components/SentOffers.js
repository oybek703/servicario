import React, {Fragment, useEffect} from 'react'
import {Button, CardContent, Container, makeStyles, Typography} from "@material-ui/core"
import withAuth from "./hoc/withAuth"
import {useDispatch, useSelector} from "react-redux"
import {fetchUserSentOffers} from "../redux/actions"
import CircularProgress from "@material-ui/core/CircularProgress"
import Grid from "@material-ui/core/Grid"
import {Link} from "react-router-dom"
import Card from "@material-ui/core/Card"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import List from "@material-ui/core/List"
import Reloader from "./UI/Reloader"
import CardActions from "@material-ui/core/CardActions"

const useStyles = makeStyles(theme => ({
    main: {
        marginTop: '3em'
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
    }
}))

const SentOffers = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const {items, loading, error} = useSelector(state => state.sentOffers)
    const {user: {uid}} = useSelector(state => state.auth)
    const handleReload = () => dispatch(fetchUserSentOffers(uid))
    useEffect(() => {
        dispatch(fetchUserSentOffers(uid))
    //    eslint-disable-next-line
    }, [])
    return (
        <Container>
            <Grid container justify='space-evenly' className={classes.main}>
                {
                    loading
                        ? <CircularProgress color='secondary'/>
                        : error
                            ? <Reloader handleReload={handleReload}/>
                            : <Fragment>
                            {
                                !items.length
                                    ? <Grid>
                                        <Typography paragraph gutterBottom align='center'>No services offered yet...</Typography>
                                        <Button variant='contained' color='secondary' component={Link} to='/services'>Offer Service</Button>
                                    </Grid>
                                    : items.map((offer, index) => <Grid key={index} item>
                                        <Card variant='outlined' className={classes.card}>
                                            <CardContent>
                                                <Grid container  justify='center'>
                                                    <img  className={classes.cardImg} src={offer.serviceImage} alt='Service icon'/>
                                                </Grid>
                                                <Typography align='center' paragraph variant='body2' gutterBottom>{offer.note}</Typography>
                                                <Grid container justify='center'>
                                                    <List disablePadding>
                                                    <ListItem>
                                                        <ListItemText disableTypography>{offer.status}</ListItemText>
                                                    </ListItem>
                                                    </List>
                                                </Grid>
                                                <Grid container>
                                                    <List className={classes.offerInfo}>
                                                        <ListItem>From: {offer.fromUser.name}</ListItem>
                                                        <ListItem>Note: {offer.note}</ListItem>
                                                        <ListItem>Price: {offer.price}$</ListItem>
                                                        <ListItem>Time: {offer.time}</ListItem>
                                                    </List>
                                                </Grid>
                                                <CardActions>
                                                    <Button size='small' color='primary' variant='contained'>Accept</Button>
                                                    <Button size='small' color='secondary' variant='contained'>Decline</Button>
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