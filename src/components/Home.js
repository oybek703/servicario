import React, {Fragment, useEffect} from 'react'
import {Button, Container, makeStyles, Typography} from "@material-ui/core"
import Grid from "@material-ui/core/Grid"
import worker from '../assets/images/worker.svg'
import Service from "./UI/Service"
import {useDispatch, useSelector} from "react-redux"
import {fetchServices} from "../redux/actions"
import CircularProgress from "@material-ui/core/CircularProgress"

const useStyles = makeStyles(theme => ({
    manage: {
        marginTop: '8em',
        color: theme.palette.common.dark
    },
    rounded: {
        ...theme.typography.roundedButton
    },
    dark: {
        ...theme.palette.common.dark
    },
    worker: {
        minHeight: '25em',
        minWidth: '25em'
    },
    underline: {
        maxWidth: '6em',
        minHeight: '.3em',
        backgroundColor: theme.palette.secondary.main
    },
    services: {
        backgroundColor: '#f6f6f6',
        margin: '1.5em auto',
        padding: '1.5em 0',
        borderTop: '1px solid #ddd',
        borderBottom: '1px solid #ddd'
    }
}))

const Home = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const {items, loading} = useSelector(theme => theme.services)
    useEffect(() => {
        dispatch(fetchServices())
    }, [dispatch])
    return (
        <Fragment>
            <Container>
                <Grid container alignItems='center' justify='space-evenly' className={classes.manage}>
                <Grid item>
                    <Typography variant='h3' paragraph gutterBottom>Manage, Deploy.</Typography>
                    <Typography className={classes.dark} gutterBottom paragraph>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</Typography>
                    <Button className={classes.rounded} variant='contained' color='primary'>Get Started</Button>
                </Grid>
                <Grid item className={classes.worker}>
                    <img src={worker} alt="worker" width='100%' height='100%'/>
                </Grid>
            </Grid>
            </Container>
            <Grid container direction='column' className={classes.services}>
                <Grid item>
                    <Typography align='center' variant='h3' paragraph>Great Power Comes</Typography>
                    <Typography className={classes.dark} align='center' gutterBottom paragraph>With Great Responsability</Typography>
                    <hr className={classes.underline}/>
                </Grid>
                <Grid item>
                    <Grid container justify='space-evenly'>
                        {
                            loading
                                ? <CircularProgress color='secondary'/>
                                : <Fragment>
                                    {
                                        items.map((service, index) => <Grid key={index} item><Service service={service}/></Grid>)
                                    }
                                </Fragment>
                        }

                    </Grid>
                </Grid>
            </Grid>
        </Fragment>
    )
}

export default Home