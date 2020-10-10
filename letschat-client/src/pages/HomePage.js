import React, { useState, useEffect } from 'react';
import Styled from '@emotion/styled';
import Sidebar from '../components/Sidebar'
import ChatBox from '../components/ChatBox'
import Navbar from '../components/Navbar'
import SideNav from '../components/SideNav'
import Loader from '../components/Loader';
import axios from '../utils/axios'
import { useHistory } from 'react-router-dom'
import { SocketProvider } from '../contexts/SocketContext'
import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';
import { connect } from 'react-redux'
import { loadUser } from '../redux/actions/userActions'
import { loadRoom } from '../redux/actions/roomActions'

function HomePage({loadUser, user, loadRoom}) {
    // Context
    const [openedRoom, setOpenedRoom] = useState();
    const rooms = user?.rooms;
    const [currentText, setCurrentText] = useState();

    const history = useHistory();
    const me = window.localStorage.getItem('userId')

    if(!me){
        history.push('/login')
    }

    useEffect(() => {
        async function fetchData(){
            const response = await axios.get(`/api/v1/auth/me/${me}`)
            if(response.data){
                const secret = response.data.secret
                const token = Cookies.get('accToken');

                if(!token){
                    history.push('/login')
                }

                try {
                    const decoded = jwt.verify(token, secret);
                    if(decoded){
                        if(decoded.id === response.data.user._id){
                            loadUser(response.data.user)

                            let rooms = {}
                            response.data.user.rooms.map(room => {
                                return rooms[room._id] = room.messages
                            })

                            loadRoom(rooms);
                        }
                    }
                } catch (error) {
                    history.push('/login')
                }
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
                    <Navbar/>
                    <div className="page-body">
                        <Sidebar
                            rooms={rooms}
                            setOpenedRoom={setOpenedRoom}
                            openedRoom={openedRoom}
                        />
                        <ChatBox
                            openedRoom={openedRoom}
                            currentText={currentText}
                            setCurrentText={setCurrentText}
                        />
                    </div>
                </div>
                <div className="page-right">
                    <SideNav/>
                </div>
            </StyledHomePage>
            ) : <Loader fullpage={true}/>
        }
    </SocketProvider>
    );
}

const StyledHomePage = Styled.div`
    height:100vh;
    background-color: #fff;
    display:flex;

    .page-left{
        flex:1;

        .page-body{
            display: flex;
            height: 100%;
            width: 100%;
        }
    }

    .page-right{
        width:24%;
    }
`

const mapDispatchToProps = dispatch => ({
    loadUser: (e) => dispatch(loadUser(e)),
    loadRoom: (e) => dispatch(loadRoom(e))
});

const mapStateToProps = state => ({
    user: state.user.user,
})

export default connect(mapStateToProps, mapDispatchToProps )(HomePage);