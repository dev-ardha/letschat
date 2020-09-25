import React from 'react'
import Styled from '@emotion/styled'

function SideNav(){
    return(
        <StyledSideNav>
            
        </StyledSideNav>
    )
}

const StyledSideNav = Styled.div`
    display:flex;
    flex-direction:column;
    width:0px;
    height:100vh;
    background:#F6F7F9;
    border-right:1px solid #ddd;
`

export default SideNav;