import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import './Products.scss';

export default function Products() {
    const [productList, setProductList] = useState([]);
    const search = useLocation().search;

    useEffect(() => {
        const category = new URLSearchParams(search).get('category');

        fetch('https://fakestoreapi.com/products')
        .then((response) => response.json())
        .then((productData) => {
            if(category){
                setProductList(productData.filter(p => p.category.toLowerCase().replace(' ', '-') === category.toLowerCase()));
            }
            else {
                setProductList(productData);
            }
        });
    }, []);

    const productContent = productList.map((product) => {
        return (
            <div className="col-3 mt-4 p-4" key={product.id}>
                <div className="row border shadow pt-4 pb-3 product-card">
                    <div className="col-12 img-container">
                        <a href="/#">
                            <img src={product.image} alt={product.title} className="img-product" />
                        </a>
                    </div>
                    <div className="col-12 mt-3 px-4 product-title-container">
                        <a href="/#" className="product-title">
                            <h6><b>{product.title}</b></h6>
                        </a>
                    </div>
                    <div className="col-6 text-truncate text-left mt-3 pt-2">
                        <h6 className="text-primary"><b>&#8377; {product.price.toFixed(2)}</b></h6>
                    </div>
                    <div className="col-6 mt-3">
                        <button className="btn btn-primary btn-sm">Add to Cart</button>
                    </div>
                </div>
            </div>
        );
    });

    return (
        <div className="row">
            { productContent}
        </div>
    );
}