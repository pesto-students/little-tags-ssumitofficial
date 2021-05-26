import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database'

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET
}
class Firebase {
    constructor() {
        app.initializeApp(config);
        this.db = app.database();
        this.auth = app.auth();

        this.googleAuthProvider = new app.auth.GoogleAuthProvider();
    }

    doGoogleSignIn = () => this.auth.signInWithPopup(this.googleAuthProvider);

    logout = () => {
        this.auth.signOut();
    }

    user = (uid) => this.db.ref(`/users/${uid}`);

    cart = (uid) => this.db.ref(`/cart/${uid}`);

    address = (uid) => this.db.ref(`/address/${uid}`);

    onAuthChangeListener = (next, fallback = () => { }) => {
        return this.auth.onAuthStateChanged(authUser => {
            if (authUser) {
                this.cart(authUser.uid)
                    .once('value')
                    .then((snapshot) => {
                        const dbCart = snapshot.val();
                        const user = {
                            uid: authUser.uid,
                            email: authUser.email,
                            userName: authUser.displayName
                        }
                        next(user, dbCart);
                    });
            }
            else {
                fallback();
            }
        });
    }
}

export default Firebase;