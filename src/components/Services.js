import React, {Fragment, useEffect} from 'react'
import {Button, Container, makeStyles} from "@material-ui/core"
import CircularProgress from "@material-ui/core/CircularProgress"
import Alert from "./UI/Alert"
import Grid from "@material-ui/core/Grid"
import {Link} from "react-router-dom"
import Service from "./UI/Service"
import {useDispatch, useSelector} from "react-redux"
import {fetchServices} from "../redux/actions"

const useStyles = makeStyles(theme => ({
    main: {
        marginTop: '3em'
    }
}))

const Services = () => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const {items, loading, error} = useSelector(theme => theme.services)
    useEffect(() => {
        dispatch(fetchServices())
    }, [dispatch])
    return (
        <Container>
            <Grid container justify='space-evenly' className={classes.main}>
                {
                    loading
                        ? <CircularProgress color='secondary'/>
                        : error ? <Alert/> : <Fragment>
                            {
                                !items.length
                                    ? <>
                                        <Grid container>
                                            <Alert type='info' message='No services created yet...' />
                                        </Grid>
                                        <Grid item>
                                            <Button variant='contained' color='secondary' component={Link} to='/services/new'>Create New Service</Button>
                                        </Grid>
                                    </>
                                    : items.map((service, index) => <Grid key={index} item><Service service={service}/></Grid>)
                            }
                        </Fragment>
                }

            </Grid>
        </Container>
    )
}

export default Services