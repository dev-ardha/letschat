import { ADD_CONTACT, CONTACT_LOADED, REMOVE_CONTACT } from '../actions/types'

const initialState = {
    contacts: null,
}

export default function(state = initialState, action){
    switch (action.type) {
        case CONTACT_LOADED:
            return {
                ...state,
                contacts: action.payload,
            }
        case REMOVE_CONTACT:
            return {
                ...state,
                contacts: action.payload
            }
        case ADD_CONTACT:
            return {
                ...state,
                contacts: action.payload
            }
        default:
            return {
                ...state
            }
    }
}