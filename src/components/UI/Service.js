import React from 'react'
import Card from '@material-ui/core/Card'
import {Button, CardContent, CardHeader, CardMedia, makeStyles, Typography} from "@material-ui/core"
import Grid from "@material-ui/core/Grid"
import {Link} from "react-router-dom"

const usesStyles = makeStyles(theme => ({
    card: {
        marginTop: '2em',
        maxWidth: '25em'
    },
    cardImg: {
        maxWidth: '25em',
        maxHeight: '15em'
    },
    learnBtn: {
        backgroundColor: '#00bc1e',
        color: 'white'
    }
}))

const Service = ({service}) => {
    const classes = usesStyles()
    return (
        <Card variant='outlined' className={classes.card}>
            <CardHeader title={<Typography align='center'>{service.title}</Typography>}/>
            <CardMedia image={service.image}  className={classes.cardImg} component='img'/>
            <CardContent>
                <Typography align='center' paragraph variant='body2'>{service.description}</Typography>
                <Grid container justify='center'>
                    <Button component={Link} to={`/services/${service.id}`} classes={{root: classes.learnBtn}} variant='contained'>Learn More</Button>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default Service