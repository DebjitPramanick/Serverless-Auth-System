 import axios from 'axios'

const instance = axios.create({
    baseURL: "https://qfcoloxjj7.execute-api.us-east-2.amazonaws.com/dev"
})

export default instance