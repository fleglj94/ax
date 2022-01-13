import {useContext, useState} from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";
import AuthContext from "../Contexts/auth-context";

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const history = useHistory();
    const authCtx = useContext(AuthContext);
    const [error, setError] = useState({});


    const emailHandler = (e) => {
        setEmail(e.target.value);
    };

    const passwordHandler = (e) => {
        setPwd(e.target.value);
    };

    const submitFormHandler = async (e) => {
        e.preventDefault();

        if (email.trim().length === 0 || pwd.trim().length === 0) {

            console.log(email);
            setError({
                title: 'Missing input',
                message: 'All inputs are required!'
            })
            return;
        }

        const validate = email.toLowerCase().match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);

        if (!validate) {
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
        try {
            const response = await axios.post('http://localhost:4001/api/v1/login', {
                email: email,
                password: pwd
            });
            const expirationTime = new Date(new Date().getTime() + (+3600 * 1000));
            authCtx.login(response.data.token, response.data.first_name, expirationTime.toISOString());
            localStorage.setItem('fullName', `${response.data.first_name} ${response.data.last_name}`);
            history.replace('/users');
        }
        catch (e) {
            setError({
                title: e,
                message: 'Wrong email or password'
            });
        }


    };

    return (
        <div className='container'>
            <div className='row justify-content-center align-self-center'>
                <h3 className='card-title text-center mt-lg-5' data-testid="heading"> Sign in</h3>
                <div className='card w-50  m-lg-5 bg-white'>
                    <div className='card-body'>
                        <form onSubmit={submitFormHandler} data-testid="form">
                            <div className="mb-3 mt-5">
                                <label htmlFor="email" className="form-label">Email address</label>
                                <input type="text" className="form-control"
                                       onChange={emailHandler} data-testid="email"/>
                            </div>
                            <div className="mb-5">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className="form-control"
                                       onChange={passwordHandler} data-testid="password"/>
                            </div>

                            <div className="d-grid gap-2 mt-5">
                                <button className="btn btn-primary mt-5" data-testid="button" onClick={submitFormHandler}>Sign in</button>
                            </div>
                            {error && <p className='alert-danger mt-3' data-testid="error">{error.message}</p>}
                        </form>
                    </div>

                </div>
            </div>
            <p className='text-center'>Don't have an account ? <a href='/signup' data-testid="link">Create an account</a></p>
        </div>
    );

};

export default LoginForm;