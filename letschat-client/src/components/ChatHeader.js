import React, { useContext } from 'react'
import Styled from '@emotion/styled'
import { UserContext } from '../contexts/UserContext'

function ChatHeader({username, email, typingMessage, recipientId}){
    const [user] = useContext(UserContext)

    const checkIsOnContact = () => {
        if(user?.contacts.filter(u => u._id === recipientId).length > 0){
            return ''
        }else{
            return <button className="add">Add Contact</button>
        }
    }

    return(
        <StyledChatHeader>
            <div className="header-left">
                <h2 className="user-name">{username}</h2>
                <h3 className="user-email">{email} {typingMessage ? <span>is typing...</span> : ''}</h3>
            </div>
            <div className="heder-right">
                { checkIsOnContact()}
                <button>User Info</button>
            </div>
        </StyledChatHeader>
    )
}

const StyledChatHeader = Styled.div`
    padding:1rem 2rem;
    border-bottom:1px solid #ddd;
    background:#f9f9f9;
    display:flex;
    justify-content:space-between;

    .header-left{
        h2, h3{
            margin:0;

            span{
                color:#a4a4af;
            }
        }

        .user-name{
            margin-bottom:.5rem;
            font-size:1.3rem;
        }
        .user-email{
            color:#a4a4af;
            font-size:1rem;
            font-weight:600;
        }
    }
    .heder-right{
        display:flex;
        align-items:center;

        .add{
            margin-right:.5rem;
        }

        button{
            border:1px solid #ddd;
            padding:.5rem 1rem;
            background:#f9f9f9;
            border-radius:.5rem;
            cursor:pointer;

            &:hover{
                border:1px solid #999;
            }
        }
    }
`

export default ChatHeader;