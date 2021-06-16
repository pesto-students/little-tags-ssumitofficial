import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import withAutherization from '../Session/withAutherization';
import './Products.scss';

function Products({ cart }) {
    const [productList, setProductList] = useState([]);
    const location = useLocation();
    const search = location.search;
    const [isProductNotFound, setIsProductNotFound] = useState(false);

    useEffect(() => {
        const category = new URLSearchParams(search).get('category');
        const searchText = new URLSearchParams(search).get('searchText');

        fetch('https://fakestoreapi.com/products')
            .then((response) => response.json())
            .then((productData) => {
                let newProductList;
                if (category) {
                    newProductList = productData.filter(p => p.category.toLowerCase().replace(' ', '-') === category.toLowerCase());
                }
                else {
                    newProductList = productData;
                }

                if (searchText && searchText.length > 0) {
                    newProductList = newProductList.filter(p => p.title.toLowerCase().includes(searchText.toLocaleLowerCase()));
                }

                if(newProductList.length == 0) {
                    setIsProductNotFound(true);
                }
                else {
                    setIsProductNotFound(false);
                }
                setProductList(newProductList);
            });
    }, [location]);

    const productContent = productList.map((product) => {
        const productUrl = `/product?id=${product.id}`;
        return (
            <div className="col-3 mt-4 p-4" key={product.id}>
                <div className="row border shadow pt-4 pb-3 product-card">
                    <div className="col-12 img-container">
                        <a href={productUrl}>
                            <img src={product.image} alt={product.title} className="img-product" />
                        </a>
                    </div>
                    <div className="col-12 mt-2">
                        <h6 className="text-primary"><b>$ {product.price.toFixed(2)}</b></h6>
                    </div>
                    <div className="col-12 mt-1 px-4 product-title-container">
                        <a href={productUrl} className="product-title">
                            <h6><b>{product.title}</b></h6>
                        </a>
                    </div>
                </div>
            </div>
        );
    });

    return (
        <div className="row">
            { !isProductNotFound ? productContent :
                <div className="col-12 mt-4">
                    <h3>Product Not Found!</h3>
                </div>
            }
        </div>
    );
}

export default withAutherization(Products);