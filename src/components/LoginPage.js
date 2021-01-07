import React, {useEffect, useState} from 'react'
import {Button, CardContent, Container, IconButton, makeStyles} from "@material-ui/core"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import Card from "@material-ui/core/Card"
import Link from "@material-ui/core/Link"
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import {useDispatch, useSelector} from "react-redux"
import CircularProgress from "@material-ui/core/CircularProgress"
import {Redirect} from "react-router-dom"
import {signInUser} from "../redux/actions"
import ErrorReport from "./UI/ErrorReport"

const useStyles = makeStyles(theme => ({
    main: {
        marginTop: '2em'
    },
    darkText: {
        color: theme.palette.common.dark
    },
    formFields: {
        minWidth: '25em',
        margin: '1em auto 1.5em',
        textAlign: 'center',
        [theme.breakpoints.down('sm')]: {
            minWidth: '20em'
        }
    },
    form: {
        backgroundColor: 'transparent'
    }
}))

const LoginPage = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [snackbar, setSnackBar] = useState(false)
    const {loading, user, error} = useSelector(state => state.auth)
    const [formData, setFormData] = useState({email: '', password: ''})
    const [emailHelperText, setEmailHelperText] = useState('')
    const [passwordHelperText, setPasswordHelperText] = useState('')
    const [btnDisabled, setBtnDisabled] = useState(true)
    const [showPassword, setShowPassword] = useState(false)

    const handleChange = e => {
        const {name, value} = e.target
        setFormData({...formData, [name]: value})
        switch (name) {
            case 'email': /^\w+[\w-.]*@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/.test(value) ? setEmailHelperText('') : setEmailHelperText("Email address should be valid."); break
            case 'password': value.length >= 6 ? setPasswordHelperText('') : setPasswordHelperText("Password should contain at least 6 characters."); break
            default: return
        }
    }

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(signInUser(formData))
    }

    useEffect(() => {
        const btnStatus = !!formData.email && !!formData.password && !emailHelperText && !passwordHelperText && !loading
        setBtnDisabled(!btnStatus)
    //    eslint-disable-next-line
    }, [formData, loading])

    useEffect(() => {
        if(error) {
            switch (error.code) {
                case 'auth/user-not-found': setEmailHelperText('User email not found or deleted.'); break
                case 'auth/wrong-password': setPasswordHelperText('Invalid user password.'); break
                default: setSnackBar(true)
            }
        }
    }, [error])

    if(user) {
        return <Redirect to='/'/>
    }

    return (
        <Container>
            <ErrorReport snackbar={snackbar} setSnackBar={setSnackBar}/>
            <Grid container direction='column' alignItems='center' className={classes.main}>
                <Grid item>
                    <Typography className={classes.darkText} variant='h3' gutterBottom align='center'>Login</Typography>
                    <Typography className={classes.darkText} paragraph gutterBottom  align='center'>Please login to proceed.</Typography>
                </Grid>
                <Grid item>
                    <Card classes={{root: classes.form}} variant='outlined'>
                        <CardContent>
                            <form onSubmit={handleSubmit} autoComplete='off'>
                                <Grid container className={classes.formFields} justify='center'>
                                    <TextField error={!!emailHelperText} helperText={emailHelperText} name='email' value={formData.email} onChange={handleChange} variant='outlined' fullWidth label='Email'/>
                                </Grid>
                                <Grid container className={classes.formFields} justify='center'>
                                    <TextField type={showPassword ? 'text' : 'password'}
                                               error={!!passwordHelperText} helperText={passwordHelperText} name='password' value={formData.password} onChange={handleChange} variant='outlined' fullWidth label='Password'
                                               InputProps={{endAdornment: <IconButton onClick={() => setShowPassword(!showPassword)}>{showPassword ? <Visibility/> : <VisibilityOff/>}</IconButton>}}/>
                                </Grid>
                                <Grid container justify='center'>
                                    <Button type='submit' disabled={btnDisabled} variant='contained' fullWidth color='primary'
                                            endIcon={loading && <CircularProgress size='20px'/>}>
                                        Sign In
                                    </Button>
                                </Grid>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item className={classes.formFields}>
                    <Link>Sign In With Google</Link>
                    <Typography component='span' color='primary'>{' | '}</Typography>
                    <Link>Sign Up</Link>
                    <Typography component='span' color='primary'>{' | '}</Typography>
                    <Link>Need Help?</Link>
                </Grid>
            </Grid>
        </Container>
    )
}

export default LoginPage