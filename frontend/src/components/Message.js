import React from 'react';
import { Alert } from 'react-bootstrap';

const Message = ({ variant, children }) => {
    return (
        <>
            <Alert className='' variant={variant}>
                {children}
            </Alert>
        </>
    );
};

export default Message;