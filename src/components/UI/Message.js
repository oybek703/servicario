import React from 'react'
import {makeStyles, Typography} from "@material-ui/core"
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft'
import Button from "@material-ui/core/Button"
import Avatar from "@material-ui/core/Avatar"

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
        marginLeft: ({left}) => left ? '.5em' : 0,
        marginRight: ({left}) => left ? 0 : '.5em',
        '&:hover': {
            backgroundColor: ({left}) => left ? '#222' : '#444'
        }
    }
}))

const Message = ({msg, left}) => {
    const classes = useStyles({left})
    return (
        <Button classes={{root: classes.msgMainBox}} variant='text' component='span' disableRipple disableFocusRipple>
            {left && <Avatar>U</Avatar>}
            <Button disableRipple disableFocusRipple component={Typography} classes={{root: classes.msgBox}} startIcon={left && <ArrowLeftIcon/>} endIcon={!left && <ArrowRightIcon/>}>
                {msg}
            </Button>
            {!left && <Avatar>U</Avatar>}
        </Button>
    )
}

export default Message