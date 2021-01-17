import React, {useEffect} from 'react'
import {Container, Typography} from "@material-ui/core"

const Timer = ({expiresAt}) => {
    const expirationTime = expiresAt.toDate().getTime()
    useEffect(() => {
        const interval = setInterval(() => {
            const timeDivElement = document.getElementById('timeDiv')
            const now = new Date().getTime()
            const distance = expirationTime - now
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
            const seconds = Math.floor((distance % (1000 * 60)) / 1000)
            timeDivElement.innerHTML = `${hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
            if(distance < 0) {
                clearInterval(interval)
                timeDivElement.innerHTML = 'TIME IS EXPIRED!'
            }
        }, 1000)
        return () => {
            clearInterval(interval)
        }
    //    eslint-disable-next-line
    }, [])
    return (
        <Container>
            <Typography variant='h5' id='timeDiv'/>
        </Container>
    )
}

export default Timer