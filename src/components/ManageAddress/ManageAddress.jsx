import React, { useEffect, useContext, useState } from 'react'
import FirebaseContext from '../Firebase/context'
import Address from '../Address/Address'
import withAutherization from '../Session/withAutherization'
import States from '../../assets/states.json'
import { TostrContext } from '../../contexts/Tostr'
import './ManageAddress.scss'

function ManageAddress({ authUser }) {
    const firebase = useContext(FirebaseContext);
    const [addressList, setAddressList] = useState([]);
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const [, showSuccess] = useContext(TostrContext);
    const [selectedAddress, setSelectedAddress] = useState();

    useEffect(() => {
        if (!authUser) return;

        getAddress();
    }, [authUser]);

    const getAddress = () => {
        firebase.address(authUser.uid)
            .once('value')
            .then((snapshot) => {
                setAddressList(Object.keys(snapshot.val()).map((key) => {
                    return { [key]: snapshot.val()[key] };
                }));
            });
    }

    const handleModalClose = () => {
        setIsAddressModalOpen(false);
        getAddress();
        setSelectedAddress(null);
    }

    const handleDeleteClick = (key) => {
        firebase.address(authUser.uid).child(key).remove();
        getAddress();
        showSuccess('Success', 'Address deleted successfully!');
    }

    const handleEditClick = (key) => {
        setSelectedAddress(addressList.filter((address) => address[key])[0]);
        setIsAddressModalOpen(true);
    }

    const content = addressList.map((address) => {
        const key = Object.keys(address)[0];
        return <div className="col-4 text-left mt-3" key={key}>
            <h6 className="text-dark"><b>{address[key].addressTitle}</b></h6>
            <h6><b className="text-muted">Address : </b> {address[key].address1}
                {address[key].address2 ? ` ,${address[key].address2}` : ''}
                {address[key].city ? `, ${address[key].city}` : ''}
                {address[key].state ? `, ${States[address[key].state]}` : ''}</h6>
            <h6><b className="text-muted">Pin Code : </b> {address[key].pinCode}</h6>
            <h6><b className="text-muted">Email : </b> {address[key].email}</h6>
            <h6><b className="text-muted">Phone : </b> {address[key].phoneNumber}</h6>
            <button className="btn btn-sm btn-primary w-5r" onClick={() => handleEditClick(key)}>Edit</button>
            <button className="btn btn-sm btn-primary w-5r ml-3" onClick={() => handleDeleteClick(key)}>Delete</button>
        </div>
    });
    return (
        <div className="main-container">
            {
                !!isAddressModalOpen && <Address handleClose={handleModalClose} address={selectedAddress}></Address>
            }
            <div className="row px-5 pt-3 pb-4 mx-5">
                <div className="col-6 text-left">
                    <h5><b>My Address Book</b></h5>
                </div>
                <div className="col-6 text-right">
                    <button className="btn btn-sm btn-dark float-right" onClick={() => setIsAddressModalOpen(true)}>Add Address</button>
                </div>
                {content}
            </div>
        </div>
    );
}

export default withAutherization(ManageAddress);