import React, { useState } from 'react'
import Styled from '@emotion/styled'
import { HiArrowCircleRight } from 'react-icons/hi'

export default function Settings({open, setOpen}) {
    const [isDarkMode, setIsDarkMode] = useState(false);

    return (
        <SettingsStyled open={open} isDarkMode={isDarkMode}>
            <div className="settings-header">
                <h2 onClick={() => setOpen(!open)}>Settings <span><HiArrowCircleRight/></span></h2>
            </div>
            <ul className="settings-body">
                <li>
                    <span>Turn on dark mode</span>
                    <span className="theme-switch" onClick={() => setIsDarkMode(!isDarkMode)}>
                        <span className="switch-button"></span>
                    </span>
                </li>
            </ul>
        </SettingsStyled>
    )
}

const SettingsStyled = Styled.div`
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

        li{
            padding: 1.2rem 2rem;
            border-bottom: 1px solid #eee;
            display:flex;
            justify-content:space-between;
            align-items:center;
        }

        .theme-switch{
            width: 40px;
            border-radius: 2rem;
            display: flex;
            background: ${props => props.isDarkMode ? '#4AD963' : '#ddd'};
            cursor:pointer;
            padding:1px;

            .switch-button{
                background: #fff;
                height: 20px;
                width: 20px;
                display: block;
                border-radius: 50%;
                transition:all .2s ease-in-out;
                transform: ${props => props.isDarkMode ? 'translateX(18px)' : ''};
            }
        }
    }
`