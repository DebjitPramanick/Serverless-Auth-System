import React from 'react'
import "./styles.css"

const Header = (props) => {
    return (
        <div className="form-header">
            <h1>{props.text}</h1>
        </div>
    )
}

export default Header
