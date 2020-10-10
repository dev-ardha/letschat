import React from 'react'
import Styled from '@emotion/styled'
import { connect } from 'react-redux'

function Navbar({user}){
    return(
        <StyledNavbar>
            <div className="navbar-left"></div>
            <div className="navbar-right"><p>{user.username}</p></div>
        </StyledNavbar>
    )
}

const StyledNavbar = Styled.div`
    display:none;
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

const mapStateToProps = state => ({
    user: state.user.user
})

export default connect(mapStateToProps )(Navbar);