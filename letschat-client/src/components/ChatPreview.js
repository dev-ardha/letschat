import React from 'react'
import Styled from '@emotion/styled'
import { HiUser } from 'react-icons/hi'
import { limitCharacter } from '../utils/user'
import { getTimeOnly } from '../utils/date'

function ChatPreview({active, username, avatar, lastMessage, messageCount}){
    return(
        <StyledChatPreview active={active}>
            <div className="avatar">
                { avatar ? <img src={avatar} alt="avatar"/> : <HiUser/> }
            </div>
            <div className="chat-info">
                <h2>{username}</h2>
                <p>{lastMessage ? limitCharacter(lastMessage.message, 28) : ''}</p>
            </div>
            <div className="last-message">
                {
                    lastMessage ? (
                        <>
                            <span className="last-timestamp">{getTimeOnly(lastMessage.createdAt)}</span>
                            { messageCount ? <span className="message-count">{messageCount}</span> : '' }
                        </>
                    ) : ''
                }
                
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

    .last-message{
        position: absolute;
        right: 1rem;
        top:20px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .last-timestamp{
        font-size: .9rem;
        margin-bottom: 6px;
        color:#666;
    }
    .message-count{
        background: #1990ff;
        color: #fff;
        border-radius: 50%;
        font-size:.8rem;
        padding: 4px;
        min-width: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
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