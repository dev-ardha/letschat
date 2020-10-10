import React, { useEffect, useState } from 'react'
import Styled from '@emotion/styled'
import ChatHeader from './ChatHeader'
import Message from './Message'
import { useSocket } from '../contexts/SocketContext'
import { fetchNewMessage, readMessages } from '../utils/user'
import Loader from './Loader'
import { connect } from 'react-redux'
import { updateRoom } from '../redux/actions/roomActions'

function ChatBox({openedRoom, setCurrentText, currentText, user, rooms, updateRoom}){
    // Context
    const socket = useSocket()

    const [listOfMessage, setListOfMessage] = useState([])
    const [isTyping, setIsTyping] = useState(false)
    const [timeOut, setTimeOut] = useState(0)
    const [typingMessage, setTypingMessage] = useState('')
    const [loading, setLoading] = useState()

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
            setLoading(true)
            socket.emit('userOnline', openedRoom?.recipientId)

            setListOfMessage(rooms[openedRoom._id])
            setLoading(false)
        }
    }, [openedRoom, socket, rooms])

    useEffect(() => {
        if(openedRoom){
            readMessages(user._id, openedRoom._id).then((messages) => {
                updateRoom({messages: messages, roomId: messages[0]?.roomId})
            })
        }
        // eslint-disable-next-line
    }, [openedRoom, user])

    // Get the realtime data from the server when user have a new message
    useEffect(() => {
        socket.on('sendMessage', sendMessage => {
            fetchNewMessage(sendMessage).then(messages => {
                updateRoom({messages: messages, roomId: messages[0].roomId})
            })
        })
        socket.on('newMessage', newMessage => {
            fetchNewMessage(newMessage).then(messages => {
                updateRoom({messages: messages, roomId: messages[0].roomId})
            });
        })
    }, [socket, user, updateRoom, openedRoom])

    useEffect(() => {
        socket.on('typing', () => {
            setTypingMessage('Typing...')
        })
        socket.on('unTyping', () => {
            setTypingMessage('')
        })
    }, [socket])

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

        // Reset everything when message sent
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
                            photo={openedRoom.photo}
                            typingMessage={typingMessage}
                            recipientId={openedRoom.recipientId}
                        />
                        <div className="conversation-box">
                            {
                                loading ? <span className="loading"><Loader/></span> : (
                                    listOfMessage?.slice(0).reverse().map((message, index) => {
                                        return(
                                            <Message
                                                messageObject={listOfMessage[listOfMessage.length - (index + 1)]}
                                                messageBeforeThis={listOfMessage[(listOfMessage.length - (index + 1)) - 1]}
                                                timestamp={message.createdAt}
                                                key={index}
                                                position={message.senderId === user?._id ? 'right' : 'left'}
                                                message={message.message}/>
                                        )
                                    })
                                )
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

    .loading{
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .conversation-box{
        display:flex;
        flex-direction:column-reverse;
        padding:1rem 2rem;
        overflow-y:scroll;
        flex-grow:1;
        max-height: calc(100vh - 142px);
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

const mapDispatchToProps = dispatch => ({
    updateRoom: (e) => dispatch(updateRoom(e)),
});

const mapStateToProps = state => ({
    user: state.user.user,
    rooms: state.rooms.rooms
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatBox);