import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://burger-builder-20178.firebaseio.com/'
})

export default instance