import React, { useContext, useEffect, useState } from 'react';
import withAutherization from '../Session/withAutherization';
import { CartContext } from '../../contexts/Cart';
import FirebaseContext from '../Firebase/context';
import './Cart.scss'

const INCREASE_QTY = 'INCREASE_QTY'
const DECREASE_QTY = 'DECREASE_QTY'
const REMOVE_ITEM = 'REMOVE_ITEM'

function Cart({ authUser }) {
    const [productList, setProductList] = useState([]);
    const [cart, setCart] = useContext(CartContext);
    const [deliveryCharge] = useState(5);
    const [taxRate] = useState(12);
    const firebase = useContext(FirebaseContext);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then((response) => response.json())
            .then((productData) => {
                setProductList(productData);
            });
    }, []);

    const handleQtyChange = (productId, action) => {
        const updatedCart = cart.filter((product) => {
            if (product.productId === productId) {
                if (action === INCREASE_QTY) {
                    product.quantity += 1;
                }
                else if (action === REMOVE_ITEM) {
                    return false;
                }
                else if (action === DECREASE_QTY) {
                    if (product.quantity === 1) {
                        return false;
                    }
                    else {
                        product.quantity -= 1;
                    }
                }
            }

            return true;
        });

        setCart(updatedCart);
        firebase.cart(authUser.uid).set([...updatedCart]);
        localStorage.setItem('cart', JSON.stringify([...updatedCart]));
    }

    let total = 0;
    const content = productList.map((product) => {
        if (cart.filter(c => c.productId === product.id).length === 0) {
            return '';
        }

        const productUrl = `/product?id=${product.id}`;
        const cartItem = cart.filter(c => c.productId === product.id)[0];
        total += (product.price * cartItem.quantity);
        return <div className="row mx-5 py-4">
            <div className="col-2 p-0 text-left">
                <img src={product.image} className="car-img" />
            </div>
            <div className="col-4 p-0 text-left">
                <a href={productUrl} className="product-title">
                    <h6><b>{product.title}</b></h6>
                </a>
                <span className="text-muted pointer remove-btn" onClick={() => handleQtyChange(product.id, REMOVE_ITEM)}>Remove</span>
            </div>
            <div className="col-2 p-0">
                <i className="fa fa-minus-square pointer mr-3" aria-hidden="true" onClick={() => handleQtyChange(product.id, DECREASE_QTY)}></i>
                <span className="text-center qty">{cartItem.quantity}</span>
                <i className="fa fa-plus-square pointer ml-3" aria-hidden="true" onClick={() => handleQtyChange(product.id, INCREASE_QTY)}></i>
            </div>
            <div className="col-2 text-right">
                <b>${product.price.toFixed(2)}</b>
            </div>
            <div className="col-2 text-right">
                <b>${(product.price * cartItem.quantity).toFixed(2)}</b>
            </div>
        </div>
    });

    return cart.length === 0 ? <h3>Cart is Empty!</h3> : (
        <div className="row">
            <div className="col-9 p-0 px-5">
                <div className="row mx-5 mt-4 pb-3 border-bottom">
                    <div className="col-6 text-left p-0">
                        <h5><b>Shopping Cart</b></h5>
                    </div>
                    <div className="col-6 text-right p-0">
                        <h5><b>{cart.length} Items</b></h5>
                    </div>
                </div>

                <div className="row mx-5 mt-4">
                    <div className="col-6 text-left p-0">
                        <h6 className="text-secondary cart-titles">PRODUCT DETAILS</h6>
                    </div>
                    <div className="col-2">
                        <h6 className="text-secondary cart-titles">QUANTITY</h6>
                    </div>
                    <div className="col-2">
                        <h6 className="text-secondary cart-titles text-right">PRICE</h6>
                    </div>
                    <div className="col-2">
                        <h6 className="text-secondary cart-titles text-right">TOTAL</h6>
                    </div>
                </div>
                {content}
            </div>
            <div className="col-3 p-0 summary">
                <div className="row mx-4 mt-4 pb-3 border-bottom">
                    <div className="col-12 text-left p-0">
                        <h5><b>Order Summary</b></h5>
                    </div>
                </div>
                <div className="row mx-4 mt-4">
                    <div className="col-6 text-left p-0">
                        <h6 className="cart-titles text-muted">Total</h6>
                    </div>
                    <div className="col-6 text-right p-0 text-muted">
                        <h6 className="cart-titles">${total.toFixed(2)}</h6>
                    </div>
                </div>
                <div className="row mx-4 mt-2">
                    <div className="col-6 text-left p-0">
                        <h6 className="cart-titles text-muted">Delivery Charges</h6>
                    </div>
                    <div className="col-6 text-right p-0 text-muted">
                        <h6 className="cart-titles">${deliveryCharge.toFixed(2)}</h6>
                    </div>
                </div>
                <div className="row mx-4 mt-2 border-bottom pb-2">
                    <div className="col-6 text-left p-0">
                        <h6 className="cart-titles text-muted">Tax</h6>
                    </div>
                    <div className="col-6 text-right p-0 text-muted">
                        <h6 className="cart-titles">${(total * taxRate / 100).toFixed(2)}</h6>
                    </div>
                </div>
                <div className="row mx-4 mt-4 border-bottom pb-3">
                    <div className="col-6 text-left p-0">
                        <h6 className="cart-titles">Grand Total</h6>
                    </div>
                    <div className="col-6 text-right p-0">
                        <h6 className="cart-titles">${((total * taxRate / 100) + deliveryCharge + total).toFixed(2)}</h6>
                    </div>
                </div>
                <div className="row mx-4 mt-4 border-bottom pb-4">
                    <div className="col-12 text-left p-0">
                        <h6 className="cart-titles">Payment Mode</h6>
                        <select className="form-control form-control-sm">
                            <option>Select</option>
                            <option value="COD">COD</option>
                            <option value="NET">Net Banking</option>
                            <option value="CARD">Debit/Credit Card</option>
                        </select>
                    </div>
                </div>
                <div className="row mx-4 mt-4 border-bottom pb-4">
                    <div className="col-12 text-left p-0">
                        <h6 className="cart-titles">Delivery Address</h6>
                        <select className="form-control form-control-sm">
                            <option>Select</option>
                        </select>
                    </div>
                </div>
                <div className="row mx-4 mt-4">
                    <button className="btn btn-primary form-control form-control-sm">
                        PLACE ORDER
                    </button>
                </div>
            </div>
        </div>
    );
}

export default withAutherization(Cart);