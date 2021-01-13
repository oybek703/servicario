import React, {useEffect} from 'react'
import {Button, Card, Container, makeStyles, useMediaQuery} from "@material-ui/core"
import Grid from "@material-ui/core/Grid"
import CircularProgress from "@material-ui/core/CircularProgress"
import {useDispatch, useSelector} from "react-redux"
import {fetchCollaborationById} from "../redux/actions"
import Reloader from "./UI/Reloader"
import withAuth from "./hoc/withAuth"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import Avatar from "@material-ui/core/Avatar"
import ListItemText from "@material-ui/core/ListItemText"
import Divider from "@material-ui/core/Divider"
import Badge from "@material-ui/core/Badge"
import withStyles from "@material-ui/core/styles/withStyles"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import TextField from "@material-ui/core/TextField"

const StyledBadge = withStyles((theme) => ({
    root: {
        width: 10,
        height: 10,
        backgroundColor: ({status}) => status === 'online' ? '#44b700' : 'crimson',
        borderRadius: '50%'
    }
}))(Badge)

const useStyles = makeStyles(theme => ({
    page: {
        marginTop: '3em'
    },
    membersArea: {
        maxHeight: '39em',
        overflowY: 'scroll',
        [theme.breakpoints.down('sm')]: {
            maxHeight: '35em'
        }
    },
    membersList: {
        minHeight: '50em'
    },
    chat: {
        maxHeight: '31em',
        overflowY: 'scroll',
        [theme.breakpoints.down('sm')]: {
            maxHeight: '20em'
        }
    },
    chatArea: {
        minHeight: '40em',
        backgroundColor: 'grey',
        color: 'white'
    },
    form: {
        width: '100%',
        padding: '.5em 0'
    },
    textField: {
        maxWidth: '15em',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '.5em'
        }
    },
    startCollaboration: {
        [theme.breakpoints.down('sm')]: {
            marginBottom: '.5em'
        }
    }
}))

