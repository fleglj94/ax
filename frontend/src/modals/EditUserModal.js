import React, {useState} from "react";
import "./modal.css";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import AuthContext from "../Contexts/auth-context";
import {useContext} from "react";

function EditUserModal(props) {
    const [fName, setFName] = useState(props.fetched.first_name);
    const [lName, setLName] = useState(props.fetched.last_name);
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [error, setError] = useState({});
    const [open, setOpen] = useState(false);

    const authCtx = useContext(AuthContext);
    const id = props.fetched._id;
    const fNameHandler = e => {
        setFName(e.target.value);
    };

    const lNameHandler = e => {
        setLName(e.target.value);
    };

    const emailHandler = e => {
        setEmail(e.target.value);
    };

    const pwdHandler = e => {
        setPwd(e.target.value);
    };

    const headers = {
        'x-access-token': authCtx.token
    };



    const submitFormHandler = async (e) => {
        e.preventDefault();
        if (email.trim().length === 0 || pwd.trim().length === 0 || fName.trim().length === 0 || lName.trim().length === 0) {
            setError({
                title: 'Missing input',
                message: 'All inputs are required!'
            })
            return;
        }

        const validateEmail = email.toLowerCase().match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);

        if (!validateEmail) {
            setError({
                title: 'Invalid email',
                message: 'Please enter a valid email'
            })
            return;
        }

        if (pwd.length < 6) {
            setError({
                title: 'Short password',
                message: 'Password must be at least 6 characters!'
            })
            return;
        }

        if (fName.length > 50 || lName.length > 50) {
            setError({
                title: 'Name is too long',
                message: 'First name or Last name cannot be longer than 50 characters'
            });
            return;
        }
        try {
            const response = await axios.put(`http://localhost:4001/api/v1/users/${id}`, {
                first_name: fName,
                last_name: lName,
                email: email,
                password: pwd
            }, {
                headers: headers
            });
            props.edit(response.data);
            props.hide();
            setOpen(true);
            setFName(props.fetched.first_name);
            setLName(props.fetched.last_name);
            setEmail(props.fetched.email);
            setPwd('');
        }

        catch (e) {
            setError({
                title: e,
                message: 'User with this email already exists'
            })
        }

    };


    return (
        <Modal
            show={props.show}
            aria-labelledby="contained-modal-title-vcenter"
        >
            <Modal.Header style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "blue"
            }}>
                <Modal.Title
                    id="contained-modal-title-vcenter">
                    <h3 className="text-white">{`${props.fetched.first_name} ${props.fetched.last_name}`}</h3>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="mb-3 mt-5 mx-5">
                    <label htmlFor="formGroupExampleInput" className="form-label">First name</label>
                    <input type="text" className="form-control w-85"
                           onChange={fNameHandler}/>
                </div>
                <div className="mb-3 mx-5">
                    <label htmlFor="formGroupExampleInput2" className="form-label ">Last name</label>
                    <input type="text" className="form-control w-85 "
                           onChange={lNameHandler}/>
                </div>
                <div className="mb-3 mx-5">
                    <label htmlFor="formGroupExampleInput2" className="form-label">Email Address</label>
                    <input type="email" className="form-control w-85"
                           onChange={emailHandler}/>
                </div>
                <div className="mb-5 mx-5">
                    <label htmlFor="formGroupExampleInput2" className="form-label">Password</label>
                    <input type="password" className="form-control w-85"
                           onChange={pwdHandler}/>
                </div>

            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-secondary" type='button' onClick={props.hide}>Close</button>
                <button className="btn btn-primary" onClick={submitFormHandler}>Update</button>
                {error && <p className='alert-danger mt-3'>{error.message}</p>}
            </Modal.Footer>
        </Modal>
    );
}

export default EditUserModal;