import React from 'react'
import "./styles.css"

const Button = (props) => {
    return (
        <div className="form-submit-btn">
            <button onClick={props.onClick}>{props.label}</button>
        </div>
    )
}

export default Button
