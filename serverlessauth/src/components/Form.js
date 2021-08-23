import React from 'react'
import Button from './Button'
import Header from './Header'
import TextField from './TextField'
import "./styles.css"
import Message from './Message'
import {useHistory, Link} from 'react-router-dom'

const Form = (props) => {

    const history = useHistory()
    const path = history.location.pathname.split('/')[1]

    return (
        <div className="form-container">
            <Header text={props.title} />
            {props.message && 
            (<Message msg={props.message.msg} code={props.message.code} />)}
            {props.placeholders.map((p,i) => (
                <TextField 
                key={i}
                placeholder={p}
                onChange={props.funcs[i]} />
            ))}
            <Button label={props.buttonLabel}
            onClick={props.action} />
            <Link 
            className='helper-text'
            to={`${path!=='login' ? '/login' : '/register'}`}>
                {path==='login' ? 'Create Account' : 'Log In'}
            </Link>
        </div>
    )
}

export default Form
