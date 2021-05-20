import React, { useEffect, useContext } from 'react';
import FirebaseContext from '../Firebase/context';
import { connect } from 'react-redux'
import { setAuthUser, setCart } from '../../actions'

const withAuthentication = (Component) => {
    const NewComponent = (props) => {
        const firebase = useContext(FirebaseContext);

        const saveToLocalStorage = (key, object) => {
            localStorage.setItem(key, JSON.stringify(object));
        }
        const next = (authUser, cart) => {
            saveToLocalStorage('authUser', authUser);
            saveToLocalStorage('cart', cart);
            props.setAuthUser(authUser);
            props.setCart(cart);
        }
        const fallback = () => {
            localStorage.removeItem('authUser');
            localStorage.removeItem('cart');
            props.setAuthUser(null);
            props.setCart(null);
        };
        useEffect(() => {
            const user = JSON.parse(localStorage.getItem('authUser'));
            const cart = JSON.parse(localStorage.getItem('cart'));
            props.setAuthUser(user);
            props.setCart(cart);
            firebase.onAuthChangeListener(next, fallback);
        }, []);

        return <Component {...props} />
    }

    return connect(null, { setAuthUser, setCart })(NewComponent);
}

export default withAuthentication;