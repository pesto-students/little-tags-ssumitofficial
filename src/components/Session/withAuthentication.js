import React, { useEffect, useContext } from 'react';
import FirebaseContext from '../Firebase/context';
import { CartContext } from '../../contexts/Cart'
import { connect } from 'react-redux'
import { setAuthUser } from '../../actions'

const withAuthentication = (Component) => {
    const NewComponent = (props) => {
        const firebase = useContext(FirebaseContext);
        const [, setCart] = useContext(CartContext);

        const saveToLocalStorage = (key, object) => {
            localStorage.setItem(key, JSON.stringify(object));
        }
        const next = (authUser, cart) => {
            saveToLocalStorage('authUser', authUser);
            saveToLocalStorage('cart', cart);
            props.setAuthUser(authUser);
            setCart(cart);
        }
        const fallback = () => {
            localStorage.removeItem('authUser');
            localStorage.removeItem('cart');
            props.setAuthUser(null);
            setCart([]);
        };
        useEffect(() => {
            const user = JSON.parse(localStorage.getItem('authUser'));
            const cart = JSON.parse(localStorage.getItem('cart'));
            props.setAuthUser(user);
            setCart(cart);
            firebase.onAuthChangeListener(next, fallback);
        }, []);

        return <Component {...props} />
    }

    return connect(null, { setAuthUser })(NewComponent);
}

export default withAuthentication;