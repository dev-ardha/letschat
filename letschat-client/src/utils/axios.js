import Axios from 'axios'

const instance = Axios.create({
    baseURL: 'https://web-letschat.herokuapp.com'
})

export default instance;