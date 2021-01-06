import React, {useState} from 'react'
import {Button, CardContent, Container, IconButton, makeStyles} from "@material-ui/core"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import Card from "@material-ui/core/Card"
import Link from "@material-ui/core/Link"
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

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
    const [formData, setFormData] = useState({name: '', email: '', avatar: '', password: '', confirmpassword: '' })
    const [formValidity, setFormValidity] = useState({name: true, email: true, password: true, confirmpassword: true })
    const [filename, setFilename] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [disabled, setDisabled] = useState(true)
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)
    const handleChange = e => {
        const {name, value, files} = e.target
        setFilename(filename => files ? files[0].name : filename)
        setFormData({...formData, [name]: value})
        switch (name) {
            case 'name': setFormValidity({...formValidity, name: value.length >= 3 && !!value}); break
            case 'email': setFormValidity({...formValidity, email: /^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/.test(value)}); break
            case 'password': setFormValidity({...formValidity, password: value.length >= 6 && !!value}); break
            case 'confirmpassword': setFormValidity({...formValidity, confirmpassword: formData.password === value}); break
            default: setFormValidity(formValidity => formValidity)
        }
    }
    const handleSubmit = e => {
        e.preventDefault()
        console.log(Object.values(formValidity).filter(t => t))
    }
    return (
        <Container>
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
                                    <TextField error={!formValidity.name}
                                               helperText={!formValidity.name && 'Name must have at least 3 characters.'} onChange={handleChange} value={formData.name} name='name' required variant='outlined' fullWidth label='Full Name'/>
                                </Grid>
                                <Grid container className={classes.formFields} justify='center'>
                                    <TextField error={!formValidity.email}
                                               helperText={!formValidity.email && 'Email must be valid email address.'} onChange={handleChange} value={formData.email} name='email' required variant='outlined' fullWidth label='Email'/>
                                </Grid>
                                <Grid container justify='flex-start' alignItems='center'>
                                    <Button variant="contained" color='primary' component="label">
                                        Upload file
                                        <input accept='.png, .jpg, .svg, .gif' name='avatar' value={formData.avatar} onChange={handleChange} type="file" hidden/>
                                    </Button>
                                    <Typography className={classes.file}>{filename || 'No file chosen'}</Typography>
                                </Grid>
                                <Grid container className={classes.formFields} justify='center'>
                                    <TextField type={showPassword ? 'text' : 'password'}
                                               error={!formValidity.password}
                                               helperText={!formValidity.password && 'Password must be at least 6 characters long.'} onChange={handleChange} value={formData.password}
                                               name='password'
                                               required
                                               variant='outlined'
                                               fullWidth
                                               label='Password'
                                               InputProps={{endAdornment: <IconButton onClick={() => setShowPassword(!showPassword)}>{showPassword ? <Visibility/> : <VisibilityOff/>}</IconButton>}}/>
                                </Grid>
                                <Grid container className={classes.formFields} justify='center'>
                                    <TextField type={showPasswordConfirm ? 'text' : 'password'} error={!formValidity.confirmpassword}
                                               helperText={!formValidity.confirmpassword && 'Password confirmation should match.'} onChange={handleChange} value={formData.confirmpassword} name='confirmpassword' required variant='outlined' fullWidth label='Confirm Password'
                                               InputProps={{endAdornment: <IconButton onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}>{showPasswordConfirm ? <Visibility/> : <VisibilityOff/>}</IconButton>}}/>
                                </Grid>
                                <Grid container justify='center'>
                                    <Button disabled={disabled} type='submit' variant='contained' fullWidth color='secondary'>Register</Button>
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

export default RegisterPage