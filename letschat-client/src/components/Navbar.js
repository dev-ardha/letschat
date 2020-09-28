import React, { useContext, useEffect, useState } from 'react'
import Styled from '@emotion/styled'
import { UserContext } from '../contexts/UserContext'
import { useSocket } from '../contexts/SocketContext'

function Navbar(){
    const [user] = useContext(UserContext)
    const socket = useSocket()
    const [count, setCount] = useState()

    useEffect(() => {
        socket.on('online', count => {
            setCount(count)
        })
        
    }, [socket])

    return(
        <StyledNavbar>
            <div className="navbar-left">{count} user online</div>
            <div className="navbar-right"><p>{user.username}</p></div>
        </StyledNavbar>
    )
}

const StyledNavbar = Styled.div`
    display:flex;
    width:100%;
    height:45px;
    border-bottom:1px solid #ddd;
    padding:0 2rem;
    align-items:center;

    .navbar-left{
        display:flex;
        flex: 1 0 0%;
    }

    .navbar-right{
        display:flex;
        flex: 1 0 0%;
        justify-content:flex-end;
        align-items:center;

    }
`

export default Navbar;