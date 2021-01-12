import React, {Fragment, useEffect} from 'react'
import {Avatar, Button, Container, makeStyles, Typography, useMediaQuery} from "@material-ui/core"
import CircularProgress from "@material-ui/core/CircularProgress"
import Alert from "./UI/Alert"
import Grid from "@material-ui/core/Grid"
import {Link} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {fetchUserCollaborations} from "../redux/actions"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import withAuth from "./hoc/withAuth"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"
import IconButton from "@material-ui/core/IconButton"
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import Reloader from "./UI/Reloader"

const useStyles = makeStyles(theme => ({
    main: {
        marginTop: '1em'
    },
    cList: {
      maxWidth: '40em'
    },
    collaboration: {
        padding: '.2em 1em'
    },
    cStatus: {
        textAlign: 'left'
    }
}))

const Collaborations = () => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const {user} = useSelector(state => state.auth)
    const {collaborations, loading, error} = useSelector(theme => theme.userCollaborations)
    const matchXS = useMediaQuery(theme => theme.breakpoints.down('xs'))
    const handleReload = () => dispatch(fetchUserCollaborations(user.uid))
    useEffect(() => {
        dispatch(fetchUserCollaborations(user.uid))
    //    eslint-disable-next-line
    }, [])
    return (
        <Container>
            <Typography variant='h5' color='primary' paragraph gutterBottom  className={classes.main} align='center'>My Collaborations</Typography>
            <Grid container justify='space-evenly'>
                {
                    loading
                        ? <CircularProgress color='secondary'/>
                        : error ? <Reloader handleReload={handleReload}/> : <Fragment>
                            {
                                !collaborations.length
                                    ? <>
                                        <Grid container>
                                            <Alert type='info' message='No collaborations created yet...' />
                                        </Grid>
                                        <Grid item>
                                            <Button variant='contained' color='secondary' component={Link} to='/services'>Create New Collaboration</Button>
                                        </Grid>
                                    </>
                                    : <List className={classes.cList} component={Grid} container direction='column'>
                                        {
                                            collaborations.map((c, index) => <Grid className={classes.collaboration} key={index} item>
                                                <Typography variant='body2'>{c.service.title}</Typography>
                                                <ListItem>
                                                    <ListItemAvatar>
                                                        <Avatar src={c.service.image} alt='service icon'/>
                                                    </ListItemAvatar>
                                                    <ListItemText classes={{root: classes.cStatus}} primary={
                                                        <Typography variant='subtitle2' color='secondary' component='span'>
                                                            pending
                                                        </Typography>}
                                                                  secondary={`replied at ${new Date(c.createdAt.seconds * 1000).toLocaleTimeString()} 
                                                                  ${new Date(c.createdAt.seconds * 1000).toLocaleDateString()}`}
                                                    />
                                                    <ListItemSecondaryAction>
                                                        {
                                                            matchXS
                                                                ? <IconButton title='Enter collaboration' size='small' component={Link} to={`/collaborations/${c.id}`}><ArrowForwardIcon/></IconButton>
                                                                : <Button component={Link} to={`/collaborations/${c.id}`} size='small' variant='contained' color='primary'>Enter</Button>
                                                        }
                                                    </ListItemSecondaryAction>
                                                </ListItem>
                                            </Grid>)
                                        }
                                    </List>
                            }
                        </Fragment>
                }

            </Grid>
        </Container>
    )
}

export default withAuth(Collaborations)