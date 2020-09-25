import React from 'react'
import Styled from '@emotion/styled'

function PageError(){
    return(
        <StyledPageError>
            <p>Sorry, the mobile version is not ready</p>
        </StyledPageError>
    )
}

const StyledPageError = Styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    text-align:center;
    height:100vh;
`

export default PageError;