import React, { useState } from 'react'
import Styled from '@emotion/styled'
import { connect } from 'react-redux'
import axios from 'axios'
import ModalAlert from './ModalAlert'
import UserInfo from './UserInfo'
import { removeFromContact, addToContact } from '../redux/actions/contactActions'

function ChatHeader({username, email, typingMessage, recipientId, photo, user, contacts, removeFromContact, addToContact}){
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState();
    const [infoOpen, setInfoOpen] = useState(false)

    const addNewContact = () => {
        if(email){
            axios.post('/api/v1/contact/add', {
                meId:user._id,
                recipient: email
            }).then(response => {

                // If axios didn't get any data
                if(!response.data){
                    setAlertMessage("There's a problem adding the user to your contact list");
                    setAlertOpen(true);
                }

                // If axios successfully get the data
                if(response.data){
                    addToContact([...contacts, response.data.contact]);
                    setAlertMessage('User has been successfully added to your contact list.');
                    setAlertOpen(true);
                }
            }).catch(() => {
                setAlertMessage("There's a problem adding the user to your contact list");
                setAlertOpen(true);
            })
        }
    }

    const checkIsOnContact = (contacts) => {
        if(contacts.filter(u => u._id === recipientId).length > 0){
            return ''
        }else{
            return <button className="add" onClick={addNewContact}>Add Contact</button>
        }
    }

    const deleteContact = () => {
        if(email){
            axios.post('/api/v1/contact/remove', {
                contactId: recipientId,
                meId: user._id
            }).then((response) => {

                // If axios didn't get any data
                if(!response.data){
                    setAlertMessage("There's a problem deleting the user from your contact list");
                    setAlertOpen(true);
                }

                // If axios successfully get the data
                if(response.data){
                    removeFromContact(response.data.contact);
                    setAlertMessage('User has been successfully deleted from your contact list.');
                    setAlertOpen(true);
                }
            }).catch(() => {
                setAlertMessage("There's a problem adding the user to your contact list");
                setAlertOpen(true);
            })
        }
    }

    return(
        <StyledChatHeader>
            { alertOpen ? <ModalAlert setAlertMessage={setAlertMessage} message={alertMessage} setModalOpen={setAlertOpen}/> : '' }
            <UserInfo deleteContact={deleteContact} open={infoOpen} setOpen={setInfoOpen} username={username} email={email} photo={photo}/>
            <div className="header-left">
                <h2 className="user-name">{username}</h2>
                <h3 className="user-email">{email} {typingMessage ? <span>is typing...</span> : ''}</h3>
            </div>
            <div className="heder-right">
                { checkIsOnContact(contacts)}
                <button onClick={() => setInfoOpen(!infoOpen)}>User Info</button>
            </div>
        </StyledChatHeader>
    )
}

const StyledChatHeader = Styled.div`
    padding:1rem 2rem;
    border-bottom:1px solid #ddd;
    background:#fff;
    display:flex;
    justify-content:space-between;
    min-height:79px;
    box-shadow:0 2px 4px #0000000d;

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

const mapDispatchToProps = dispatch => ({
    removeFromContact: (e) => dispatch(removeFromContact(e)),
    addToContact: (e) => dispatch(addToContact(e))
});

const mapStateToProps = state => ({
    user: state.user.user,
    contacts: state.contacts.contacts
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatHeader);