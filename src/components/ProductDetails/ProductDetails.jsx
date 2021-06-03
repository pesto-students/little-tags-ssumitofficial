import React, { useState, useEffect, useContext } from 'react';
import FirebaseContext from '../Firebase/context';
import { CartContext } from '../../contexts/Cart'
import { useLocation } from "react-router-dom";
import withAutherization from '../Session/withAutherization';
import Login from '../Login/Login.jsx'
import './ProductDetails.scss'

const INCREASE_QTY = 'INCREASE_QTY'
const DECREASE_QTY = 'DECREASE_QTY'

function ProductDetails({ authUser }) {
    const [productDetails, setProductDetails] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const [quantity, setQuantity] = useState(0);
    const [size, setSize] = useState('S');
    const [isAddedToCart, setIsAddedToCart] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const search = useLocation().search;
    const firebase = useContext(FirebaseContext);
    const [cart, setCart] = useContext(CartContext);

    useEffect(() => {
        const productId = new URLSearchParams(search).get('id');

        fetch(`https://fakestoreapi.com/products/${productId}`)
            .then((response) => response.json())
            .then((productData) => {
                setProductDetails(productData);
                setErrorMessage();
            })
            .catch((error) => {
                setErrorMessage('Failed to fetch product details');
            });
    }, []);

    useEffect(() => {
        if (cart) {
            cart.forEach(product => {
                if(product.productId === productDetails?.id) {
                    setQuantity(product.quantity);
                    setSize(product.size);
                    setIsAddedToCart(true);
                }
            });
        }
        else {
            setIsAddedToCart(false);
        }
    }, [productDetails]);

    const handleSizeChange = (newSize) => {
        setSize(newSize);
        if (!cart) cart = [];

        let isUpdated = false;
        const updatedCart = cart.map((product) => {
            if(product.productId === productDetails.id) {
                product.size = newSize;
                isUpdated = true;
            }
            return product;
        });

        if(isUpdated) {
            firebase.cart(authUser.uid).set([...updatedCart]);
            localStorage.setItem('cart', JSON.stringify([...updatedCart]));
        }
    }

    const handleChangeCart = (action) => {
        if (!authUser) {
            setIsLoginModalOpen(true);
            return;
        }

        if(action === INCREASE_QTY) {
            let isUpdated = false;
            let updatedCart = cart.map((product) => {
                if(product.productId === productDetails?.id) {
                    product.quantity += 1;
                    isUpdated = true;
                    setQuantity(product.quantity);
                }
                return product;
            });

            if(!isUpdated) {
                let newProduct = {
                    'productId': productDetails?.id,
                    'quantity': 1,
                    'productImg': productDetails.image,
                    'productTitle': productDetails.title,
                    'price': productDetails.price
                }
                if (productDetails.category === `men's clothing`
                || productDetails.category === `women's clothing`) newProduct.size = size;
                setQuantity(1);

                updatedCart = [...cart, newProduct];
            }


            setCart(updatedCart);
            firebase.cart(authUser.uid).set([...updatedCart]);
            localStorage.setItem('cart', JSON.stringify([...updatedCart]));
            setIsAddedToCart(true);
        }

        if(action === DECREASE_QTY) {
            let updatedCart = [];
            if(quantity === 1) {
                updatedCart = cart.filter(x => x.productId !== productDetails.id);
                setIsAddedToCart(false);
                setQuantity(0);
            }

            if(quantity > 1) {
                updatedCart = cart.map((product) => {
                    if(product.productId === productDetails.id) {
                        product.quantity -= 1;
                        setQuantity(product.quantity);
                    }
                    return product;
                });
            }

            setCart(updatedCart);
            firebase.cart(authUser.uid).set([...updatedCart]);
            localStorage.setItem('cart', JSON.stringify([...updatedCart]));
        }
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
                            (productDetails.category === `men's clothing`
                                || productDetails.category === `women's clothing`)
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
                                <div className="col-12 text-left mt-2 d-flex">
                                    <i className="fa fa-minus-square pointer" aria-hidden="true" onClick={() => handleChangeCart(DECREASE_QTY)}></i>
                                    <span className="text-center qty">{quantity}</span>
                                    <i className="fa fa-plus-square pointer" aria-hidden="true" onClick={() => handleChangeCart(INCREASE_QTY)}></i>
                                </div>
                                :
                                <div className="col-12 text-left mt-2">
                                    <button className="btn btn-sm btn-primary" onClick={() => handleChangeCart(INCREASE_QTY)}>
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