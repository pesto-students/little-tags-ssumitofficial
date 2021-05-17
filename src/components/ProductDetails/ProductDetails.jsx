import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import './ProductDetails.scss'

export default function ProductDetails() {
    const [productDetails, setProductDetails] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const search = useLocation().search;

    useEffect(() => {
        const productId = new URLSearchParams(search).get('id');

        fetch(`https://fakestoreapi.com/products/${productId}`)
            .then((response) => response.json())
            .then((productData) => { setProductDetails(productData); setErrorMessage(); })
            .catch((error) => {
                setErrorMessage('Failed to fetch product details');
            });
    }, []);

    if (errorMessage || !productDetails) {
        return <h3>{errorMessage}</h3>
    }
    else {
        return (
            <div className="row mt-5">
                <div className="col-1"></div>
                <div className="col-5">
                    <div className="border p-4">
                        <img src={productDetails.image} alt="Produce Image" className="product-img" />
                    </div>
                </div>
                <div className="col-5">
                    <div className="row">
                        <div className="col-12 text-left">
                            <label className="product-name">
                                {productDetails.title}
                            </label>
                        </div>

                        <div className="col-12 text-left">
                            <span>{productDetails.description}</span>
                        </div>

                        <div className="col-12 text-left mt-2">
                            <span className="product-price">&#8377; {productDetails.price.toFixed(2)}</span>
                        </div>

                        <div className="col-12 text-left mt-2">
                            <button className="btn btn-sm btn-primary">
                                Add to Card
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-1"></div>
            </div>
        );
    }
}