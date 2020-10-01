import React, { useContext, useState, useEffect } from 'react'
import Styled from '@emotion/styled'
import ChatPreview from './ChatPreview'
import { UserContext } from '../contexts/UserContext'
import { getEmail, getId, getUsername, limitCharacter, getAvatar } from '../utils/user'
import axios from '../utils/axios'
import ModalInput from './ModalInput'
import ModalAlert from './ModalAlert'
import { ContactContext } from '../contexts/ContactContext'

function Sidebar({setOpenedRoom, rooms, openedRoom}){
    const [user] = useContext(UserContext)
    const [contacts, setContacts] = useContext(ContactContext);

    const [roomList, setRoomList] = useState(rooms)
    const [emailInput, setEmailInput] = useState();

    useEffect(() => {
        setContacts(user?.contacts);

    // eslint-disable-next-line
    }, [user])
    
    const [modalOpen, setModalOpen] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState()

    const openedRoomSend = (room, user) => {
        return {
            _id: room._id,
            recipientId: getId(user, room),
            username: getUsername(user, room, contacts),
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

    const addNewContact = () => {
        const email = emailInput;
        setModalOpen(false)

        if(email){
            axios.post('/api/v1/contact/add', {
                meId:user._id,
                recipient: email
            }).then(response => {
                setEmailInput('');

                // If axios didn't get the data
                if(!response.data){
                    setAlertMessage("There's a problem adding the user to your contact list");
                    setAlertOpen(true);
                }

                // If axios get the data
                if(response.data){
                    setContacts([...contacts, response.data.contact]);
                    if(response.data.room){
                        setRoomList([...roomList, response.data.room]);
                    }
                    setAlertMessage('User has been successfully added to your contact list.');
                    setAlertOpen(true);
                }
            }).catch(() => {
                setEmailInput('');
                setAlertMessage("There's a problem adding the user to your contact list");
                setAlertOpen(true);
            })
        }
    }


    return(
        <StyledSidebar>
            { modalOpen ? <ModalInput inputHandler={setEmailInput} setModalOpen={setModalOpen} actionHandler={addNewContact}/> : '' }
            { alertOpen ? <ModalAlert setAlertMessage={setAlertMessage} message={alertMessage} setModalOpen={setAlertOpen}/> : '' }
            <form className="chat-input">
                <input type="text" name="text" placeholder="Search contact"/>
            </form>
            <div className="sidebar-body">
                {
                    roomList?.map((room, index)=> {
                        // Hiding empty room chat
                        if(room.messages.length > 0){
                            return(
                                <span key={index} onClick={() => {
                                    setOpenedRoom(openedRoomSend(room, user))}
                                }>
                                    <ChatPreview
                                        active={checkActive(room)}
                                        preview={getEmail(user, room)}
                                        username={limitCharacter(getUsername(user, room, contacts), 13)}
                                        avatar={getAvatar(user, room)}
                                    />
                                </span>
                            )
                        }else{
                            return ''
                        }
                    })
                }
            </div>
            <div className="sidebar-header">
                <button type="submit" onClick={() => setModalOpen(true)}>Add Contact</button>
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