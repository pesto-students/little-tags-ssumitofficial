import React, { useContext, useEffect, useState } from 'react';
import './Address.scss';
import States from '../../assets/states.json';
import withAutherization from '../Session/withAutherization'
import FirebaseContext from '../Firebase/context'
import { TostrContext } from '../../contexts/Tostr'

function Address({ handleClose, authUser, address }) {
    const firebase = useContext(FirebaseContext);
    const [showError, showSuccess] = useContext(TostrContext);

    const [addressTitle, setAddressTitle] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('0');
    const [pinCode, setPinCode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [addressKey, setAddressKey] = useState();

    useEffect(() => {
        if (address) {
            const key = Object.keys(address)[0];
            setAddressKey(key);
            setAddressTitle(address[key].addressTitle);
            setFirstName(address[key].firstName);
            setLastName(address[key].lastName);
            setAddress1(address[key].address1);
            setAddress2(address[key].address2);
            setCity(address[key].city);
            setState(address[key].state);
            setPinCode(address[key].pinCode);
            setPhoneNumber(address[key].phoneNumber);
            setEmail(address[key].email);
        }
    }, []);

    const stateContent = Object.entries(States).map(state => {
        return <option value={state[0]} key={state[0]}>{state[1]}</option>
    });

    const handleSubmit = () => {
        if (!firstName
            || !lastName
            || !city
            || !state
            || !pinCode
            || !phoneNumber
            || !email) {
            showError('Error', 'Please fill all required fields!')
            return
        }

        const newAddress = {
            addressTitle,
            firstName,
            lastName,
            address1,
            address2,
            city,
            state,
            pinCode,
            phoneNumber,
            email
        }

        if (addressKey) {
            firebase.address(authUser.uid).child(addressKey).update(newAddress);
        }
        else {
            firebase.address(authUser.uid).push(newAddress);
        }
        showSuccess('Success', 'Address saved successfully!');
        handleClose();
    }

    return (
        <div className="modal-container">
            <div className="address-modal shadow-lg border-lg pb-3">
                <div className="row pt-3">
                    <div className="col-12 text-left">
                        <h6><b>Address Details</b></h6>
                    </div>
                </div>
                <div className="row text-left px-2 pt-2">
                    <div className="col-6 px-2">
                        <label htmlFor="addressTitle">Address Title<span className="text-danger">*</span></label>
                        <input type="text" className="form-control form-control-sm" name="addressTitle" placeholder="Home/Office" onChange={(e) => setAddressTitle(e.target.value)} value={addressTitle} />
                    </div>
                    <div className="col-6 px-2"></div>
                    <div className="col-6 px-2 pt-2">
                        <label htmlFor="firstName">First Name<span className="text-danger">*</span></label>
                        <input type="text" className="form-control form-control-sm" name="firstName" onChange={(e) => setFirstName(e.target.value)} value={firstName} />
                    </div>
                    <div className="col-6 px-2 pt-2">
                        <label htmlFor="lastName">Last Name<span className="text-danger">*</span></label>
                        <input type="text" className="form-control form-control-sm" name="lastName" onChange={(e) => setLastName(e.target.value)} value={lastName} />
                    </div>
                </div>

                <div className="row text-left px-2 pt-2">
                    <div className="col-12 px-2">
                        <label>Street Address</label>
                        <input type="text" className="form-control form-control-sm" placeholder="Street Address 1" onChange={(e) => setAddress1(e.target.value)} value={address1} />
                        <input type="text" className="form-control form-control-sm mt-2" placeholder="Street Address 2" onChange={(e) => setAddress2(e.target.value)} value={address2} />
                    </div>
                </div>

                <div className="row text-left px-2 pt-2">
                    <div className="col-6 px-2">
                        <label>City<span className="text-danger">*</span></label>
                        <input type="text" className="form-control form-control-sm" onChange={(e) => setCity(e.target.value)} value={city} />
                    </div>
                    <div className="col-6 px-2">
                        <label>State<span className="text-danger">*</span></label>
                        <select className="form-control form-control-sm" value={state} onChange={(e) => setState(e.target.value)}>
                            <option value="0">Select State</option>
                            {stateContent}
                        </select>
                    </div>
                </div>

                <div className="row text-left px-2 pt-2">
                    <div className="col-6 px-2">
                        <label>Pin Code<span className="text-danger">*</span></label>
                        <input type="text" className="form-control form-control-sm" onChange={(e) => setPinCode(e.target.value)} value={pinCode} />
                    </div>
                </div>

                <div className="row text-left px-2 pt-2">
                    <div className="col-6 px-2">
                        <label>Phone Number<span className="text-danger">*</span></label>
                        <input type="text" className="form-control form-control-sm" onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} />
                    </div>
                    <div className="col-6 px-2">
                        <label>Email Address<span className="text-danger">*</span></label>
                        <input type="text" className="form-control form-control-sm" onChange={(e) => setEmail(e.target.value)} value={email} />
                    </div>
                </div>

                <div className="row text-right px-2 pt-4">
                    <div className="col-12 px-2">
                        <button className="btn btn-dark btn-sm w-25 mr-2" onClick={() => handleClose(false)}>Cancel</button>
                        <button className="btn btn-primary btn-sm w-25" onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withAutherization(Address);