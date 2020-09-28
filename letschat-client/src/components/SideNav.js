import React, { useContext } from 'react'
import Styled from '@emotion/styled'
import {HiUser} from 'react-icons/hi'
import { UserContext } from '../contexts/UserContext'

function SideNav(){
    const [user] = useContext(UserContext)

    return(
        <StyledSideNav>
            <span className="setting">
                <button>Settings</button>
            </span>
            <div className="user-details">
                <div className="user-photo">
                    {
                        user?.photo ? <img src={user.photo} alt="User avatar"/> : <HiUser/>
                    }
                </div>
            </div>
            <p>
                Made with <span role="img" aria-label="love">&#10084;&#65039;</span> and a keyboard by devArdha                
            </p>
            <a href="https://www.buymeacoffee.com/devardha">
                <img
                    src="https://cdn.buymeacoffee.com/buttons/v2/default-black.png"
                    alt="Buy Me A Coffee"/>
            </a>
            <p>Copyright 2020 - LetsChat</p>
        </StyledSideNav>
    )
}

const StyledSideNav = Styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    height:100vh;
    border-left:1px solid #ddd;
    position:relative;

    .setting{
        position:absolute;
        right:1rem;
        top:1rem;
        
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
    .user-details{
        margin-bottom:3rem;
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
    }

    p{
        width:80%;
        line-height:1.5rem;
        text-align:center;
        margin:1rem auto 2rem auto;
    }

    a{
        width:150px;

        img{
            width:100%;
        }
    }
`

export default SideNav;