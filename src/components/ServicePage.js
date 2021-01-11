import React, {useEffect, useState} from 'react'
import {Button, CardContent, CardMedia, Container, makeStyles, Typography} from "@material-ui/core"
import Card from "@material-ui/core/Card"
import Grid from "@material-ui/core/Grid"
import CircularProgress from "@material-ui/core/CircularProgress"
import {useDispatch, useSelector} from "react-redux"
import {createNewOffer, fetchService} from "../redux/actions"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogContent from "@material-ui/core/DialogContent"
import TextField from "@material-ui/core/TextField"
import DialogActions from "@material-ui/core/DialogActions"
import Report from "./UI/Report"
import Reloader from "./UI/Reloader"

const useStyles = makeStyles(theme => ({
    page: {
        marginTop: '6em'
    }
}))

const ServicePage = ({match}) => {
    const {id} = match.params
    const classes = useStyles()
    const dispatch = useDispatch()
    const [snackbar, setSnackbar] =  useState(false)
    const {item, loading, error} = useSelector(state => state.service)
    const {user} = useSelector(state => state.auth)
    const {offerId, loading: offerLoading} = useSelector(state => state.createOffer)
    const [dialog, setDialog] = useState(false)
    const [formData, setFormData] = useState({note: '', hour: ''})
    const [estimatedPrice, setEstimatedPrice] = useState(0)
    const handleReload = () => dispatch(fetchService(id))
    const handleChange = ({target: {name, value}}) => {
        setFormData({...formData, [name]: value})
        if(name === 'hour') {
            const newPrice = parseInt(value, 10) * Number(item.price)
            setEstimatedPrice(!newPrice || newPrice < 0 ? 0 : newPrice)
        }

    }
    const handleClose = () => {
        setDialog(false)
        setFormData(formData => Object.keys(formData).reduce((acc, key) => {acc[key] = ''; return acc}, {}))
        setEstimatedPrice(0)
    }
    const handleSubmit = e => {
        e.preventDefault()
        const newOffer = {
            fromUser: {uid: user.uid, name: user.name},
            note: formData.note,
            price: estimatedPrice,
            service: {id, image: item.imageUrl, title: item.title},
            status: 'pending',
            time: formData.hour,
            toUser: {uid: item.user.uid, name: item.user.name}
        }
        dispatch(createNewOffer(newOffer))
    }
    useEffect(() => {
        dispatch(fetchService(id))
    }, [id, dispatch])
    useEffect(() => {
        if(offerId) {
            handleClose()
            setSnackbar(true)
        }
    //    eslint-disable-next-line
    }, [offerLoading])
    return (
        <Container>
            <Report snackbar={snackbar} setSnackBar={setSnackbar} message='Offer created successfully!' success/>
            <Grid className={classes.page} container justify='center' alignItems='center'>
                {
                    loading
                        ? <CircularProgress color='secondary'/>
                        : error
                            ? <Reloader handleReload={handleReload}/>
                            : <Card elevation={0} raised variant='elevation'>
                            <Grid container alignItems='center'>
                                <Grid item sm>
                                    <CardMedia image={item.imageUrl} component='img'/>
                                </Grid>
                                <Grid item sm>
                                    <CardContent>
                                        <Typography align='center' variant='h5' gutterBottom>{item.title}</Typography>
                                    <Typography align='center' variant='body2' gutterBottom paragraph>{item.description}</Typography>
                                    <Typography paragraph gutterBottom component='div'>
                                        <List disablePadding>
                                            <ListItem>
                                                <ListItemText component='span'>Price per hour: ${item.price}</ListItemText>
                                            </ListItem>
                                        </List>
                                    </Typography>
                                    <Grid container justify='center'>
                                        {user && user.uid === item.user.uid
                                            ? <Button title='You can not make offer to your services' disabled color='primary' variant='contained'>Make Offer</Button>
                                            : <Button disabled={!user} title='Login if you want make offer' onClick={() => setDialog(true)} color='primary' variant='contained'>Make Offer</Button>
                                        }
                                    </Grid>
                                </CardContent>
                            </Grid>
                        </Grid>
                    </Card>
                }
            </Grid>
            <Dialog maxWidth='md' open={dialog || offerLoading} onClose={() => setDialog(false)}>
                <DialogTitle>Make a deal</DialogTitle>
                <DialogContent>
                    <form autoComplete='off' onSubmit={handleSubmit}>
                        <TextField inputProps={{minLength: 5}} required name='note' value={formData.note} onChange={handleChange} size='small' helperText='Note can increase the chance of getting service' variant='outlined' fullWidth placeholder='Write your note...'/>
                        <TextField required type='number' inputProps={{min: 1, max: 20}} name='hour' value={formData.hour} onChange={handleChange} size='small' helperText='Enter time in hours' variant='outlined' fullWidth placeholder='How long do you need service for'/>
                        <List disablePadding>
                            <ListItem>
                                <ListItemText>
                                    <Typography align='center' gutterBottom>On offer acceptance {item.user && item.user.name} will charge you</Typography>
                                    <Typography align='center'>{estimatedPrice} $</Typography>
                                </ListItemText>
                            </ListItem>
                        </List>
                        <DialogActions>
                            <Button disabled={offerLoading} endIcon={offerLoading && <CircularProgress size='20px'/>} type='submit' variant='contained' color='primary'>Send Message</Button>
                            <Button disabled={offerLoading} onClick={handleClose} variant='contained'  color='secondary'>Cancel</Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </Container>
    )
}

export default ServicePage