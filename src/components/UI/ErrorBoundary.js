import React, {Component} from 'react'
import {Container, Typography, withStyles} from "@material-ui/core"
import ReportProblemIcon from '@material-ui/icons/ReportProblem'
import Grid from "@material-ui/core/Grid"
import Box from "@material-ui/core/Box"
import Link from "@material-ui/core/Link"

const styles = theme => ({
    mainBox: {
        marginTop: '2em',
        backgroundColor: '#666',
        color: 'white',
        borderRadius: '10px',
        padding: '2em 1em',
        fontSize: '1.5em'
    }
})

class ErrorBoundary extends Component {
    constructor(props) {
        super(props)
        this.state = {hasError: false}
    }
    componentDidCatch(error, errorInfo) {
        this.setState({hasError: true})
    }
    render() {
        const {hasError} = this.state
        const {classes} = this.props
        if(hasError) {
            return <Container>
                <Box className={classes.mainBox}>
                    <Grid container justify='center'>
                        <ReportProblemIcon color='secondary' fontSize='large'/>
                    </Grid>
                    <Typography variant='h5' align='center' paragraph>Something went wrong.</Typography>
                    <Typography align='center' variant='body2' paragraph gutterBottom>We will try to solve the problem soon.</Typography>
                    <Typography align='center' variant='body2'>Contact Us: <Link href="mailto: servicario@gmail.com">servicario@gmail.com</Link></Typography>
                </Box>
            </Container>
        }
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}

export default withStyles(styles)(ErrorBoundary)