import { AUTH_SUCCESS } from './types'

// Login A User
export const loadUser = (user) => (dispatch) => {
    dispatch({
        type: AUTH_SUCCESS,
        payload: user
    })
}