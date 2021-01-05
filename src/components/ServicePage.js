import React, {useEffect, useState} from 'react'
import {Button, CardContent, CardMedia, Container, makeStyles, Typography} from "@material-ui/core"
import Card from "@material-ui/core/Card"
import Grid from "@material-ui/core/Grid"
import services from "../redux/store"
import CircularProgress from "@material-ui/core/CircularProgress"

const useStyles = makeStyles(theme => ({
    page: {
        marginTop: '6em'
    }
}))

const ServicePage = ({match}) => {
    const {id} = match.params
    const classes = useStyles()
    const [loading, setLoading] =  useState(true)
    const [service, setService] = useState(null)
    useEffect(() => {
        // setService(services.find(s => s.id === id))
        // setLoading(false)
    }, [])
    return (
        <Container>
            <Grid className={classes.page}>
                {
                    (loading && !service) ? <CircularProgress/> : <Card >
                        <Grid container alignItems='center'>
                            <Grid item sm>
                                <CardMedia image={service.image} component='img'/>
                            </Grid>
                            <Grid item sm>
                                <CardContent>
                                    <Typography align='center' variant='h5' gutterBottom>{service.title}</Typography>
                                    <Typography align='center' variant='body2' gutterBottom paragraph>{service.description}</Typography>
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