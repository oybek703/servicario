import React from 'react'
import {Container} from "@material-ui/core"

const CollaborationPage = ({match: {params: {id}}}) => {
    return (
        <Container>
            {id}
        </Container>
    )
}

export default CollaborationPage