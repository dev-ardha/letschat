import { ROOM_LOADED, UPDATE_ROOM } from '../actions/types'

const initialState = {
    rooms: null,
}

export default function(state = initialState, action){
    switch (action.type) {
        case ROOM_LOADED:
            return {
                ...state,
                rooms: action.payload,
            }
        case UPDATE_ROOM:
            let id = action.payload.roomId;
            let messages = action.payload.messages
            return {
                ...state,
                rooms: {
                    ...state.rooms,
                    [id]: messages
                }
            }
        default:
            return {
                ...state
            }
    }
}