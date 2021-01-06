import React from 'react'
import {Button, CardContent, Container, makeStyles} from "@material-ui/core"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import Card from "@material-ui/core/Card"
import Link from "@material-ui/core/Link"

const useStyles = makeStyles(theme => ({
    darkText: {
        color: theme.palette.common.dark
    },
    formFields: {
        minWidth: '25em',
        margin: '1em auto 1.5em',
        textAlign: 'center'
    },
    form: {
        backgroundColor: 'transparent'
    }
}))

const RegisterPage = () => {
    const classes = useStyles()
    return (
        <Container>
            <Grid container direction='column' alignItems='center'>
                <Grid item>
                    <Typography className={classes.darkText} variant='h3' gutterBottom align='center'>Register</Typography>
                    <Typography className={classes.darkText} paragraph gutterBottom  align='center'>Please register to proceed.</Typography>
                </Grid>
                <Grid item>
                    <Card classes={{root: classes.form}} variant='outlined'>
                        <CardContent>
                            <form>
                        <Grid container className={classes.formFields} justify='center'>
                            <TextField variant='outlined' fullWidth label='Full Name'/>
                        </Grid>
                        <Grid container className={classes.formFields} justify='center'>
                            <TextField variant='outlined' fullWidth label='Email'/>
                        </Grid>
                        <Grid container className={classes.formFields} justify='center'>
                            <TextField variant='outlined' fullWidth label='Avatar'/>
                        </Grid>
                        <Grid container className={classes.formFields} justify='center'>
                            <TextField variant='outlined' fullWidth label='Password'/>
                        </Grid>
                        <Grid container className={classes.formFields} justify='center'>
                            <TextField variant='outlined' fullWidth label='Confirm Password'/>
                        </Grid>
                        <Grid container justify='center'>
                            <Button variant='contained' fullWidth color='primary'>Register</Button>
                        </Grid>
                    </form>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item className={classes.formFields}>
                    <Link>Sign In With Google</Link>
                    <Typography component='span' color='primary'>{' | '}</Typography>
                    <Link>Need Help?</Link>
                </Grid>
            </Grid>
        </Container>
    )
}

export default RegisterPage