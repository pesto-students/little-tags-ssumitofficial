import React, { useState } from 'react'
import TostrMessage from '../components/TostrMessage/TostrMessage'

export const TostrContext = React.createContext()

export const TostrContextProvider = (props) => {
    const [title, setTitle] = useState();
    const [message, setMessage] = useState();
    const [isError, setIsError] = useState();

    const showError = (pTitle, pMessage) => {
        setTitle(pTitle);
        setMessage(pMessage);
        setIsError(true);
        reset();
    }

    const showSuccess = (pTitle, pMessage) => {
        setTitle(pTitle);
        setMessage(pMessage);
        setIsError(false);
        reset();
    }

    const reset = () => {
        setTimeout(() => {
            setTitle(null);
            setMessage(null);
            setIsError(null);
        }, 2000);
    }

    return <TostrContext.Provider value={[showError, showSuccess]}>
        <TostrMessage title={title} message={message} isError={isError}></TostrMessage>
        {props.children}
    </TostrContext.Provider>
}