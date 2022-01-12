import {useState} from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";

const RegistrationForm = () => {
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [error, setError] = useState({});
    const history = useHistory();

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
            await axios.post('http://localhost:4001/api/v1/signup', {
                first_name: fName,
                last_name: lName,
                email: email,
                password: pwd
            });
            history.replace('/login');
        }

        catch (e) {
            setError({
                title: e,
                message: 'User with this email already exist'
            });
        }
    };

    return (
        <div className='container'>
            <div className='row justify-content-center align-self-center'>
                <h3 className='card-title text-center mt-lg-5' data-testid="heading"> Create an account</h3>
                <div className='card w-50  m-lg-5 bg-white'>
                    <div className='card-body'>
                        <form onSubmit={submitFormHandler}>
                            <div className="mb-3 mt-5">
                                <label htmlFor="fName" className="form-label">First name</label>
                                <input type="text" className="form-control" onChange={fNameHandler} data-testid="fName"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="lName" className="form-label">Last name</label>
                                <input type="text" className="form-control"  onChange={lNameHandler} data-testid="lName"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email Address</label>
                                <input type="email" className="form-control"  onChange={emailHandler} data-testid="email"/>
                            </div>
                            <div className="mb-5">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className="form-control"  onChange={pwdHandler} data-testid="password"/>
                            </div>

                            <div className="d-grid gap-2 mt-5">
                                <button className="btn btn-primary mt-5" data-testid="button">Create an account</button>
                            </div>
                            {error && <p className='alert-danger mt-3' data-testid="error">{error.message}</p>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegistrationForm;