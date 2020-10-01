import styled from '@emotion/styled'
import React from 'react'

function ModalAlert({setModalOpen, message, setAlertMessage}){
    return(
        <React.Fragment>
            <ModalAlertStyled>
                <div className="modal-content">
                    <span className="close" onClick={() => {setModalOpen(false); setAlertMessage('')}}>&times;</span>
                    <p>{message ? message : ''}</p>
                    <div className="buttons">
                        <button className="left" onClick={() => {setModalOpen(false); setAlertMessage('')}}>OK</button>
                    </div>
                </div>
            </ModalAlertStyled>
        </React.Fragment>
    )
}

const ModalAlertStyled = styled.div`
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

    .modal-content {
        background-color: #fefefe;
        margin: 15% auto;
        border: 1px solid #888;
        width: 35%;
        box-shadow: 0 1px 7px #00000038;
        border-radius: 1rem;
        display: flex;
        flex-direction: column;
        position: relative;
        text-align:center;

        p{
            margin-top:3rem;
            width: 78%;
            margin-left: auto;
            margin-right: auto;
            line-height: 1.5rem;
        }
        input{
            border-radius: 3rem;
            border: 1px solid #ddd;
            padding: .75rem 1rem;
            width: 90%;
            margin: .5rem auto .5rem auto;
        }
        .buttons{
            display:flex;

            button{
                border: 1px solid #eee;
                background: #fff;
                width: 100%;
                padding: 1rem;
                margin-top: 1rem;
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

export default ModalAlert