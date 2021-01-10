import React from 'react'
import {Container} from "@material-ui/core"
import withAuth from "./hoc/withAuth"

const ReceivedOffers = () => {
    return (
        <Container>
            Received Offers
        </Container>
    )
}

export default withAuth(ReceivedOffers)