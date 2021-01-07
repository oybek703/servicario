import React from 'react'
import {Button} from "@material-ui/core"
import CloseIcon from "@material-ui/icons/Close"
import Slide from "@material-ui/core/Slide"
import Snackbar from "@material-ui/core/Snackbar"

const ErrorReport = ({snackbar, setSnackBar}) => {
    return (
        <Snackbar
            onClose={() => setSnackBar(false)}
            autoHideDuration={3000} open={snackbar}
            ContentProps={{style: {backgroundColor: 'crimson'}}}
            anchorOrigin={{horizontal: 'center', vertical: 'top'}}
            message='Network Error!'
            action={<Button onClick={() => setSnackBar(false)}><CloseIcon color='inherit'/></Button>}
            TransitionComponent={Slide}/>
    )
}

export default ErrorReport