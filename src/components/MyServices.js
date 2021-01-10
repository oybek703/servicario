import React, {Fragment, useEffect} from 'react'
import withAuthorization from "./hoc/withAuth"
import Grid from "@material-ui/core/Grid"
import CircularProgress from "@material-ui/core/CircularProgress"
import {Button, Container, makeStyles, Typography} from "@material-ui/core"
import {Link} from "react-router-dom"
import Service from "./UI/Service"
import {useDispatch, useSelector} from "react-redux"
import {fetchUserServices} from "../redux/actions"
import Reloader from "./UI/Reloader"

const useStyles = makeStyles(theme => ({
    main: {
        marginTop: '3em'
    }
}))

const MyServices = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const {items, loading, error} = useSelector(state => state.userServices)
    const {user: {uid}} = useSelector(state => state.auth)
    const handleReload = () => dispatch(fetchUserServices(uid))
    useEffect(() => {
        dispatch(fetchUserServices(uid))
    //  eslint-disable-next-line
    }, [])
    return (
        <Container>
            <Grid container justify='space-evenly' className={classes.main}>
                {
                    loading
                        ? <CircularProgress color='secondary'/>
                        : error
                        ?  <Reloader handleReload={handleReload}/>
                         : <Fragment>
                            {
                                !items.length
                                    ? <Grid>
                                        <Typography paragraph gutterBottom align='center'>You have not created any services yet...</Typography>
                                        <Button variant='contained' color='secondary' component={Link} to='/services/new'>Create New Service</Button>
                                    </Grid>
                                    : items.map((service, index) => <Grid key={index} item><Service service={service}/></Grid>)
                            }
                        </Fragment>
                }

            </Grid>
        </Container>
    )
}

export default withAuthorization(MyServices)