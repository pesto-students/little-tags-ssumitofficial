import React from 'react';
import { Categories } from '../../Helpers/util.js';
import './Footer.scss'

export default function Footer() {
    const categoryContent = Object.entries(Categories).map(element => {
        return <li key={element[0]} className="text-left pointer mb-2">{element[1]}</li>
    });

    return (
        <div className="row mt-4 footer pt-5">
            <div className="col-3">
                <div className="row">
                    <label className="footer-title text-light"><b>Contact Info</b></label>
                </div>
                <div className="row mt-2">
                    <label className="footer-content"><b>Phone: </b> (+91) 9876 543 210</label>
                    <label className="footer-content text-left"><b>Address: </b> Address:  1418 Riverwood Drive, <br />Suite 3245 Cottonwood, <br />CA 96052, United State</label>
                </div>

                <div className="row mt-3 footer-content">We accept:
                    <div className="col-12 p-0 text-left">
                        <img src="/assets/img/mastercard.png" className="img-payment mr-2" />
                        <img src="/assets/img/jcb.png" className="img-payment mr-2" />
                        <img src="/assets/img/paypal.png" className="img-payment mr-2" />
                        <img src="/assets/img/visa.png" className="img-payment mr-2" />
                        <img src="/assets/img/amazon.png" className="img-payment" />
                    </div>
                </div>
            </div>
            <div className="col-3">
                <div className="row">
                    <label className="footer-title text-light"><b>Categories</b></label>
                </div>
                <div className="row mt-2">
                    <ul className="category-list">
                        {categoryContent}
                    </ul>
                </div>
            </div>
            <div className="col-3"></div>
            <div className="col-3">
                <div className="row">
                    <label className="footer-title text-light"><b>Let’s stay in touch</b></label>
                </div>

                <div className="row mt-2">
                    <div class="input-group input-group-sm mb-3">
                        <input type="text" class="form-control" placeholder=" your email address" aria-describedby="basic-addon2" />
                        <div class="input-group-append pointer">
                            <span class="input-group-text" id="basic-addon2">Subscribe</span>
                        </div>
                    </div>
                </div>

                <div className="row mt-1">
                    <label className="footer-content text-left">Keep up to date with our latest news and special offers.</label>
                </div>
            </div>
            <div className="col-12">
                <div className="row mt-4">
                    <div className="col-12 border-top mt-5 pt-4 pb-2 px-0">
                        <label className="pull-left text-white">© 2020, Little Tags Website</label>
                        <label className="pull-right text-white">All Rights Reserved.</label>
                    </div>
                </div>
            </div>
        </div>
    );
}