const CollaborationPage = ({match: {params: {id}}}) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const matchXS = useMediaQuery(theme => theme.breakpoints.down('xs'))
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
                                <Grid component={Card} elevation={0} item xs={3}  className={classes.membersArea}>
                                    <List className={classes.membersList}>
                                        {collaboration.allowedPeople.map((m, index) => (
                                            <ListItem key={index}>
                                                <ListItemAvatar>
                                                    <Badge overlap="circle" anchorOrigin={{vertical: 'bottom', horizontal: 'right',}}
                                                           badgeContent={<StyledBadge variant='dot' status='offline'/>}>
                                                        <Avatar variant='circular' src={m.avatar}/>
                                                    </Badge>
                                                    {matchXS && <ListItemText primary={m.name}/>}
                                                </ListItemAvatar>
                                                {!matchXS && <ListItemText primary={m.name}/>}
                                            </ListItem>
                                        ))}
                                    </List>
                                </Grid>
                                <Grid  component={List} disablePadding item xs={9}>
                                    <Grid container direction='column'>
                                        <Grid item container justify='space-evenly' alignItems='center'>
                                            <Grid item component={List}>
                                                <ListItem component='span' disableGutters>
                                                    <ListItemIcon><Avatar src={collaboration.service.image}/></ListItemIcon>
                                                    <ListItemText>{collaboration.service.title}</ListItemText>
                                                </ListItem>
                                            </Grid>
                                            <Grid item className={classes.startCollaboration}>
                                                <Button variant='contained' size='small' color='primary'>Start Collaboration</Button>
                                            </Grid>
                                        </Grid>
                                        <Divider/>
                                        <Grid container direction='column'>
                                            <Grid item className={classes.chat}>
                                                <Grid container  className={classes.chatArea}>
                                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis earum laboriosam quaerat totam. Ab deserunt hic in nihil voluptates! Atque cupiditate, facilis libero nobis repellat similique ut. A alias hic optio recusandae tempora vel voluptatem. Accusamus aspernatur autem beatae blanditiis commodi eum eveniet ex explicabo, id in minima modi mollitia nam nobis, nulla pariatur perspiciatis quaerat quam quas rem repellendus similique sit temporibus unde vero. A ad aliquam cum cumque delectus dolor doloremque doloribus earum excepturi fugit, harum hic illum iusto modi molestias nam natus necessitatibus non obcaecati odio perspiciatis, quaerat quisquam rerum? Aliquid cupiditate illo iure nisi quisquam voluptatem!
                                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis earum laboriosam quaerat totam. Ab deserunt hic in nihil voluptates! Atque cupiditate, facilis libero nobis repellat similique ut. A alias hic optio recusandae tempora vel voluptatem. Accusamus aspernatur autem beatae blanditiis commodi eum eveniet ex explicabo, id in minima modi mollitia nam nobis, nulla pariatur perspiciatis quaerat quam quas rem repellendus similique sit temporibus unde vero. A ad aliquam cum cumque delectus dolor doloremque doloribus earum excepturi fugit, harum hic illum iusto modi molestias nam natus necessitatibus non obcaecati odio perspiciatis, quaerat quisquam rerum? Aliquid cupiditate illo iure nisi quisquam voluptatem!
                                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis earum laboriosam quaerat totam. Ab deserunt hic in nihil voluptates! Atque cupiditate, facilis libero nobis repellat similique ut. A alias hic optio recusandae tempora vel voluptatem. Accusamus aspernatur autem beatae blanditiis commodi eum eveniet ex explicabo, id in minima modi mollitia nam nobis, nulla pariatur perspiciatis quaerat quam quas rem repellendus similique sit temporibus unde vero. A ad aliquam cum cumque delectus dolor doloremque doloribus earum excepturi fugit, harum hic illum iusto modi molestias nam natus necessitatibus non obcaecati odio perspiciatis, quaerat quisquam rerum? Aliquid cupiditate illo iure nisi quisquam voluptatem!
                                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis earum laboriosam quaerat totam. Ab deserunt hic in nihil voluptates! Atque cupiditate, facilis libero nobis repellat similique ut. A alias hic optio recusandae tempora vel voluptatem. Accusamus aspernatur autem beatae blanditiis commodi eum eveniet ex explicabo, id in minima modi mollitia nam nobis, nulla pariatur perspiciatis quaerat quam quas rem repellendus similique sit temporibus unde vero. A ad aliquam cum cumque delectus dolor doloremque doloribus earum excepturi fugit, harum hic illum iusto modi molestias nam natus necessitatibus non obcaecati odio perspiciatis, quaerat quisquam rerum? Aliquid cupiditate illo iure nisi quisquam voluptatem!
                                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis earum laboriosam quaerat totam. Ab deserunt hic in nihil voluptates! Atque cupiditate, facilis libero nobis repellat similique ut. A alias hic optio recusandae tempora vel voluptatem. Accusamus aspernatur autem beatae blanditiis commodi eum eveniet ex explicabo, id in minima modi mollitia nam nobis, nulla pariatur perspiciatis quaerat quam quas rem repellendus similique sit temporibus unde vero. A ad aliquam cum cumque delectus dolor doloremque doloribus earum excepturi fugit, harum hic illum iusto modi molestias nam natus necessitatibus non obcaecati odio perspiciatis, quaerat quisquam rerum? Aliquid cupiditate illo iure nisi quisquam voluptatem!
                                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis earum laboriosam quaerat totam. Ab deserunt hic in nihil voluptates! Atque cupiditate, facilis libero nobis repellat similique ut. A alias hic optio recusandae tempora vel voluptatem. Accusamus aspernatur autem beatae blanditiis commodi eum eveniet ex explicabo, id in minima modi mollitia nam nobis, nulla pariatur perspiciatis quaerat quam quas rem repellendus similique sit temporibus unde vero. A ad aliquam cum cumque delectus dolor doloremque doloribus earum excepturi fugit, harum hic illum iusto modi molestias nam natus necessitatibus non obcaecati odio perspiciatis, quaerat quisquam rerum? Aliquid cupiditate illo iure nisi quisquam voluptatem!
                                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis earum laboriosam quaerat totam. Ab deserunt hic in nihil voluptates! Atque cupiditate, facilis libero nobis repellat similique ut. A alias hic optio recusandae tempora vel voluptatem. Accusamus aspernatur autem beatae blanditiis commodi eum eveniet ex explicabo, id in minima modi mollitia nam nobis, nulla pariatur perspiciatis quaerat quam quas rem repellendus similique sit temporibus unde vero. A ad aliquam cum cumque delectus dolor doloremque doloribus earum excepturi fugit, harum hic illum iusto modi molestias nam natus necessitatibus non obcaecati odio perspiciatis, quaerat quisquam rerum? Aliquid cupiditate illo iure nisi quisquam voluptatem!
                                                </Grid>
                                            </Grid>
                                            <Grid item className={classes.form}>
                                                <form>
                                                    <Container>
                                                        <Grid container alignItems='flex-start' justify='space-between'>
                                                            <Grid item>
                                                                <TextField variant='outlined' className={classes.textField} size='small' fullWidth placeholder='Enter message'/>
                                                            </Grid>
                                                            <Grid item>
                                                            <Button variant='contained' color='secondary'>Send</Button>
                                                        </Grid>
                                                        </Grid>
                                                    </Container>
                                                </form>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Container>
                }
            </Grid>
        </Container>
    )
}

export default withAuth(CollaborationPage)