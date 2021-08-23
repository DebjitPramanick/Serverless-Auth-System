import React, { useState } from 'react'
import Form from '../components/Form'
import "./style.css"
import { login } from "../AuthAPI/AuthAPI"

const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState(null)
    // const [name, setName] = useState('')
    // const [email, setEmail] = useState('')

    const userLogin = async () => {
        console.log(username, password)
        if (!username || !password) {
            alert("Fill all the fields.")
        }
        else {
            try {
                let response = await login({ username, password })
                    .then(res => res)
                localStorage.setItem('data', JSON.stringify(response.data))
                let msg = 'Successfully logged in.'
                let code = response.status
                setMessage({msg,code})
            } catch (err) {
                console.log(err.response.data)
                let msg = err.response.data.message
                let code = err.response.status
                setMessage({msg,code})
            }
        }
    }

    return (
        <div className="container">
            <Form
                title={'Log In'}
                buttonLabel={'Log In'}
                placeholders={['Enter username', 'Enter password']}
                funcs={[setUsername, setPassword]}
                action={userLogin} 
                message={message}/>
        </div>
    )
}

export default Login
