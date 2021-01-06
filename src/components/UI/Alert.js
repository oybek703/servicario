import React from 'react'
import {Box, makeStyles} from "@material-ui/core"
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
const useStyles = makeStyles(theme => ({
    alert: {
        backgroundColor: props => props.backgroundColor || 'rgb(255 211 206)',
        color:  props => props.color || '#f44336',
        borderRadius: '5px'
    },
    icon: {
        color:  props => props.color || '#f44336',
    }
}))

const Alert = (props) => {
    const classes = useStyles(props)
    return (
        <Box className={classes.alert}>
            <List>
                <ListItem>
                    <ListItemIcon>
                        {props.icon || <ReportProblemIcon classes={{root: classes.icon}}/>}
                    </ListItemIcon>
                    <ListItemText>
                        {props.text || 'Something went wrong, please check network connection.'}
                    </ListItemText>
                </ListItem>
            </List>
        </Box>
    )
}

export default Alert