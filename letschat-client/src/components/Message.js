import React, { useRef, useEffect } from 'react'
import Styled from '@emotion/styled'
import { cekPergantianHari, getTime } from '../utils/date'
import { HiUser } from 'react-icons/hi'
import {format} from 'date-fns'

function Message({position, message, index, listOfMessage, timestamp, messageBeforeThis, messageObject}){

    const isLastMessage = listOfMessage.length -1 === index;
    const lastMessageRef = useRef();

    useEffect(() => {
        if(lastMessageRef.current){
            lastMessageRef.current.scrollIntoView({behavior: 'smooth'})
        }
    })

    const getDate = new Date(messageObject.createdAt)
    const day = format(getDate, 'MMMM dd, yyyy')

    return(
        <>
        { cekPergantianHari(messageBeforeThis, messageObject) ? '' : <StyledDate><span>{day}</span></StyledDate> }
        <StyledMessage position={position}>
            <div className="message-wrapper" ref={isLastMessage ? lastMessageRef : null}>
                { position === 'left' ? (
                <div className="avatar">
                    <HiUser/>
                </div>
                ) : '' }
                <div className="message-body">
                    <p>{message}</p>
                </div>
            </div>
            <span className="timestamp">{getTime(timestamp)}</span>
        </StyledMessage>
        </>
    )
}

const StyledDate = Styled.span`
    padding: 1rem 0;
    display: flex;
    justify-content: center;

    span{
        padding: 6px 12px;
        background: #f6f7f9;
        border-radius: 1rem;
        font-size: .9rem;
    }
`

const StyledMessage = Styled.div`
    ${(props) => props.position === 'left' ? 'align-self:flex-start;.message-body{background:#F6F7F9;}' : 'align-self:flex-end;.message-body{background:#1990FF;color:#fff;}'}
    display:flex;
    flex-direction:column;

    .timestamp{
        color:#777;
        font-size:.9rem;
        margin-bottom:1rem;
        ${(props) => props.position === 'left' ? 'align-self:flex-end;' : 'align-self:flex-start;'}
    }

    .message-wrapper{
        display:inline-box;
        margin-bottom:.5rem;

        .avatar{
            width:40px;
            height:40px;
            background:#ddd;
            margin-right:1rem;
            border-radius:50%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 2rem;
            color: #fff;
        }
        .message-body{
            max-width:300px;
            padding:.2rem 1rem;
            border-radius:1rem;

            p{
                line-height:1.3rem;
            }
        }
    }
`

export default Message;