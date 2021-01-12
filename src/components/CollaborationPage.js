import React, {useEffect} from 'react'
import {Container, makeStyles} from "@material-ui/core"
import Grid from "@material-ui/core/Grid"
import CircularProgress from "@material-ui/core/CircularProgress"
import {useDispatch, useSelector} from "react-redux"
import {fetchCollaborationById} from "../redux/actions"
import Reloader from "./UI/Reloader"
import withAuth from "./hoc/withAuth"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import Chip from "@material-ui/core/Chip"
import Avatar from "@material-ui/core/Avatar"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import ListItemText from "@material-ui/core/ListItemText"

const useStyles = makeStyles(theme => ({
    page: {
        marginTop: '6em'
    },
    statusText: {
        textAlign: 'left'
    },
    statusChip: {
        borderRadius: 0,
        fontSize: '.7em'
    }
}))

const CollaborationPage = ({match: {params: {id}}}) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const {collaboration, loading, error} = useSelector(state => state.collaboration)
    const handleReload = () => dispatch(fetchCollaborationById(id))
    console.log(collaboration)
    useEffect(() => {
        dispatch(fetchCollaborationById(id))
    }, [dispatch, id])
    return (
        <Container>
            <Grid className={classes.page} container justify='center' alignItems='center'>
                {
                    loading
                        ? <CircularProgress color='secondary'/>
                        : error
                        ? <Reloader handleReload={handleReload}/>
                        : <Container>
                            <Grid container>
                                <Grid item xs={3}>
                                    <List>
                                        {collaboration.allowedPeople.map((m, index) => (
                                            <ListItem key={index}>
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        M
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText primary='Oybek' classes={{root: classes.statusText}}
                                                              secondary={<Chip classes={{root: classes.statusChip}} component='span' size='small' label='online'/>} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Grid>
                                <Grid item xs={9}></Grid>
                            </Grid>
                        </Container>
                }
            </Grid>
        </Container>
    )
}

export default withAuth(CollaborationPage)