import axios from './axios'

export const getEmail = (user, room) => {
    return room.participants[0].email === user.email ? room.participants[1].email : room.participants[0].email
}

export const getId = (user, room) => {
    return room.participants[0]._id === user._id ? room.participants[1]._id : room.participants[0]._id
}

export const getAvatar = (user, room) => {
    return room.participants[0]._id === user._id ? room.participants[1].photo : room.participants[0].photo
}

export const getUsername = (user, room, contacts) => {
    const uname = room.participants[0]._id === user._id ? room.participants[1].username : room.participants[0].username

    // Check if username exist in user contacts
    if(contacts?.some(param => param.username === uname)){
        return uname
    }else{
        return getEmail(user, room);
    }
}

export const limitCharacter = (character, max) => {
    if(character.length > max) {
        return `${character.substring(0, max)}...`
    };

    return character
}

// Data fetching
export async function fetchData(openedRoom){
    const response = await axios.get(`/api/v1/message/sync/${openedRoom?._id}`)
    if(response.data){
        return response.data.messages
    }
}

export async function fetchNewMessage(newMessage){
    const response = await axios.get(`/api/v1/message/sync/${newMessage?.roomId}`)
    if(response.data){
        return response.data.messages
    }
}

export async function readMessages(meId, roomId){
    const response = await axios.post(`/api/v1/message/read`, {
        meId: meId,
        roomId: roomId
    })
    if(response.data){
        return response.data
    }
}