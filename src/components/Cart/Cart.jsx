import React, { useContext, useEffect, useState } from 'react';
import withAutherization from '../Session/withAutherization';
import { CartContext } from '../../contexts/Cart';
import FirebaseContext from '../Firebase/context';
import SuccessOrder from '../SuccessOrder/SuccessOrder'
import { TostrContext } from '../../contexts/Tostr'
import Months from '../../constants/Months';
import './Cart.scss'

const INCREASE_QTY = 'INCREASE_QTY'
const DECREASE_QTY = 'DECREASE_QTY'
const REMOVE_ITEM = 'REMOVE_ITEM'

function Cart({ authUser }) {
    const [showError, showSuccess] = useContext(TostrContext);
    const [addressList, setAddressList] = useState([]);
    const [cart, setCart] = useContext(CartContext);
    const [deliveryCharge] = useState(5);
    const [taxRate] = useState(12);
    const [isOrderPlaced, setIsOrderPlaced] = useState(false);
    const [paymentMode, setPaymentMode] = useState();
    const [deliveryAddress, setDeliveryAddress] = useState();
    const firebase = useContext(FirebaseContext);

    useEffect(() => {
        firebase.address(authUser.uid)
            .once('value')
            .then((snapshot) => {
                setAddressList(Object.keys(snapshot.val()).map((key) => {
                    return { [key]: snapshot.val()[key] };
                }));
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

    const handlePlaceOrderClick = () => {
        if (!paymentMode || !deliveryAddress) {
            showError('Error', 'Please selected required fields!');
            return;
        }

        const now = new Date();

        const newOrder = {
            'dateTime': `${Months[now.getMonth()]}-${now.getDate()}-${now.getFullYear()}`,
            'items': cart,
            'deliveryAddress': addressList.filter((address) => address[deliveryAddress])[0][deliveryAddress],
            paymentMode
        }

        firebase.order(authUser.uid).push(newOrder);
        firebase.cart(authUser.uid).set([]);
        localStorage.setItem('cart', JSON.stringify([]));
        setIsOrderPlaced(true);
    }

    let total = 0;
    const content = cart.map((product) => {
        const productUrl = `/product?id=${product.productId}`;
        total += (product.price * product.quantity);

        return <div className="row mx-5 py-4" key={product.productId}>
            <div className="col-2 p-0 text-left">
                <img src={product.productImg} className="car-img" />
            </div>
            <div className="col-4 p-0 text-left">
                <a href={productUrl} className="product-title">
                    <h6><b>{product.productTitle}</b></h6>
                </a>
                <span className="text-muted pointer remove-btn" onClick={() => handleQtyChange(product.productId, REMOVE_ITEM)}>Remove</span>
            </div>
            <div className="col-2 p-0">
                <i className="fa fa-minus-square pointer mr-3" aria-hidden="true" onClick={() => handleQtyChange(product.productId, DECREASE_QTY)}></i>
                <span className="text-center qty">{product.quantity}</span>
                <i className="fa fa-plus-square pointer ml-3" aria-hidden="true" onClick={() => handleQtyChange(product.productId, INCREASE_QTY)}></i>
            </div>
            <div className="col-2 text-right">
                <b>${product.price.toFixed(2)}</b>
            </div>
            <div className="col-2 text-right">
                <b>${total.toFixed(2)}</b>
            </div>
        </div>
    });


    const addressContent = addressList.map((address) => {
        const key = Object.keys(address)[0];
        const title = address[key].addressTitle;

        return <option key={key} value={key}>{title}</option>;
    });

    return cart.length === 0 ? <h3>Cart is Empty!</h3> : (
        <div className="row">
            {
                isOrderPlaced ? <SuccessOrder></SuccessOrder>
                    : ''
            }
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
                        <h6 className="cart-titles">Payment Mode<span className="text-danger">*</span></h6>
                        <select className="form-control form-control-sm" onChange={(e) => setPaymentMode(e.target.value)}>
                            <option>Select</option>
                            <option value="COD">COD</option>
                            <option value="NET">Net Banking</option>
                            <option value="CARD">Debit/Credit Card</option>
                        </select>
                    </div>
                </div>
                <div className="row mx-4 mt-4 border-bottom pb-4">
                    <div className="col-12 text-left p-0">
                        <h6 className="cart-titles">Delivery Address<span className="text-danger">*</span></h6>
                        <select className="form-control form-control-sm" onChange={(e) => setDeliveryAddress(e.target.value)}>
                            <option>Select</option>
                            {addressContent}
                        </select>
                    </div>
                </div>
                <div className="row mx-4 mt-4">
                    <button className="btn btn-primary form-control form-control-sm" onClick={handlePlaceOrderClick}>
                        PLACE ORDER
                    </button>
                </div>
            </div>
        </div>
    );
}

export default withAutherization(Cart);