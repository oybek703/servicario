import React from 'react'
import {useSelector} from "react-redux"
import {Redirect} from "react-router-dom"

const WithAuth = Component => {
    const Wrapped = props => {
        const {user} = useSelector(state => state.auth)
        if(!user) {
            return <Redirect to='/'/>
        }
        return <Component {...props} />
    }
    return Wrapped
}

export default WithAuth