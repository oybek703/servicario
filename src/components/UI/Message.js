import React from 'react'
import {makeStyles, Typography} from "@material-ui/core"
import Button from "@material-ui/core/Button"
import Avatar from "@material-ui/core/Avatar"
import Grid from "@material-ui/core/Grid"

const useStyles = makeStyles(theme => ({
    msgMainBox: {
        cursor: 'text',
        '&:hover': {
            backgroundColor: 'transparent'
        }
    },
    msgBox: {
        backgroundColor: ({left}) => left ? '#222' : '#5f5f5f',
        color: ({left}) => left ? 'white' : 'white',
        borderTopRightRadius: '15px',
        borderTopLeftRadius: '15px',
        borderBottomRightRadius: ({left}) => left ? 15 : 0,
        borderBottomLeftRadius: ({left}) => left ? 0 : 15,
        textTransform: 'none',
        padding: '.2em .5em',
        cursor: 'text',
        fontSize: '.9em',
        marginLeft: ({left}) => left ? '.5em' : 0,
        marginRight: ({left}) => left ? 0 : '.5em',
        '&:hover': {
            backgroundColor: ({left}) => left ? '#222' : '#444'
        }
    },
    time: {
        fontSize: '.8em',
        fontStyle: 'italic'
    }
}))

const Message = ({msg, left, user, createdAt}) => {
    const classes = useStyles({left})
    return (
        <Grid item>
            <Grid item>
                <Button classes={{root: classes.msgMainBox}} variant='text' component='span' disableRipple disableFocusRipple>
                    {left && <Avatar src={user.avatar}/>}
                    <Button disableRipple disableFocusRipple component={Typography} classes={{root: classes.msgBox}}>
                        {msg}
                    </Button>
                    {!left && <Avatar src={user.avatar}/>}
                </Button>
            </Grid>
            <Grid item>
                <Typography align={left ? 'left' : 'right'} variant='subtitle2' className={classes.time}>{`${new Date(createdAt.seconds * 1000).toLocaleTimeString()}`}</Typography>
            </Grid>
        </Grid>
    )
}

export default Message