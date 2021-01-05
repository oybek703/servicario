import React from 'react'
import Card from '@material-ui/core/Card'
import {Button, CardContent, CardHeader, makeStyles, Typography} from "@material-ui/core"
import Grid from "@material-ui/core/Grid"
import {Link} from "react-router-dom"

const usesStyles = makeStyles(theme => ({
    card: {
        marginTop: '2em',
        maxWidth: '25em'
    },
    cardImg: {
        maxWidth: '15em',
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
            <Grid container  justify='center'>
                <img  className={classes.cardImg} src={service.image} alt={service.title}/>
            </Grid>
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