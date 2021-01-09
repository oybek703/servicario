import React, {useEffect} from 'react'
import {Button, CardContent, CardMedia, Container, makeStyles, Typography} from "@material-ui/core"
import Card from "@material-ui/core/Card"
import Grid from "@material-ui/core/Grid"
import CircularProgress from "@material-ui/core/CircularProgress"
import {useDispatch, useSelector} from "react-redux"
import {fetchService} from "../redux/actions"
import Alert from "./UI/Alert"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"

const useStyles = makeStyles(theme => ({
    page: {
        marginTop: '6em'
    }
}))

const ServicePage = ({match}) => {
    const {id} = match.params
    const classes = useStyles()
    const dispatch = useDispatch()
    const {item, loading, error} = useSelector(state => state.service)
    const handleReload = () => dispatch(fetchService(id))
    useEffect(() => {
        dispatch(fetchService(id))
    }, [id, dispatch])
    return (
        <Container>
            <Grid className={classes.page} container justify='center' alignItems='center'>
                {
                    loading
                        ? <CircularProgress color='secondary'/>
                        : error
                            ? <Grid container alignItems='center' direction='column'>
                                <Grid item>
                                    <Alert/>
                                </Grid>
                                <Grid item>
                                    <Button variant='contained' color='primary' onClick={handleReload} disabled={loading}>Reload</Button>
                                </Grid>
                              </Grid>
                            : <Card elevation={0} raised variant='elevation'>
                            <Grid container alignItems='center'>
                                <Grid item sm>
                                    <CardMedia image={item.imageUrl} component='img'/>
                                </Grid>
                                <Grid item sm>
                                    <CardContent>
                                        <Typography align='center' variant='h5' gutterBottom>{item.title}</Typography>
                                    <Typography align='center' variant='body2' gutterBottom paragraph>{item.description}</Typography>
                                    <Typography paragraph gutterBottom>
                                        <List disablePadding>
                                            <ListItem>
                                                <ListItemText component='span'>Price per hour: ${item.price}</ListItemText>
                                            </ListItem>
                                        </List>
                                    </Typography>
                                    <Grid container justify='center'>
                                        <Button color='primary' variant='contained'>Make Offer</Button>
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