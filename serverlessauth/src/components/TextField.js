import React from 'react'
import "./styles.css"

const TextField = (props) => {
    return (
        <div className="form-text-field">
            <input placeholder={props.placeholder}
            onChange={(e) => props.onChange(e.target.value)}></input>
        </div>
    )
}

export default TextField
