import React from 'react';

const Message = ({message,className}) => {
    if (message === null) {
        return null;
    }

    return (
        <div className={className}>
            {message}
        </div>
    )
}

export default Message;