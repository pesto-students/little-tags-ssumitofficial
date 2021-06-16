import React, { useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import withAutherization from '../Session/withAutherization'
import Sidebar from '../Sidebard/Sidebar.jsx';
import Login from '../Login/Login.jsx'
import { CartContext } from '../../contexts/Cart'
import './Header.scss';

const ENTER_KEY = 13;
function Header({ authUser }) {
    const [isHidden, setIsHidden] = useState(true);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [cart] = useContext(CartContext);
    const [searchText, setSearchText] = useState('');
    let history = useHistory();
    const search = useLocation().search;
    const category = new URLSearchParams(search).get('category');

    const handleCartClick = () => {
        setIsHidden(true);
        if (!authUser) {
            setIsLoginModalOpen(true);
            return;
        }

        history.push('/cart')
    }

    const handleSearchTextChange = (e) => {
        if (e.charCode === ENTER_KEY) {
            let url = '/products?';
            if (category && category.length > 0) {
                url += `category=${category}&&`;
            }
            url += `searchText=${searchText}`;
            history.push(url);
        }
    }

    return (
        <div className="main-container">
            {
                !!isLoginModalOpen &&
                <Login handleCloseLoginModal={() => setIsLoginModalOpen(false)}></Login>
            }
            <Sidebar isHidden={isHidden} handleCloseSidebar={() => setIsHidden(true)}></Sidebar>
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
                        <input type="text" className="border-0 search-input" value={searchText} onKeyPress={(e) => handleSearchTextChange(e)} onChange={(e) => setSearchText(e.target.value)} />
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

                    <i className="fa fa-shopping-cart ml-3 pointer" aria-hidden="true" onClick={handleCartClick}></i>
                    {
                        cart && cart.length > 0 ?
                            <label className="counter counter-lg text-center pointer">{cart.length}</label>
                            : ''
                    }
                </div>
            </div>
        </div>
    );
}

export default withAutherization(Header);