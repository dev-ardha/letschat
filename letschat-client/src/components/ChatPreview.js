import React from 'react'
import Styled from '@emotion/styled'
import { HiUser } from 'react-icons/hi'

function ChatPreview({active, username, preview, avatar}){
    return(
        <StyledChatPreview active={active}>
            <div className="avatar">
                { avatar ? <img src={avatar} alt="avatar"/> : <HiUser/> }
            </div>
            <div className="chat-info">
                <h2>{username}</h2>
                <p>{preview}</p>
            </div>
        </StyledChatPreview>
    )
}

const StyledChatPreview = Styled.div`
    display:-webkit-inline-box;
    width:100%;
    padding:1rem;
    border-bottom:1px solid #ddd;
    cursor:pointer;
    ${(props) => props.active ? (
        'border-right:5px solid #1990FF;background:#fafafa;&:hover{background:#fafafa !important};'
        ) : ''}

    &:hover{
        background:#f9f9f9;
    }
    
    .avatar{
        height:50px;
        width:50px;
        border-radius:50%;
        background:#ddd;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 2.3rem;
        color: #fff;
        object-fit:cover;

        img{
            width:100%;
            height:100%;
            border-radius:50%;
        }
    }

    .chat-info{
        margin-left:1rem;
        flex:1;
        margin-top: 5px;

        h2{
            margin:0;
            margin-bottom:.3rem;
            font-size:1.2rem;
            font-weight:700;
            color:#121212;
        }
        p{
            margin:0;
            color:#666;
        }
    }
`

export default ChatPreview;