import React, { useContext, useEffect, useState } from 'react'
import Styled from '@emotion/styled'
import ChatHeader from './ChatHeader'
import Message from './Message'
import { UserContext } from '../contexts/UserContext'
import { useSocket } from '../contexts/SocketContext'
import { fetchData, fetchNewMessage } from '../utils/user'

function ChatBox({openedRoom, setCurrentText, currentText}){
    // Context
    const [user] = useContext(UserContext)
    const socket = useSocket()
    const [listOfMessage, setListOfMessage] = useState([])
    const [isTyping, setIsTyping] = useState(false)
    const [timeOut, setTimeOut] = useState(0)
    const [typingMessage, setTypingMessage] = useState('')

    function timeoutFunction(){
        setIsTyping(false)
        socket.emit('notTyping', '');
    }

    const handleTyping = () => {
        if(isTyping === false) {
            setIsTyping(true)

            socket.emit('isTyping', 'Typing...');
            setTimeOut(setTimeout(timeoutFunction, 5000));
        } else {
            clearTimeout(timeOut);
            setTimeOut(setTimeout(timeoutFunction, 5000));
        }
    }

    // Refresh the message data when switching tabs
    useEffect(() => {
        if(openedRoom){
            socket.emit('userOnline', openedRoom?.recipientId)

            fetchData(openedRoom).then(messages => {
                setListOfMessage(messages)
            })
        }
    }, [openedRoom])

    // Get the realtime data from the server when user have a new message
    useEffect(() => {
        socket.on('sendMessage', sendMessage => {
            fetchNewMessage(sendMessage).then(messages => {
                setListOfMessage(messages)
            })
        })
        socket.on('newMessage', newMessage => {
            fetchNewMessage(newMessage).then(messages => {
                setListOfMessage(messages)
            })
        })
        
        socket.on('typing', msg => {
            setTypingMessage('Typing...')
        })
        socket.on('unTyping', () => {
            setTypingMessage('')
        })
    }, [socket, user])

    // Send data to the server
    function sendMessage(e){
        e.preventDefault()

        const data = {
            message: currentText,
            roomId: openedRoom._id,
            senderId: user?._id,
            recipientId: openedRoom.recipientId,
            read: false
        }
        
        socket.emit('chat', data);
        e.currentTarget.elements.text.value = '';
        setIsTyping(false)
        socket.emit('notTyping', '');
    }

    return(
        <StyledChatBox>
            {
                openedRoom ? (
                    <React.Fragment>
                        <ChatHeader
                            email={openedRoom.email}
                            username={openedRoom.username}
                            typingMessage={typingMessage}
                            recipientId={openedRoom.recipientId}
                        />
                        <div className="conversation-box">
                            { typingMessage ? typingMessage : '' }
                            {
                                listOfMessage?.map((message, index) => {
                                    return(
                                        <Message
                                            messageObject={listOfMessage[index]}
                                            messageBeforeThis={listOfMessage[index - 1]}
                                            timestamp={message.createdAt}
                                            listOfMessage={listOfMessage}
                                            index={index} key={index}
                                            position={message.senderId === user?._id ? 'right' : 'left'}
                                            message={message.message}/>
                                    )
                                })
                            }
                        </div>
                        <form className="chat-input" onSubmit={sendMessage}>
                            <button>Send</button>
                            <input type="text" name="text" placeholder="Type a message" onKeyPress={handleTyping} onChange={(e) => setCurrentText(e.target.value)}/>
                        </form>
                    </React.Fragment>
                ) : <StyledEmptyRoom>
                        <span>
                            Please select a chat to start messaging
                        </span>
                </StyledEmptyRoom>
            }
        </StyledChatBox>
    )
}

const StyledEmptyRoom = Styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    height:100%;

    span{
        background:#F6F7F9;
        padding:.5rem 1rem;
        border-radius:2rem;
    }
    
`

const StyledChatBox = Styled.div`
    display:flex;
    flex-direction:column;
    flex:1;

    .conversation-box{
        display:flex;
        flex-direction:column;
        padding:1rem 2rem;
        overflow-y:scroll;
        flex-grow:1;
        max-height: calc(100vh - 184px);
    }

    .chat-input{
        display:flex;
        border-top:1px solid #ddd;
        height:70px;
        align-items:center;
        padding: 0 1rem;
        background:#f9f9f9;

        button{
            padding:1rem 1.5rem;
            background:#1990FF;
            border-radius:3rem;
            margin-right:.75rem;
            cursor:pointer;
            border:none;
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