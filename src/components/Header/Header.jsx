import React, { useContext, useState } from 'react';
import withAutherization from '../Session/withAutherization'
import Sidebar from '../Sidebard/Sidebar.jsx';
import Login from '../Login/Login.jsx'
import Address from '../Address/Address'
import { CartContext } from '../../contexts/Cart'
import './Header.scss';

function Header({ authUser }) {
    const [isHidden, setIsHidden] = useState(true);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const [cart] = useContext(CartContext);

    const handleAddresModalDisplay = (isOpen) => {
        if (isOpen) {
            setIsHidden(true);
            if (!authUser) {
                setIsLoginModalOpen(true);
                return;
            }
            else {
                setIsAddressModalOpen(isOpen);
            }
        }
        setIsAddressModalOpen(isOpen);
    }

    return (
        <div className="main-container">
            {
                !!isAddressModalOpen && <Address handleClose={handleAddresModalDisplay}></Address>
            }
            {
                !!isLoginModalOpen &&
                <Login handleCloseLoginModal={() => setIsLoginModalOpen(false)}></Login>
            }
            <Sidebar isHidden={isHidden} handleCloseSidebar={() => setIsHidden(true)} handleAddresModalDisplay={handleAddresModalDisplay}></Sidebar>
            <div className="row py-3 shadow-sm header">
                <div className="col-5 text-left">
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
                <div className="col-3 text-right p-0 pr-2">
                    {
                        authUser ?
                            <span>
                                <i className="fa fa-user-circle mr-2" aria-hidden="true"></i>
                                Welcome {authUser.userName}
                            </span>
                            : <button className="btn btn-primary" onClick={() => setIsLoginModalOpen(true)}>
                                <i className="fa fa-sign-in mr-2" aria-hidden="true"></i>Login</button>
                    }

                    <a href="/cart" className="text-dark">
                        <i className="fa fa-shopping-cart ml-3 pointer" aria-hidden="true"></i>
                        {
                            cart && cart.length > 0 ?
                                <label className="counter counter-lg text-center pointer">{cart.length}</label>
                                : ''
                        }
                    </a>
                </div>
            </div>
        </div>
    );
}

export default withAutherization(Header);