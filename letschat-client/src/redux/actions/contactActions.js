import { CONTACT_LOADED, REMOVE_CONTACT, ADD_CONTACT } from './types'

export const loadContact = (contact) => (dispatch) => {
    dispatch({
        type: CONTACT_LOADED,
        payload: contact
    })
}

export const removeFromContact = (contact) => (dispatch) => {
    dispatch({
        type: REMOVE_CONTACT,
        payload: contact
    })
}

export const addToContact = (contact) => (dispatch) => {
    dispatch({
        type: ADD_CONTACT,
        payload: contact
    })
}