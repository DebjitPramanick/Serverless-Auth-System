import React, { useState } from 'react'
import { register } from '../AuthAPI/AuthAPI'
import Form from '../components/Form'

const Register = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState(null)

    const userRegister = async () => {
        console.log(username, password)
        if (!username || !password || !name || !email) {
            alert("Fill all the fields.")
        }
        else {
            try {
                let response = await register({ name, email, username, password })
                    .then(res => res)
                localStorage.setItem('data', JSON.stringify(response.data))
                let msg = 'Successfully registered.'
                let code = response.status
                setMessage({ msg, code })
            } catch (err) {
                console.log(err.response.data)
                let msg = err.response.data.message
                let code = err.response.status
                setMessage({ msg, code })
            }
        }
    }

    return (
        <div className="container">
            <Form
                title={'Register'}
                buttonLabel={'Register'}
                placeholders={[ 'Enter name', 'Enter email','Enter username', 'Enter password']}
                funcs={[setName, setEmail ,setUsername, setPassword]}
                action={userRegister}
                message={message} />
        </div>
    )
}

export default Register
