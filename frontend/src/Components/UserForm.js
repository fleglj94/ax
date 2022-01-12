import {useState} from "react";
import axios from "axios";
import {useContext} from "react";
import AuthContext from "../Contexts/auth-context";
import {Snackbar, SnackbarContent} from "@material-ui/core";

const UserForm = (props) => {
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [error, setError] = useState({});
    const [open, setOpen] = useState(false);

    const authCtx = useContext(AuthContext);

    const fNameHandler = (e) => {
        setFName(e.target.value);
    };

    const lNameHandler = (e) => {
        setLName(e.target.value);
    };

    const emailHandler = (e) => {
        setEmail(e.target.value);
    };

    const pwdHandler = (e) => {
        setPwd(e.target.value);
    };

    const headers = {
        'x-access-token': authCtx.token
    };

    const closeSnackbar =  () => {
        setOpen(false);
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
            const response = await axios.post('http://localhost:4001/api/v1/users/create', {
                first_name: fName,
                last_name: lName,
                email: email,
                password: pwd
            }, {
                headers: headers
            });
            props.setUsers((prevState) => ([...prevState, response.data]));
            setFName('');
            setLName('');
            setPwd('');
            setEmail('');
            setError({});
            setOpen(true);
        }

        catch (e) {
            setError({
                title: e,
                message: 'User with this email already exists'
            });
        }

    };

    return (
        <div className='container'>
            <h2 className={'mt-5 text-center'}>List of users</h2>
            <form onSubmit={submitFormHandler}>
                <div className="row mx-1 mt-3">
                    <div className="form-group col-md-4">
                        <label htmlFor="inputEmail4">First name</label>
                        <input type="text" className="form-control"  onChange={fNameHandler}
                               value={fName}/>
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="inputPassword4">Last name</label>
                        <input type="text" className="form-control" i
                               onChange={lNameHandler} value={lName}/>
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="inputPassword4">Email Address</label>
                        <input type="email" className="form-control"
                               onChange={emailHandler} value={email}/>
                    </div>
                </div>
                <div className='row mx-1 mt-3 mb-4'>
                    <div className='form-group col-md-4'>
                        <label htmlFor="inputEmail4">Password</label>
                        <input type="password" className="form-control"  onChange={pwdHandler}
                               value={pwd}/>
                    </div>
                    <div className='form-group col-md-4'>
                        <div className="d-grid gap-2 mt-4">
                            <button className="btn btn-primary">Create user</button>
                        </div>
                    </div>
                    {error && <p className='alert-danger mt-3'>{error.message}</p>}
                </div>

            <Snackbar
            anchorOrigin={{
                horizontal: "right",
                vertical: "bottom",
            }}
            open={open}
            onClose={closeSnackbar}
            message="User created"
            color="green"
            autoHideDuration={4000}
            >
                <SnackbarContent style={{
                    backgroundColor: 'green'
                }}
                message="User created"/>
            </Snackbar>
            </form>
        </div>
    );
};

export default UserForm;