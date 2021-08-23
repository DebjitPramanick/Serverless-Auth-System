import React from 'react'
import "./styles.css"

const Message = (props) => {
    return (
        <div className="msg-box">
            <p className={`${props.code < 400 ? 'green' : ''}`}>{props.msg}</p>
        </div>
    )
}

export default Message
