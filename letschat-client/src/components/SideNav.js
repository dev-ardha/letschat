import React from 'react'
import Styled from '@emotion/styled'
import {HiUser} from 'react-icons/hi'
import { connect } from 'react-redux'
import Settings from './Settings'

function SideNav({user}){
    return(
        <StyledSideNav>
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
            <Settings/>
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
            cursor:pointer;
            overflow:hidden;
            position:relative;

            &::before{
                content: "Edit";
                text-align:center;
                font-size: 12px;
                padding-top: 8px;
                font-weight: 600;
                display:none;
                bottom:-5px;
                width:100%;
                height:30px;
                background:#00000070;
                position:absolute;
            }  

            &:hover{
                &::before{
                    display:block;
                }
            }

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

const mapStateToProps = state => ({
    user: state.user.user
})

export default connect(mapStateToProps )(SideNav);