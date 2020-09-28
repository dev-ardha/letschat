import React, { useContext } from 'react'
import Styled from '@emotion/styled'
import ChatPreview from './ChatPreview'
import { UserContext } from '../contexts/UserContext'
import { getEmail, getId, getUsername, limitCharacter, getAvatar } from '../utils/user'

function Sidebar({setOpenedRoom, rooms, openedRoom}){
    const [user] = useContext(UserContext)

    const openedRoomSend = (room, user) => {
        return {
            _id: room._id,
            recipientId: getId(user, room),
            username: getUsername(user, room),
            email: getEmail(user, room)}
    }

    const checkActive = (room) => {
        if(openedRoom){
            if(openedRoom._id === room._id){
                return true
            }else{
                return false
            }
        }
    }

    return(
        <StyledSidebar>
            <form className="chat-input">
                <input type="text" name="text" placeholder="Search contact"/>
            </form>
            <div className="sidebar-body">
                {
                    rooms?.map((room, index)=> {
                        return(
                            <span key={index} onClick={() => {
                                setOpenedRoom(openedRoomSend(room, user))}
                            }>
                                <ChatPreview
                                    active={checkActive(room)}
                                    username={limitCharacter(getUsername(user, room), 12)}
                                    preview={getEmail(user, room)}
                                    avatar={getAvatar(user, room)}
                                />
                            </span>
                        )
                    })
                }
            </div>
            <div className="sidebar-header">
                <button>Add Contact</button>
            </div>
        </StyledSidebar>
    )
}

const StyledSidebar = Styled.div`
    display:flex;
    flex-direction:column;
    flex:0.3;
    min-width:300px;
    border-right:1px solid #ddd;
    position:relative;

    .chat-input{
        display:flex;
        height:70px;
        align-items:center;
        padding: 0 2rem;
        border-bottom:1px solid #ddd;

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
            height:60%;
            border-radius:3rem;
            border:1px solid #ddd;
            padding:0 1rem;
        }
    }

    .sidebar-header{
        border-bottom:1px solid #ddd;
        padding:1rem;
        display:flex;
        justify-content:center;
        align-items:center;
        height:72px;

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

    .sidebar-body{
        display:flex;
        flex-direction:column;
        overflow-y:scroll;
        flex-grow:1;

        &::-webkit-scrollbar {
            width: 10px;
        }
        &::-webkit-scrollbar-track {
            background: #f1f1f1;
        }
        &::-webkit-scrollbar-thumb {
            background: #ddd;
            border-radius:10px;
        }  
        &::-webkit-scrollbar-thumb:hover {
            background: #bbb;
        }
    }
`

export default Sidebar;