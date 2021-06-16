import React from 'react'
import './TostrMessage.scss'

export default function TostrMessage({ title, message, isError }) {
    
    if (message) {
        return <div className="tostr-container">
            <div className={`tostr p-2 text-white shadow-lg ${isError ? 'error' : 'success'}`}>
                <div className="row">
                    <div className="col-2 p-0 d-flex pl-1">
                        {
                            isError ?
                            <i className="fa fa-times-circle tostr-icons" aria-hidden="true"></i> :
                            <i className="fa fa-check-circle tostr-icons" aria-hidden="true"></i>
                        }
                    </div>
                    <div className="col-10 p-0">
                        <div className="row">
                            <b>{title}</b>
                        </div>
                        <div className="row">
                            {message}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
    else {
        return '';
    }
}