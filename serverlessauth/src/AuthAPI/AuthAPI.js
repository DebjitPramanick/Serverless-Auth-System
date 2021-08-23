import axios from "../utils/axios"
const API_KEY = 'w4WMcO1PMt2ouML0kKuN867911bGtj8g1F9gJS86'

const getResponse = async (method, endpoint, payload, apiKey) => {
    let res;
    switch (method) {
        case 'POST':
            res = axios.post(endpoint, payload, {
                headers: { 'x-api-key': apiKey }
            })

            break;
        case 'GET':
            res = axios.get(endpoint, {
                headers: { 'x-api-key': apiKey }
            })
            break;
        default:
            res = null
            break;
    }
    return res
}

export const register = async (data) => {
    const endpoint = "/register"
    let payload = {
        name: data.name,
        email: data.email,
        username: data.username,
        password: data.password
    }
    payload = JSON.stringify(payload)
    return getResponse("POST", endpoint, payload, API_KEY)
}

export const login = async (data) => {
    const endpoint = "/login"
    let payload = {
        username: data.username,
        password: data.password
    }
    payload = JSON.stringify(payload)
    return getResponse("POST", endpoint, payload, API_KEY)
}

export const verify = async (data) => {
    const endpoint = "/verify"
    const payload = {
        user: {
            username: data.username
        },
        token: data.token
    }
    return getResponse("POST", endpoint, payload, API_KEY)
}