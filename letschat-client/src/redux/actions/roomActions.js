import { ROOM_LOADED, UPDATE_ROOM } from './types'

export const loadRoom = (room) => (dispatch) => {
    dispatch({
        type: ROOM_LOADED,
        payload: room
    })
}

export const updateRoom = (payload) => (dispatch) => {
    dispatch({
        type: UPDATE_ROOM,
        payload: payload
    })
}