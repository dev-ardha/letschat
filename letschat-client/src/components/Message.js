import React from 'react'
import Styled from '@emotion/styled'

function Message({position, message}){
    return(
        <StyledMessage position={position}>
            <div className="message-wrapper">
                { position === 'left' ? <div className="avatar"></div> : '' }
                <div className="message-body">
                    <p>{message}</p>
                </div>
            </div>
        </StyledMessage>
    )
}

const StyledMessage = Styled.div`
    ${(props) => props.position === 'left' ? 'align-self:flex-start;.message-body{background:#F6F7F9;}' : 'align-self:flex-end;.message-body{background:#3D7EFE;color:#fff;}'}

    .message-wrapper{
        display:inline-box;
        margin-top:1rem;

        .avatar{
            width:40px;
            height:40px;
            background:#eee;
            margin-right:1rem;
            border-radius:50%;
        }
        .message-body{
            max-width:300px;
            padding:.2rem 1rem;
            border-radius:1rem;

            p{
                line-height:1.3rem;
            }
        }
    }
`

export default Message;