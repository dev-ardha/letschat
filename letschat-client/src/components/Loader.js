import React from 'react';
import Styled from '@emotion/styled';
import './Loader.css'

function Loader({fullpage}) {
    return (
        <StyledLoader fullpage={fullpage}>
            <div className="container loader-container">
                <div className="loader">Loading...</div>
            </div>
        </StyledLoader>
    );
}

const StyledLoader = Styled.div`

    .loader-container{
        display:flex;
        justify-content:center;
        padding-top:50px;
        align-items:center;
        ${(props) => props.fullpage ? 'height:100vh;' : ''}
    }
`

export default Loader;
