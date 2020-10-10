import { AUTH_FAILED, AUTH_SUCCESS } from '../actions/types'

const initialState = {
    user: null,
    isAuthenticated: null,
}

export default function(state = initialState, action){
    switch (action.type) {
        case AUTH_SUCCESS:
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
            }
        case AUTH_FAILED:
            return {
                ...state,
                user: null,
                isAuthenticated: false
            }
        default:
            return {
                ...state
            }
    }
}