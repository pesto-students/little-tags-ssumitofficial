import React, { useState } from 'react';

export default function Products(){
    const [productList, setProductList] = useState([]);

    fetch('https://fakestoreapi.com/products')
    .then((response) => console.log(response));

    return (
        <div className="row">
            products
        </div>
    );
}