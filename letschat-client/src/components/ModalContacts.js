import styled from '@emotion/styled'
import React from 'react'
import { HiUser } from 'react-icons/hi'
import { connect } from 'react-redux'
import { getEmail, getId, getUsername, getAvatar } from '../utils/user'

function ModalContacts({ setModalOpen, contacts, user, roomList, setOpenedRoom }){

    const openedRoomSend = (room, user, contacts) => {
        return {
            _id: room._id,
            recipientId: getId(user, room),
            username: getUsername(user, room, contacts),
            photo: getAvatar(user, room),
            email: getEmail(user, room),
        }
    }

    return(
        <React.Fragment>
            <ModalContactsStyled>
                <div className="modal-content">
                    <ul className="contacts">
                        {
                            roomList.length ? (
                                <p>You don't have any contact yet</p>
                            ): (
                                roomList?.map((room, index) => {
                                    console.log(room)
                                    return(
                                        <li className="contact" key={index} onClick={() => {
                                            setOpenedRoom(openedRoomSend(room, user, contacts))
                                            setModalOpen(false)
                                        }}>
                                            <div className="avatar">
                                                <HiUser/>
                                            </div>
                                            <div className="chat-info">
                                                <h2>{getUsername(user, room, contacts)}</h2>
                                            </div>
                                        </li>  
                                    )
                                })
                            )
                        }
                    </ul>
                    <div className="buttons">
                        <button className="left" onClick={() => setModalOpen(false)}>Cancel</button>
                    </div>
                </div>
            </ModalContactsStyled>
        </React.Fragment>
    )
}

const ModalContactsStyled = styled.div`
    display: block;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0,0,0);
    background-color: rgba(0,0,0,0.4);

    .buttons{
        display:flex;

        button{
            border: 1px solid #eee;
            background: #fff;
            width: 100%;
            padding: 1rem;
            cursor:pointer;
            color:#1990FF;
            font-weight:bold;

            &:hover{
                background:#f9f9f9;
            }
        }

        .left{
            border-radius: 1px 1px 1rem 1rem;
            border-right: 0;
        }
        .right{
            border-radius: 1px 1px 1rem 1px;
        }
    }

    .modal-content {
        background-color: #fefefe;
        margin: 11% auto;
        border: 1px solid #888;
        width: 27%;
        max-height:360px;
        box-shadow: 0 1px 7px #00000038;
        border-radius: 1rem;
        display: flex;
        flex-direction: column;
        position: relative;
        text-align:center;

        .contacts{
            min-height:300px;
            overflow:auto;
            display:flex;
            flex-direction:column;
            list-style:none;
            padding: .5rem 0;

            p{
                background: #F6F7F9;
                padding: .5rem 1rem;
                border-radius: 2rem;
                max-width: 80%;
                margin: 39% auto 0 auto;
            }

            li:first-of-type{
                border-top:1px solid #eee;
            }

            li{
                display:flex;
                align-items:center;
                padding:.5rem 2rem;
                border-bottom:1px solid #eee;
                cursor:pointer;

                &:hover{
                    background:#f9f9f9;
                }

                .avatar{
                    height:40px;
                    margin-right:1rem;
                    width:40px;
                    border-radius:50%;
                    background:#ddd;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 2rem;
                    color: #fff;
                    object-fit:cover;
                }

                .chat-info{
                    h2{
                        font-size:16px;
                        font-weight: 400;
                    }
                }
            }
        }
    }

    .close {
        color: #aaa;
        font-size: 27px;
        font-weight: bold;
        cursor: pointer;
        position: absolute;
        right: 1rem;
        top: 1px;
    }

    .close:hover,
    .close:focus {
        color: black;
        text-decoration: none;
        cursor: pointer;
    }
`

const mapStateToProps = state => ({
    contacts: state.contacts.contacts,
    user: state.user.user,
})

export default connect(mapStateToProps)(ModalContacts);