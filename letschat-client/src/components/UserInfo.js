import React from 'react'
import Styled from '@emotion/styled'
import { HiArrowCircleRight } from 'react-icons/hi'
import { HiUser } from 'react-icons/hi'

export default function Settings({open, setOpen, username, photo, deleteContact}) {
    return (
        <UserInfoStyled open={open}>
            <div className="settings-header">
                <h2 onClick={() => setOpen(!open)}>User Info<span><HiArrowCircleRight/></span></h2>
            </div>
            <ul className="settings-body">
            <div className="user-details">
                <div className="user-photo">
                    {
                        photo ? <img src={photo} alt="User avatar"/> : <HiUser/>
                    }
                </div>
                <h2>{username}</h2>
            </div>
                <button onClick={deleteContact}>Delete Contact</button>
            </ul>
        </UserInfoStyled>
    )
}

const UserInfoStyled = Styled.div`
    display: block;
    position: fixed;
    z-index: 1;
    right: -24%;
    top: 0;
    width: 24%;
    height: 100%;
    overflow: auto;
    background:#fff;
    transition:all .4s ease-in-out;
    display:flex;
    flex-direction:column;
    border-left:1px solid #ddd;

    ${ props => props.open ? 'right:0;' : '' }

    .user-details{
        margin-top:3rem;
        display:flex;
        flex-direction:column;
        align-items:center;

        .user-photo{
            height:120px;
            width:120px;
            background:#ddd;
            border-radius:50%;
            margin-bottom:1rem;
            font-size: 6rem;
            color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            object-fit:cover;

            img{
                width:100%;
                height:100%;
                border-radius:50%;
            }
        }

        h2{
            margin:0;
        }
    }

    button{
        padding: .75rem 1rem;
        background: #ffe6e9;
        border-radius: .5rem;
        cursor: pointer;
        color: #ff214a;
        border: 1px solid #ff214a;
        align-self: center;
        position: fixed;
        bottom: 1.4rem;

        &:hover{
            background: #ff214a;
            color:#fff;
        }
    }

    .settings-header{
        height:79px;
        width:100%;
        border-bottom:1px solid #ddd;
        background:#1990ff;
        font-size: .9rem;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        padding:0 2rem .5rem 2rem;
        color: #fff;

        h2{
            display:flex;
            align-items:center;
            cursor:pointer;
            font-size:1.2rem;
            font-weight:500;
            justify-content: space-between;
            width:100%;

            span{
                font-size: 2.25rem;
                display: flex;
                transform: translateY(2px);
            }
        }
    }

    .settings-body{
        padding:0;
        list-style:none;
        margin:0;
        display: flex;
        flex-direction: column;

        li{
            padding: 1.2rem 2rem;
            border-bottom: 1px solid #eee;
            display:flex;
            justify-content:space-between;
            align-items:center;
        }
    }
`