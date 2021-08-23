import React from 'react'
import Button from './Button'
import Header from './Header'
import TextField from './TextField'
import "./styles.css"
import Message from './Message'

const Form = (props) => {

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
        </div>
    )
}

export default Form
