import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import FirebaseContext from '../Firebase/context';
import './Login.scss';

export default function Login({ handleCloseLoginModal }) {
    const firebase = useContext(FirebaseContext);
    const [errorMessage, setErrorMessage] = useState('');

    const handleGoogleSignIn = () => {
        firebase
            .doGoogleSignIn()
            .then(authUser => {
                firebase.user(authUser.user.uid).set({
                    email: authUser.user.email,
                    userName: authUser.user.displayName
                });
                setErrorMessage('');
                handleCloseLoginModal();
            })
            .catch(error => setErrorMessage(error.message));
    }
    return (
        <div className="login-modal-container">
            <div className="login-modal shadow-lg border">
                <div className="row">
                    <div className="col-12 mt-3">
                        <i className="fa fa-times-circle-o pull-right pointer" aria-hidden="true" onClick={handleCloseLoginModal}></i>
                    </div>
                    <div className="col-12">
                        <h3>Login</h3>
                    </div>
                </div>
                <div className="row px-5">
                    <div className="col-12 google-login-btn pointer p-2 mt-4" onClick={handleGoogleSignIn}>
                        <img src="/assets/img/google-icon.png" alt="Google" className="login-service-icon mr-2" />
                        <span>Login with Google</span>
                    </div>
                </div>
                <div className="row text-danger px-5">
                    {!!errorMessage && errorMessage}
                </div>
            </div>
        </div>
    );
}

Login.propTypes = {
    handleCloseLoginModal: PropTypes.func.isRequired
}