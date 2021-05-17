import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Categories } from '../../Helpers/Categories.js';
import './Sidebar.scss';

export default function Sidebar({ isHidden, handleCloseSidebar }) {
    const [className, setClassName] = useState(isHidden ? 'sidebar sidebar-close' : 'sidebar shadow-lg sidebar-open');

    useEffect(() => {
        setClassName(isHidden ? 'sidebar sidebar-close' : 'sidebar shadow-lg sidebar-open')
    }, [isHidden]);

    const categoryContent = Object.entries(Categories).map(element => {
        const url = `/products?category=${element[1].toLocaleLowerCase().replace(' ', '-')}`;
        return <li key={element[0]}><a href={url}>{element[1]}</a></li>
    });

    return (
        <div className={className}>
            <div className="sidebar-container">
                <i className="fa fa-times pointer" aria-hidden="true" onClick={handleCloseSidebar}></i>
                <div className="row">
                    <div className="col-12">
                        <img className="logo ml-2 pull-left" src="/assets/img/Logo.PNG" alt="LOGO" />
                    </div>
                </div>
                <hr />

                <div className="row border-bottom">
                    <div className="text-left pull-left pt-5 pl-5">
                        <h5>CATEGORIES</h5>
                        <ul className="list">
                            {categoryContent}
                        </ul>
                    </div>
                </div>

                <div className="row">
                    <div className="text-left pull-left pt-3 pl-5">
                        <ul className="list">
                            <li>Past Orders</li>
                            <li>Add Address</li>
                        </ul>
                    </div>
                </div>

                <button className="btn btn-light btn-sm logout">Logout</button>
            </div>
        </div>
    );
}

Sidebar.propTypes = {
    isHidden: PropTypes.bool.isRequired,
    handleCloseSidebar: PropTypes.func.isRequired
}