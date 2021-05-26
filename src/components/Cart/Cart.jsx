import React from 'react';
import withAutherization from '../Session/withAutherization';

function Cart({ cart }) {
    return (
        <h3>Cart Items</h3>
    );
}

export default withAutherization(Cart);