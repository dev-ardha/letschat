import styled from '@emotion/styled'
import React from 'react'

function ModalInput({setModalOpen, inputHandler, actionHandler}){
    return(
        <React.Fragment>
            <ModalInputStyled>
                <div className="modal-content">
                    <span className="close" onClick={() => {setModalOpen(false); inputHandler('')}}>&times;</span>
                    <p>Enter your friend's email</p>
                    <input placeholder="Email" onChange={(e) => inputHandler(e.target.value)}/>
                    <div className="buttons">
                        <button className="left" onClick={actionHandler}>Add</button>
                        <button className="right" onClick={() => {setModalOpen(false); inputHandler('')}}>Cancel</button>
                    </div>
                </div>
            </ModalInputStyled>
        </React.Fragment>
    )
}

const ModalInputStyled = styled.div`
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
        width: 30%;
        box-shadow: 0 1px 7px #00000038;
        border-radius: 1rem;
        display: flex;
        flex-direction: column;
        position: relative;
        text-align:center;

        p{
            margin-top:3rem;
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
                width: 50%;
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
                border-radius: 1px 1px 1px 1rem;
                border-right: 0;
                &:focus{
                    background:#eaf5ff !important;
                }
            }
            .right{
                border-radius: 1px 1px 1rem 1px;
                &:focus{
                    background:#eaf5ff !important;
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
        color: red;
        text-decoration: none;
        cursor: pointer;
    }
`

export default ModalInput