import React, { useState, useEffect } from 'react'
import Styled from '@emotion/styled'
import ChatPreview from './ChatPreview'
import { connect } from 'react-redux'
import { getEmail, getId, getUsername, limitCharacter, getAvatar } from '../utils/user'
import axios from '../utils/axios'
import ModalInput from './ModalInput'
import ModalAlert from './ModalAlert'
import { loadContact } from '../redux/actions/contactActions'

function Sidebar({setOpenedRoom, rooms, openedRoom, user, loadContact, contacts, roomObject}){
    const [roomList, setRoomList] = useState(rooms)
    const [emailInput, setEmailInput] = useState();

    useEffect(() => {
        loadContact(user?.contacts)

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
            { modalOpen ? <ModalInput inputHandler={setEmailInput} setModalOpen={setModalOpen} actionHandler={addNewContact}/> : '' }
            { alertOpen ? <ModalAlert setAlertMessage={setAlertMessage} message={alertMessage} setModalOpen={setAlertOpen}/> : '' }
            {/* <form className="chat-input">
                <input type="text" name="text" placeholder="Search contact"/>
            </form> */}
            <div className="sidebar-header">
                <h1>LetsChat</h1>
            </div>
            <div className="sidebar-body">
                {
                    roomList?.map((room, index)=> {
                        let lastIndex = roomObject?.[room._id].length - 1;
                        const filter = roomObject?.[room._id].filter(e => e.read === false && e.recipientId === user._id)
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
                    })
                }
            </div>
            <div className="sidebar-footer">
                <button type="submit" onClick={() => setModalOpen(true)}>Add Contact</button>
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