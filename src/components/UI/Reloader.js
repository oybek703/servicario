import React from 'react'
import Grid from "@material-ui/core/Grid"
import Alert from "./Alert"
import {Button} from "@material-ui/core"

const Reloader = ({handleReload}) => {
    return (
        <>
            <Grid container alignItems='center' direction='column'>
                <Grid item>
                    <Alert/>
                </Grid>
                <Grid item>
                    <Button variant='contained' color='primary' onClick={handleReload}>Reload</Button>
                </Grid>
            </Grid>
        </>
    )
}

export default Reloader