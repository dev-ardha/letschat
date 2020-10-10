import React, { useState, useEffect } from 'react'
import Styled from '@emotion/styled'
import ChatPreview from './ChatPreview'
import { connect } from 'react-redux'
import { getEmail, getId, getUsername, limitCharacter, getAvatar } from '../utils/user'
import axios from '../utils/axios'
import ModalInput from './ModalInput'
import ModalAlert from './ModalAlert'
import { loadContact } from '../redux/actions/contactActions'
import ModalContacts from './ModalContacts'
import { HiChatAlt2, HiUserAdd, HiViewGrid } from 'react-icons/hi'

function Sidebar({setOpenedRoom, rooms, openedRoom, user, loadContact, contacts, roomObject}){
    const [roomList, setRoomList] = useState(rooms)
    const [emailInput, setEmailInput] = useState();

    useEffect(() => {
        loadContact(user?.contacts)

    // eslint-disable-next-line
    }, [user])
    
    const [modalOpen, setModalOpen] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
    const [contactOpen, setContactOpen] = useState(false)
    const [alertMessage, setAlertMessage] = useState()

    const openedRoomSend = (room, user) => {
        return {
            _id: room._id,
            recipientId: getId(user, room),
            username: getUsername(user, room, contacts),
            photo: getAvatar(user, room),
            email: getEmail(user, room),
        }
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
                    loadContact([...contacts, response.data.contact]);
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
            { contactOpen ? <ModalContacts setModalOpen={setContactOpen} roomList={roomList} setOpenedRoom={setOpenedRoom}/> : '' }
            { modalOpen ? <ModalInput inputHandler={setEmailInput} setModalOpen={setModalOpen} actionHandler={addNewContact}/> : '' }
            { alertOpen ? <ModalAlert setAlertMessage={setAlertMessage} message={alertMessage} setModalOpen={setAlertOpen}/> : '' }
            {/* <form className="chat-input">
                <input type="text" name="text" placeholder="Search contact"/>
            </form> */}
            <div className="sidebar-header">
                <h1>LetsChat</h1>
            </div>
            <div className="sidebar-nav">
                <span className="add" onClick={() => setModalOpen(true)}><HiUserAdd/></span>
                <span className="contacts" onClick={() => setContactOpen(true)}><HiChatAlt2/></span>
                <span className="settings" ><HiViewGrid/></span>
            </div>
            <div className="sidebar-body">
                {
                    roomList?.map((room, index)=> {
                        let lastIndex = roomObject?.[room._id].length - 1;
                        const filter = roomObject?.[room._id].filter(e => e.read === false && e.recipientId === user._id)
                        if(room.messages.length){
                            return(
                                <span key={index} onClick={() => {
                                    setOpenedRoom(openedRoomSend(room, user))}
                                }>
                                    <ChatPreview
                                        active={checkActive(room)}
                                        preview={getEmail(user, room)}
                                        username={limitCharacter(getUsername(user, room, contacts), 13)}
                                        avatar={getAvatar(user, room)}
                                        lastMessage={roomObject?.[room._id][lastIndex]}
                                        messageCount={filter?.length}
                                    />
                                </span>
                            )
                        }else{
                            return ''
                        }
                    })
                }
            </div>
            <div className="sidebar-footer">
              
            </div>
        </StyledSidebar>
    )
}

const StyledSidebar = Styled.div`
    display:flex;
    flex-direction:column;
    flex:0.3;
    min-width:320px;
    border-right:1px solid #ddd;
    position:relative;

    .sidebar-nav{
        padding:.75rem 1rem;
        display:flex;
        justify-content:space-evenly;
        font-size:1.75rem;
        border-bottom:1px solid #ddd;

        span{
            cursor:pointer;
            color:#bbb;
            padding: 6px;
            border-radius: 50%;
            display: flex;
            position:relative;

            &:hover{
                color:#1990ff;
                background: #f9f9f9;
            }
        }

        .contacts{
            &::before{
                opacity:0;
                content: "Contacts";
                display: block;
                position: absolute;
                padding: 8px 11px;
                background: #333;
                box-shadow: 0 1px 3px rgb(0,0,0,0.2);
                font-size: 14px;
                bottom: -40px;
                left: -19px;
                color: #fff;
                border-radius: 4px;
                z-index: 1;
            }
        }

        .settings{
            &::before{
                opacity:0;
                content: "Settings";
                display: block;
                position: absolute;
                padding: 8px 11px;
                background: #333;
                box-shadow: 0 1px 3px rgb(0,0,0,0.2);
                font-size: 14px;
                bottom: -40px;
                left: -18px;
                color: #fff;
                border-radius: 4px;
                z-index: 1;
            }
        }

        .add{
            &::before{
                opacity:0;
                content: "Add Contact";
                display: block;
                position: absolute;
                padding: 8px 11px;
                background: #333;
                box-shadow: 0 1px 3px rgb(0,0,0,0.2);
                font-size: 14px;
                bottom: -40px;
                left: -33px;
                color: #fff;
                border-radius: 4px;
                min-width: 78px;
                z-index: 1;
            }
        }

        .contacts::before, .settings::before, .add::before{
            transition:all .1s ease-in-out;
        }

        .contacts:hover, .settings:hover, .add:hover{
            &::before{
                opacity:1;
            }
        }
    }

    .sidebar-header{
        min-height:79px;
        width:100%;
        background:#fff;
        border-bottom:1px solid #ddd;
        display:flex;
        justify-content:center;
        align-items:center;
        
        h1{
            font-family: 'Lobster', cursive;
            font-size: 2.3rem;
            margin: 0;
            color: black;
            font-weight: 400;
        }

        button{
            border: none;
            padding: .75rem 1rem;
            background: #1990ff;
            border-radius: .5rem;
            cursor: pointer;
            color: #fff;

            &:hover{
                background:#4ca9ff;
            }
        }
    }

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

    .sidebar-footer{
        padding:1rem;
        display:flex;
        justify-content:center;
        align-items:center;
        height:72px;

        button{
            border: none;
            padding: .75rem 1rem;
            background: #1990ff;
            border-radius: .5rem;
            cursor: pointer;
            color: #fff;

            &:hover{
                background:#4ca9ff;
            }
        }
    }

    .sidebar-body{
        display:flex;
        flex-direction:column;
        overflow-y:scroll;
        flex-grow:1;

        span{
            position:relative;
        }

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
const mapDispatchToProps = dispatch => ({
    loadContact: (e) => dispatch(loadContact(e))
});

const mapStateToProps = state => ({
    user: state.user.user,
    contacts: state.contacts.contacts,
    roomObject: state.rooms.rooms
})

export default connect(mapStateToProps, mapDispatchToProps )(Sidebar);