import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Categories } from '../../Helpers/util.js';
import './Sidebar.scss';

export default function Sidebar({ isHidden, handleCloseSidebar }) {
    let className = isHidden ? 'sidebar sidebar-close' : 'sidebar shadow-lg sidebar-open';

    useEffect(() => {
        className = isHidden ? 'sidebar sidebar-close' : 'sidebar shadow-lg sidebar-open';
    }, [isHidden]);

    const categoryContent = Object.entries(Categories).map(element => {
        return <li key={element[0]}>{element[1]}</li>
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