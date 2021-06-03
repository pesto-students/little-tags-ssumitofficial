import { BrowserRouter, Switch, Route } from "react-router-dom";
import withAuthentication from '../Session/withAuthentication';
import * as ROUTES from '../../constants/Routes.js';
import Header from '../Header/Header.jsx';
import Home from '../Home/Home.jsx';
import Footer from '../Footer/Footer.jsx';
import Products from '../Products/Products.jsx';
import ProductDetails from '../ProductDetails/ProductDetails.jsx';
import Cart from '../Cart/Cart';
import ManageAddress from '../ManageAddress/ManageAddress'
import MyOrders from '../MyOrders/MyOrders'

function Main() {
    return (
        <div>
            <BrowserRouter>
                <Header></Header>
                <Switch>
                    <Route path={ROUTES.PRODUCTS}>
                        <Products></Products>
                    </Route>
                    <Route path={ROUTES.MANAGEADDRESS}>
                        <ManageAddress></ManageAddress>
                    </Route>
                    <Route path={ROUTES.MYORDERS}>
                        <MyOrders></MyOrders>
                    </Route>
                    <Route path={ROUTES.PRODUCT}>
                        <ProductDetails></ProductDetails>
                    </Route>
                    <Route path={ROUTES.CART}>
                        <Cart></Cart>
                    </Route>
                    <Route path={ROUTES.HOME}>
                        <Home></Home>
                    </Route>
                </Switch>
                <Footer></Footer>
            </BrowserRouter>
        </div>
    );
}

export default withAuthentication(Main);