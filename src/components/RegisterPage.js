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
import {registerNewUser} from "../redux/actions"
import CircularProgress from "@material-ui/core/CircularProgress"
import ErrorReport from "./UI/ErrorReport"
import withoutAuth from "./hoc/withoutAuth"

const useStyles = makeStyles(theme => ({
    main: {
        marginTop: '1em'
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
    },
    file: {
        marginLeft: '1em'
    }
}))

const RegisterPage = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [snackbar, setSnackbar] = useState(false)
    const {loading, error} = useSelector(state => state.auth)
    const [formData, setFormData] = useState({name: '', email: '', avatar: '', password: '', confirmpassword: '' })
    const [nameHelperText, setNameHelperText] = useState('')
    const [emailHelperText, setEmailHelperText] = useState('')
    const [avatarHelperText, setAvatarHelperText] = useState('')
    const [passwordHelperText, setPasswordHelperText] = useState('')
    const [confirmpasswordHelperText, setConfirmPasswordHelperText] = useState('')
    const [btnDisabled, setBtnDisabled] = useState(true)
    const [showPassword, setShowPassword] = useState(false)
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)
    const handleChange = e => {
        const {name, value} = e.target
        setFormData({...formData, [name]: value})
        switch (name) {
            case 'name': value.length < 3 ? setNameHelperText('Name should be at least 3 characters long.') : setNameHelperText(''); break
            case 'email': /^\w+[\w-.]*@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/.test(value)  ? setEmailHelperText('') : setEmailHelperText('Email should be valid email address.'); break
            case 'password': value.length < 6 ? setPasswordHelperText('Password should be at least 6 characters long.') : setPasswordHelperText(''); break
            case 'confirmpassword': value === formData.password ? setConfirmPasswordHelperText('') : setConfirmPasswordHelperText('Password confirmation should match.'); break
            default: /(https?:\/\/.*\.(?:png|jpg|svg|jpeg))/.test(value) || !value ? setAvatarHelperText('') : setAvatarHelperText('Avatar should be valid image url. Accepted: png, jpg, svg, jpeg')
        }
    }
    const handleSubmit = e => {
        e.preventDefault()
        dispatch(registerNewUser(formData))
    }
    useEffect(() => {
      const btnStatus = !!formData.name && !!formData.email && !!formData.password && !!formData.confirmpassword &&
      !nameHelperText && !emailHelperText && !passwordHelperText && !confirmpasswordHelperText && !avatarHelperText && !loading
        setBtnDisabled(!btnStatus)
        // eslint-disable-next-line
    }, [formData, loading])
    useEffect(() => {
        if(error) {
            switch (error.code) {
                case 'auth/email-already-in-use': setEmailHelperText('The email address is already in use by another account.'); break
                default: setSnackbar(true)
            }
        }
    // eslint-disable-next-line
    }, [error])
    return (
        <Container>
            <ErrorReport snackbar={snackbar} setSnackBar={setSnackbar}/>
            <Grid container direction='column' alignItems='center' className={classes.main}>
                <Grid item>
                    <Typography className={classes.darkText} variant='h3' gutterBottom align='center'>Register</Typography>
                    <Typography className={classes.darkText} paragraph gutterBottom  align='center'>Please register to proceed.</Typography>
                </Grid>
                <Grid item>
                    <Card classes={{root: classes.form}} variant='outlined'>
                        <CardContent>
                            <form noValidate onSubmit={handleSubmit} autoComplete='off'>
                                <Grid container className={classes.formFields} justify='center'>
                                    <TextField error={!!nameHelperText}
                                               helperText={nameHelperText} onChange={handleChange} value={formData.name} name='name' required variant='outlined' fullWidth label='Full Name'/>
                                </Grid>
                                <Grid container className={classes.formFields} justify='center'>
                                    <TextField error={!!emailHelperText}
                                               helperText={emailHelperText} onChange={handleChange} value={formData.email} name='email' required variant='outlined' fullWidth label='Email'/>
                                </Grid>
                                <Grid container justify='flex-start' alignItems='center'>
                                    <TextField
                                        onChange={handleChange}
                                        value={formData.avatar}
                                        name='avatar' variant='outlined' fullWidth
                                        label='Avatar' placeholder='https://www.example.com/user.jpg'
                                        error={!!avatarHelperText}
                                        helperText={avatarHelperText}
                                        />
                                </Grid>
                                <Grid container className={classes.formFields} justify='center'>
                                    <TextField type={showPassword ? 'text' : 'password'}
                                               error={!!passwordHelperText}
                                               helperText={passwordHelperText} onChange={handleChange} value={formData.password}
                                               name='password'
                                               required
                                               variant='outlined'
                                               fullWidth
                                               label='Password'
                                               InputProps={{endAdornment: <IconButton onClick={() => setShowPassword(!showPassword)}>{showPassword ? <Visibility/> : <VisibilityOff/>}</IconButton>}}/>
                                </Grid>
                                <Grid container className={classes.formFields} justify='center'>
                                    <TextField type={showPasswordConfirm ? 'text' : 'password'} error={!!confirmpasswordHelperText}
                                               helperText={confirmpasswordHelperText} onChange={handleChange} value={formData.confirmpassword} name='confirmpassword' required variant='outlined' fullWidth label='Confirm Password'
                                               InputProps={{endAdornment: <IconButton onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}>{showPasswordConfirm ? <Visibility/> : <VisibilityOff/>}</IconButton>}}/>
                                </Grid>
                                <Grid container justify='center'>
                                    <Button disabled={btnDisabled} type='submit' variant='contained' fullWidth color='secondary' endIcon={loading && <CircularProgress size='20px'/>}>Register</Button>
                                </Grid>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item className={classes.formFields}>
                    <Link>Sign In With Google</Link>
                    <Typography component='span' color='primary'>{' | '}</Typography>
                    <Link>Sign In</Link>
                    <Typography component='span' color='primary'>{' | '}</Typography>
                    <Link>Need Help?</Link>
                </Grid>
            </Grid>
        </Container>
    )
}

export default withoutAuth(RegisterPage)