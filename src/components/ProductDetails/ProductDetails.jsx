import React, { useState, useEffect, useContext } from 'react';
import FirebaseContext from '../Firebase/context';
import { useLocation } from "react-router-dom";
import withAutherization from '../Session/withAutherization';
import Login from '../Login/Login.jsx'
import './ProductDetails.scss'

function ProductDetails({ authUser, cart }) {
    const [productDetails, setProductDetails] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState();
    const [isAddedToCart, setIsAddedToCart] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const search = useLocation().search;
    const firebase = useContext(FirebaseContext);

    useEffect(() => {
        const productId = new URLSearchParams(search).get('id');

        fetch(`https://fakestoreapi.com/products/${productId}`)
            .then((response) => response.json())
            .then((productData) => {
                setProductDetails(productData);
                setErrorMessage();
                if (productData.category === `men's clothing` || productData.category === `women's clothing`) {
                    setSize('S');
                }
            })
            .catch((error) => {
                setErrorMessage('Failed to fetch product details');
            });
    }, []);

    useEffect(() => {
        if (cart) {
            if (cart.filter(p => p.productId === productDetails?.id).length > 0) {
                setIsAddedToCart(true);
                return;
            }
        }
        else {
            setIsAddedToCart(false);
        }
    }, [productDetails]);

    const handleOnClick = (number) => {
        if (number < 0 && quantity === 1) {
            return;
        }
        setQuantity(quantity + number);
    }

    const handleSizeChange = (size) => {
        setSize(size);
    }

    const handleAddToCartClick = () => {
        if (!authUser) {
            setIsLoginModalOpen(true);
            return;
        }

        if (!cart) {
            cart = [];
        }

        let newProduct = {
            'productId': productDetails.id,
            'quantity': quantity
        }
        if (size) {
            newProduct.size = size
        }

        firebase.cart(authUser.uid).set([...cart, newProduct]);
        localStorage.setItem('cart', JSON.stringify([...cart, newProduct]));
        setIsAddedToCart(true);
    }

    const handleRemoveFromCart = () => {
        if(!cart) cart = [];
        const newCart = cart.filter(x => x.productId !== productDetails.id);
        firebase.cart(authUser.uid).set(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
        setIsAddedToCart(false);
    }

    if (errorMessage || !productDetails) {
        return <h3>{errorMessage}</h3>
    }
    else {
        return (
            <div className="row mt-5">
                {
                    !!isLoginModalOpen &&
                    <Login handleCloseLoginModal={() => setIsLoginModalOpen(false)}></Login>
                }
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
                            <span className="product-price">$ {productDetails.price.toFixed(2)}</span>
                        </div>

                        {
                            isAddedToCart ? '' :
                                <div className="col-12 text-left mt-2 d-flex">
                                    <i className="fa fa-minus-square pointer" aria-hidden="true" onClick={() => handleOnClick(-1)}></i>
                                    <input type="number" className="mx-2 px-1 input-qty text-center" value={quantity} onChange={({ target: { value } }) => setQuantity(value)} />
                                    <i className="fa fa-plus-square pointer" aria-hidden="true" onClick={() => handleOnClick(+1)}></i>
                                </div>
                        }
                        {
                            (productDetails.category === `men's clothing`
                                || productDetails.category === `women's clothing`)
                                && !isAddedToCart
                                ?
                                <div className="col-12 p-0">
                                    <div className="col-12 text-left mt-2 d-flex">
                                        <span className={`border py-1 mr-2 pointer size text-center ${size === 'S' ? 'btn-primary' : ''}`} onClick={() => handleSizeChange('S')}>S</span>
                                        <span className={`border py-1 mr-2 pointer size text-center ${size === 'M' ? 'btn-primary' : ''}`} onClick={() => handleSizeChange('M')}>M</span>
                                        <span className={`border py-1 mr-2 pointer size text-center ${size === 'L' ? 'btn-primary' : ''}`} onClick={() => handleSizeChange('L')}>L</span>
                                        <span className={`border py-1 mr-2 pointer size text-center ${size === 'XL' ? 'btn-primary' : ''}`} onClick={() => handleSizeChange('XL')}>XL</span>
                                    </div>
                                </div>
                                : ''
                        }

                        {
                            isAddedToCart && authUser ?
                                <div className="col-12 text-left mt-2">
                                    <button className="btn btn-sm btn-primary" onClick={handleRemoveFromCart}>
                                        Remove from Cart</button>
                                </div>
                                :
                                <div className="col-12 text-left mt-2">
                                    <button className="btn btn-sm btn-primary" onClick={handleAddToCartClick}>
                                        Add to Cart</button>
                                </div>
                        }

                    </div>
                </div>
                <div className="col-1"></div>
            </div>
        );
    }
}

export default withAutherization(ProductDetails);