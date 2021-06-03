import React from 'react'
import './SuccessOrder.scss'

export default function SuccessOrder() {
    return (
        <div className="modal-container">
            <div className="address-modal shadow-lg border-lg pb-3">
                <div className="row p-2 bg-gray">
                    <b>Your Order Has Been Placed Successfully</b>
                </div>
                <div className="row">
                    <div className="col-12 pt-4">
                        <i className="fa fa-check-circle success-icon" aria-hidden="true"></i>
                    </div>
                    <div className="col-12">
                        <b>Your order has beed placed</b>
                    </div>
                    <div className="col-12">
                        You'll receive notification once your order is dispatched!
                    </div>
                    <div className="col-12 text-right mt-3 mb-1">
                        <a className="btn btn-primary btn-sm w-7" href="/">Continue</a>
                    </div>
                </div>
            </div>
        </div>
    );
}