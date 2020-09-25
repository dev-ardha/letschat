import React, { useContext } from 'react'
import Styled from '@emotion/styled'
import { UserContext } from '../contexts/UserContext'

function Navbar(){
    const [user] = useContext(UserContext)

    return(
        <StyledNavbar>
            <div className="navbar-left"></div>
            <input type="text" className="navbar-search" placeholder="Search"/>
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

    .navbar-left{
        display:flex;
        flex: 1 0 0%;
    }

    .navbar-search{
        height:30px;
        width:250px;
        margin:auto;
        background:#f9f9f9;
        border:1px solid #ddd;
        border-radius:4px;
        text-align:center;
    }

    .navbar-right{
        display:flex;
        flex: 1 0 0%;
        justify-content:flex-end;
        align-items:center;

    }
`

export default Navbar;