import React, {useEffect} from 'react'
import {Button, CardContent, CardMedia, Container, makeStyles, Typography} from "@material-ui/core"
import Card from "@material-ui/core/Card"
import Grid from "@material-ui/core/Grid"
import CircularProgress from "@material-ui/core/CircularProgress"
import {useDispatch, useSelector} from "react-redux"
import {fetchService} from "../redux/actions"

const useStyles = makeStyles(theme => ({
    page: {
        marginTop: '6em'
    }
}))

const ServicePage = ({match}) => {
    const {id} = match.params
    const classes = useStyles()
    const dispatch = useDispatch()
    const {item, loading} = useSelector(state => state.service)
    useEffect(() => {
        dispatch(fetchService(id))
    }, [id, dispatch])
    return (
        <Container>
            <Grid className={classes.page} container justify='center' alignItems='center'>
                {
                    (loading || !item) ? <CircularProgress color='secondary'/> : <Card variant='elevation'>
                        <Grid container alignItems='center'>
                            <Grid item sm>
                                <CardMedia image={item.image} component='img'/>
                            </Grid>
                            <Grid item sm>
                                <CardContent>
                                    <Typography align='center' variant='h5' gutterBottom>{item.title}</Typography>
                                    <Typography align='center' variant='body2' gutterBottom paragraph>{item.description}</Typography>
                                    <Grid container justify='center'>
                                        <Button color='primary' variant='outlined'>Learn More</Button>
                                    </Grid>
                                </CardContent>
                            </Grid>
                        </Grid>
                    </Card>
                }
            </Grid>
        </Container>
    )
}

export default ServicePage