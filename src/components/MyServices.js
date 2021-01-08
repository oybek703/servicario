import React from 'react'
import withAuthorization from "./hoc/withAuth"

const MyServices = () => {
    return (
        <div>
            My services
        </div>
    )
}

export default withAuthorization(MyServices)