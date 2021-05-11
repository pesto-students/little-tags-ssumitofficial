import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './Home.scss';

export default function Home() {
    return (
        <div className="home-container p-0 m-0">
            <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="/assets/img/offer1.jpg" className="d-block w-100 slide-img" />
                    </div>
                    <div className="carousel-item">
                    <img src="/assets/img/offer2.jpg" className="d-block w-100 slide-img" />
                    </div>
                    <div className="carousel-item">
                    <img src="/assets/img/offer3.png" className="d-block w-100 slide-img" />
                    </div>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>

            <div className="row">
                <div className="col-12">
                    <h2><b>Categories</b></h2>
                </div>
            </div>
        </div>
    );
}