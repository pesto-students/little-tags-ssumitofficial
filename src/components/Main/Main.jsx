import { BrowserRouter, Switch, Route } from "react-router-dom"
import * as ROUTES from '../../Helpers/Routes.js';
import Header from '../Header/Header.jsx';
import Home from '../Home/Home.jsx';
import Footer from '../Footer/Footer.jsx';
import Products from '../Products/Products.jsx';

export default function Main() {
    return (
        <div>
            <BrowserRouter>
                <Header></Header>
                <Switch>
                    <Route path={ROUTES.PRODUCTS}>
                        <Products></Products>
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