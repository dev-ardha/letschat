import React, { useContext } from 'react'
import Styled from '@emotion/styled'
import ChatPreview from './ChatPreview'
import { UserContext } from '../contexts/UserContext'

function Sidebar({setOpenedRoom, rooms, setListOfMessage}){
    const [user] = useContext(UserContext)

    const getEmail = (user, room) => {
        return room.participants[0].email === user.email ? room.participants[1].email : room.participants[0].email
    }
    const getUsername = (user, room) => {
        const uname = room.participants[0].username === user.username ? room.participants[1].username : room.participants[0].username

        // Check if username exist in user contacts
        if(user?.contacts.some(param => param.username === uname)){
            return uname
        }else{
            return getEmail(user, room);
        }
    }
    const getId = (user, room) => {
        return room.participants[0]._id === user._id ? room.participants[1]._id : room.participants[0]._id
    }

    function limitCharacter(character, max){
        if(character.length > max) {
            return `${character.substring(0, max)}...`
        };

        return character
    }

    return(
        <StyledSidebar>
            <div className="sidebar-header">
                <button>Add Contact</button>
            </div>
            <div className="sidebar-body">
                {
                    rooms?.map((room, index)=> {
                        return(
                            <span key={index} onClick={() => {
                                setListOfMessage(user?.rooms.find(x => x._id === room?._id).messages)
                                setOpenedRoom({_id: room._id, recipientId: getId(user, room), username: getUsername(user, room), email: getEmail(user, room)})}
                            }>
                                <ChatPreview active={false} username={limitCharacter(getUsername(user, room), 12)} preview={'Zupp bro!'}/>
                            </span>
                        )
                    })
                }
                {/* {
                    contacts?.map((contact, index) => {
                        return(
                            <span key={index} onClick={() => setOpenedRoom({_id: contact._id, username: contact.username, email: contact.email})}>
                                <ChatPreview active={contact._id === openedRoom?._id ? true : false} username={contact.username} preview={'Zupp bro!'}/>
                            </span>
                        )
                    })
                } */}
            </div>
        </StyledSidebar>
    )
}

const StyledSidebar = Styled.div`
    display:flex;
    flex-direction:column;
    flex:0.3;
    min-width:250px;
    border-right:1px solid #ddd;
    position:relative;

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