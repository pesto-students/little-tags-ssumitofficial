import React, { useState } from 'react';
import Sidebar from '../Sidebard/Sidebar.jsx';
import './Header.scss';

export default function Header() {
    const [isHidden, setIsHidden] = useState(true);

    return (
        <div className="main-container">
            <Sidebar isHidden={isHidden} handleCloseSidebar={() => setIsHidden(true)}></Sidebar>
            <div className="row py-3 shadow-sm header">
                <div className="col-6 text-left">
                    <i className="fa fa-bars pointer" aria-hidden="true" onClick={() => setIsHidden(false)}></i>
                    <a href="/">
                        <img className="logo ml-4" src="/assets/img/Logo.PNG" alt="LOGO" />
                    </a>
                </div>
                <div className="col-4">
                    <div className="form-control">
                        <i className="fa fa-search pull-left mt-1" aria-hidden="true"></i>
                        <input type="text" className="border-0 search-input" />
                    </div>
                </div>
                <div className="col-2 text-right">
                    <button className="btn btn-primary">
                        <i className="fa fa-sign-in mr-2" aria-hidden="true"></i>Login
                </button>
                    <i className="fa fa-shopping-cart ml-3 pointer" aria-hidden="true"></i>
                </div>
            </div>
        </div>
    );
}