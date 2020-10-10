import { combineReducers } from 'redux'
import contact from './contact'
import user from './user'
import room from './rooms'

export default combineReducers({
    user: user,
    contacts: contact,
    rooms: room
})