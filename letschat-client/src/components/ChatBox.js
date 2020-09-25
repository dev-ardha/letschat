import React, { useContext, useEffect } from 'react'
import Styled from '@emotion/styled'
import ChatHeader from './ChatHeader'
import Message from './Message'
import { UserContext } from '../contexts/UserContext'
import { useSocket } from '../contexts/SocketContext'

function ChatBox({openedRoom, setCurrentText, listOfMessage}){
    const [user] = useContext(UserContext)
    const socket = useSocket()

    useEffect(() => {
        socket.on('msg', msg => {
            console.log(msg)
        })
    }, [socket])

    function sendMessage(e){
        e.preventDefault()
        e.currentTarget.elements.text.value = ''
    }

    return(
        <StyledChatBox>
            {
                openedRoom ? (
                    <React.Fragment>
                        <ChatHeader email={openedRoom.email} username={openedRoom.username}/>
                        <div className="conversation-box">
                            {
                                listOfMessage?.map((message, index) => {
                                    return(
                                        <Message  key={index} position={message.senderId === user?._id ? 'right' : 'left'} message={message.message}/>
                                    )
                                })
                            }
                        </div>
                        <form className="chat-input" onSubmit={sendMessage}>
                            <button>Send</button>
                            <input type="text" name="text" placeholder="Type a message" onChange={(e) => setCurrentText(e.target.value)}/>
                        </form>
                    </React.Fragment>
                ) : ''
            }
        </StyledChatBox>
    )
}

const StyledChatBox = Styled.div`
    display:flex;
    flex-direction:column;
    flex:1;

    .conversation-box{
        display:flex;
        flex-direction:column;
        padding:0 2rem;
        overflow-y:scroll;
        flex-grow:1;
    }

    .chat-input{
        display:flex;
        border-top:1px solid #ddd;
        height:70px;
        align-items:center;
        padding: 0 1rem;
        background:#f9f9f9;

        button{
            border:1px solid #ddd;
            padding:1rem 1.5rem;
            background:#3D7EFE;
            border-radius:3rem;
            margin-right:.75rem;
            cursor:pointer;
            color:#fff;

            &:hover{
                border:1px solid #999;
            }
        }

        input{
            flex-grow:1;
            height:70%;
            border-radius:3rem;
            border:1px solid #ddd;
            padding:0 1rem;
        }
    }
`

export default ChatBox;