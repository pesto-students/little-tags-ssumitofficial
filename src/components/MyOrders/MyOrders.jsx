import React, { useContext, useEffect, useState } from 'react'
import FirebaseContext from '../Firebase/context'
import withAutherization from '../Session/withAutherization'
import States from '../../assets/states.json'

function MyOrders({ authUser }) {
    const firebase = useContext(FirebaseContext);
    const [orderList, setOrderList] = useState([]);
    const [deliveryCharge] = useState(5);
    const [taxRate] = useState(12);

    useEffect(() => {
        if (authUser) {
            firebase.order(authUser.uid)
                .once('value')
                .then((snapshot) => {
                    setOrderList(Object.keys(snapshot.val()).map((key) => {
                        return { [key]: snapshot.val()[key] };
                    }));
                });
        }
    }, [authUser]);

    const content = orderList.map((order) => {
        const key = Object.keys(order)[0];
        const address = order[key].deliveryAddress;
        let total = 0;
        return (
            <div className="row px-5 pt-3 pb-4 mx-5" key={key}>
                <div className="col-12 p-0">
                    <div className="row bg-gray py-1 px-2 border">
                        <div className="col-6 p-0 text-left">
                            Order placed on {order[key].dateTime}
                        </div>
                        <div className="col-6 p-0 text-right">
                            Order Id : {key}
                        </div>
                    </div>
                    <div className="row border pt-2">
                        <div className="col-12 p-0">
                            <div className="row">
                                <div className="col-8">
                                    <div className="row">
                                        <div className="col-6 text-left">
                                            <h6><b className="text-muted">Item</b></h6>
                                        </div>
                                        <div className="col-2 text-right">
                                            <h6><b className="text-muted">Price</b></h6>
                                        </div>
                                        <div className="col-2 text-center">
                                            <h6><b className="text-muted">Qty</b></h6>
                                        </div>
                                        <div className="col-2 text-right border-right">
                                            <h6><b className="text-muted">Total</b></h6>
                                        </div>
                                    </div>
                                    {
                                        order[key].items.map((item) => {
                                            total += (item.price * item.quantity);
                                            return <div className="row text-left border-top py-2" key={item.productId}>
                                                <div className="col-6">
                                                    <a href={`product?id=${item.productId}`}>{item.productTitle}</a>
                                                </div>
                                                <div className="col-2 text-right">
                                                    ${item.price.toFixed(2)}
                                                </div>
                                                <div className="col-2 text-center">
                                                    {item.quantity}
                                                </div>
                                                <div className="col-2 text-right border-right">
                                                    ${(item.quantity * item.price).toFixed(2)}
                                                </div>
                                            </div>
                                        })
                                    }
                                    <div className="row border-top py-2">
                                        <div className="col-10 text-right">
                                            Delivery
                                        </div>
                                        <div className="col-2 text-right">
                                            ${deliveryCharge.toFixed(2)}
                                        </div>
                                    </div>
                                    <div className="row py-2">
                                        <div className="col-10 text-right">
                                            Tax
                                        </div>
                                        <div className="col-2 text-right">
                                            ${(total * taxRate / 100).toFixed(2)}
                                        </div>
                                    </div>
                                    <div className="row border-top py-2">
                                        <div className="col-10 text-right">
                                            <b className="text-muted">Grand Total</b>
                                        </div>
                                        <div className="col-2 text-right">
                                            <b className="text-muted">${((total * taxRate / 100) + deliveryCharge + total).toFixed(2)}</b>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-4 text-left p-0">
                                    <div className="row border-bottom mb-2">
                                        <h6><b className="text-muted">Delivery Address</b></h6>
                                    </div>
                                    <div className="row">
                                        {address.address1}
                                        {address.address2 ? `, ${address.address2}` : ''}
                                        {address.city ? `, ${address.city}` : ''}
                                    </div>
                                    <div className="row">
                                        {address.state ? `${States[address.state]} ` : ''}
                                        {address.pinCode}
                                    </div>
                                    <div className="row">
                                        {address.email}
                                    </div>
                                    <div className="row">
                                        {address.phoneNumber}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>);
    });

    return (
        !authUser ? '' :
            <div className="main-container">
                <div className="row px-5 pt-3 pb-4 mx-5">
                    <div className="col-12 text-left">
                        <h5><b>My Orders</b></h5>
                    </div>
                </div>
                {content}
            </div>
    );
}

export default withAutherization(MyOrders);