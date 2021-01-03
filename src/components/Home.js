import React from 'react'
import {Button, Container, makeStyles, Typography} from "@material-ui/core"
import Grid from "@material-ui/core/Grid"
import worker from '../assets/images/worker.svg'

const useStyles = makeStyles(theme => ({
    manage: {
        marginTop: '6em',
        color: theme.palette.common.dark
    },
    rounded: {
        ...theme.typography.roundedButton
    }
}))

const Home = () => {
    const classes = useStyles()
    return (
        <Container>
            <Grid container justify='space-evenly' className={classes.manage}>
                <Grid item>
                    <Typography variant='h3' paragraph gutterBottom>Manage, Deploy.</Typography>
                    <Typography gutterBottom paragraph>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</Typography>
                    <Button className={classes.rounded} variant='contained' color='primary'>Get Started</Button>
                </Grid>
                <Grid item>
                    <img src={worker} alt="worker" width='100%' height='100%'/>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Home