import React, {useState} from 'react'
import withAuthorization from "./hoc/withAuth"
import {Button, Container, FormControl, makeStyles, Typography} from "@material-ui/core"
import Grid from "@material-ui/core/Grid"
import Select from "@material-ui/core/Select"
import TextField from "@material-ui/core/TextField"
import Icon from "@material-ui/core/Icon"

const useStyles = makeStyles(theme => ({
    main: {
        marginTop: '.8em',
        marginBottom: '5em',
        [theme.breakpoints.down('xs')]: {
            marginTop: '2em'
        }
    },
    fields: {
        marginTop: '1.4em'
    }
}))

const CreateService = () => {
    const classes = useStyles()
    const [formData, setFormData] = useState({category: '', title: '', description: '', imageUrl: '', price: ''})
    const handleChange = ({target: {name, value}}) => {
        setFormData({...formData, [name]: value})
    }
    const handleSubmit = e => {
        e.preventDefault()
        console.log(formData)
    }

    return (
        <Container>
            <Grid container direction='column' className={classes.main} alignItems='flex-start'>
                <Container>
                    <Typography paragraph gutterBottom variant='h4' color='primary' align='center'>Create Service</Typography>
                    <form autoComplete='off' onSubmit={handleSubmit}>
                    <Grid container direction='column'>
                        <Grid item className={classes.fields}>
                            <Typography paragraph variant='body2'>Choose category</Typography>
                            <FormControl required size='small'>
                                <Select fullWidth variant='outlined' native value={formData.category} inputProps={{name:'category'}} onChange={handleChange}>
                                    <option value='Mathematics'>Mathematics</option>
                                    <option value='Programming'>Programming</option>
                                    <option value='Philosophy'>Philosophy</option>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item className={classes.fields}>
                            <Typography variant='body2' gutterBottom>Title</Typography>
                            <TextField required name='title' size='small' fullWidth variant='outlined' value={formData.title} onChange={handleChange} placeholder='Service title'/>
                        </Grid>
                        <Grid item className={classes.fields}>
                            <Typography variant='body2' gutterBottom>Description</Typography>
                            <TextField required fullWidth variant='outlined' multiline placeholder='Service description' rowsMax={5} rows={4} value={formData.description} onChange={handleChange} name='description'/>
                        </Grid>
                        <Grid item className={classes.fields}>
                            <Typography variant='body2' gutterBottom>Image Url</Typography>
                            <TextField required name='imageUrl' size='small' fullWidth variant='outlined' value={formData.imageUrl} onChange={handleChange} placeholder='Service image url'/>
                        </Grid>
                        <Grid item className={classes.fields}>
                            <Typography variant='body2' gutterBottom>Price per hour</Typography>
                            <TextField required inputProps={{min: 0}} type='number' InputProps={{startAdornment: <Icon fontSize='small'>$</Icon>}} name='price' size='small' fullWidth variant='outlined' value={formData.price} onChange={handleChange} placeholder='Service price per hour'/>
                        </Grid>
                        <Grid item className={classes.fields}>
                            <Button type='submit' variant='contained' color='primary'>Create</Button>
                        </Grid>
                    </Grid>
                </form>
                </Container>
            </Grid>
        </Container>
    )
}

export default withAuthorization(CreateService)