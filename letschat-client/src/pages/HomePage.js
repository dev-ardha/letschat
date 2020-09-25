import React, { useContext, useState, useEffect } from 'react';
import Styled from '@emotion/styled';
import Sidebar from '../components/Sidebar'
import ChatBox from '../components/ChatBox'
import Navbar from '../components/Navbar'
import SideNav from '../components/SideNav'
import { UserContext } from '../contexts/UserContext'
import Loader from '../components/Loader';
import Axios from 'axios';
import { useHistory } from 'react-router-dom'
import { SocketProvider } from '../contexts/SocketContext'

function HomePage() {
    const [user, setUser] = useContext(UserContext)
    const [openedRoom, setOpenedRoom] = useState()
    const rooms = user?.rooms;
    const [currentText, setCurrentText] = useState()
    const [listOfMessage, setListOfMessage] = useState()

    // Get user and set to global state
    const history = useHistory()

    const me = window.localStorage.getItem('userId')
    if(!me){
        history.push('/login')
    }

    useEffect(() => {
        async function fetchData(){
            const response = await Axios.get(`http://localhost:4000/api/v1/auth/me/${me}`)
            if(response.data){
                setUser(response.data)
            }else{
                history.push('/login')
            }
        }
        fetchData();
        // eslint-disable-next-line
    }, [])

    return (
    <SocketProvider id={user?._id}>
        {
            user ? (
            <StyledHomePage>
                <div className="page-left">
                    <SideNav/>
                </div>
                <div className="page-right">
                    <Navbar/>
                    <div className="page-body">
                        <Sidebar
                            rooms={rooms}
                            setOpenedRoom={setOpenedRoom}
                            setListOfMessage={setListOfMessage}
                        />
                        <ChatBox
                            openedRoom={openedRoom}
                            currentText={currentText}
                            setCurrentText={setCurrentText}
                            listOfMessage={listOfMessage}
                            setListOfMessage={setListOfMessage}
                        />
                    </div>
                </div>
            </StyledHomePage>
            ) : <Loader fullpage={true}/>
        }
    </SocketProvider>
    );
}

const StyledHomePage = Styled.div`
    height:calc(100vh - 45px);
    background-color: #fff;
    display:flex;

    .page-right{
        flex:1;

        .page-body{
            display: flex;
            height: 100%;
            width: 100%;
        }
    }
`

export default HomePage;
