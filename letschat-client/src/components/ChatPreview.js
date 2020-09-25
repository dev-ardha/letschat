import React from 'react'
import Styled from '@emotion/styled'

function ChatPreview({active, username, preview}){
    return(
        <StyledChatPreview active={active}>
            <div className="avatar"></div>
            <div className="chat-info">
                <h2>{username}</h2>
                <p>{preview}</p>
            </div>
        </StyledChatPreview>
    )
}

const StyledChatPreview = Styled.div`
    display:flex;
    align-items:center;
    padding:1rem;
    border-bottom:1px solid #ddd;
    cursor:pointer;
    ${(props) => props.active ? (
        'border-right:4px solid #d2d2d2;background:#fbfbfb;'
        ) : ''}

    &:hover{
        background:#f6fafd;
    }
    
    .avatar{
        height:50px;
        width:50px;
        border-radius:50%;
        background:#eee;
    }

    .chat-info{
        margin-left:1rem;
        flex:1;

        h2{
            margin:0;
            margin-bottom:.3rem;
            font-size:1.2rem;
            font-weight:700;
            color:#40424a;
        }
        p{
            margin:0;
            color:#666;
        }
    }
`

export default ChatPreview;