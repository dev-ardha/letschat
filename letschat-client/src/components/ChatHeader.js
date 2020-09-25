import React from 'react'
import Styled from '@emotion/styled'

function ChatHeader({username, email}){
    return(
        <StyledChatHeader>
            <div className="header-left">
                <h2 className="user-name">{username}</h2>
                <h3 className="user-email">{email}</h3>
            </div>
            <div className="heder-right">
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