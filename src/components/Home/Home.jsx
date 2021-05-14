import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './Home.scss';

export default function Home() {
    return (
        <div className="home-container p-0 m-0 pb-5">
            <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="/assets/img/offer1.jpg" className="d-block w-100 slide-img" alt="Offer"/>
                    </div>
                    <div className="carousel-item">
                        <img src="/assets/img/offer2.jpg" className="d-block w-100 slide-img" alt="Offer"/>
                    </div>
                    <div className="carousel-item">
                        <img src="/assets/img/offer3.jpg" className="d-block w-100 slide-img" alt="Offer"/>
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

            <div className="row mt-5">
                <div className="col-12">
                    <h2><b>Categories</b></h2>
                </div>
            </div>

            <div className="row">
                <div className="col-1"></div>
                <div className="col-4">
                    <h4>Electronics</h4>
                    <a href="/products?category=electronics">
                        <img src="/assets/img/cat-electronics.jpg" className="d-block w-100 category-img shadow-lg pointer" alt="Electronics"/>
                    </a>
                </div>
                <div className="col-6 pl-5">
                    <h4>Men Clothing</h4>
                    <a href="/products?category=men-clothing">
                        <img src="/assets/img/cat-men.jpg" className="d-block w-100 category-img shadow-lg pointer" alt="Men Clothing"/>
                    </a>
                </div>
                <div className="col-1"></div>
            </div>
            <div className="row mt-4">
                <div className="col-1"></div>
                <div className="col-6">
                    <h4>Women Clothing</h4>
                    <a href="/products?category=women-clothing">
                        <img src="/assets/img/cat-women.jpg" className="d-block w-100 category-img shadow-lg pointer" alt="Women Clothing"/>
                    </a>
                </div>
                <div className="col-4">
                    <h4>Jewellery</h4>
                    <a href="/products?category=jewelery">
                        <img src="/assets/img/cat-jewellery.jpg" className="d-block w-100 category-img shadow-lg pointer" alt="Jewelery"/>
                    </a>
                </div>
                <div className="col-1"></div>
            </div>
        </div>
    );
}