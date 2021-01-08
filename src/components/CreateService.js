import React from 'react'
import withAuthorization from "./hoc/withAuth"

const CreateService = () => {
    return (
        <div>
            Create new Service
        </div>
    )
}

export default withAuthorization(CreateService)