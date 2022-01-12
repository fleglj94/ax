import {Link, useHistory} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import AuthContext from "../../Contexts/auth-context";
let initialFullName;
const Header = () => {

    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;
    const history = useHistory();
    const [fullName, setFullName] = useState(initialFullName);
    const logoutHandler = () => {
        authCtx.logout();
        history.replace('/login');
    };

    const classesLoggedIn = 'nav-item'
    const classesNotLoggedIn = 'nav-item visually-hidden'

    if (isLoggedIn) {
       initialFullName = localStorage.getItem('fullName');
    }

        useEffect(() => {
            setFullName(initialFullName)
        }, [fullName]);

    return (
        <header>
            <nav className='navbar navbar-expand-lg bg-primary'>
                <div className='container-fluid'>
                    <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                        {isLoggedIn ? (
                            <li className={classesLoggedIn}>
                                <p className='mx-5 text-white mt-2'>Users</p>
                            </li>
                        ) : (
                            <li className={classesNotLoggedIn}>
                                <p className='mx-5 text-white mt-2'>Users</p>
                            </li>
                        )}

                    </ul>

                    <ul className='navbar-nav me-5'>
                        {isLoggedIn && < li className='nav-item text-white me-3 mt-2'>
                            <p>{fullName}</p>
                            </li>
                        }
                        <li className='nav-item me-5'>
                            {!isLoggedIn ? <Link className='nav-link text-white' to='/login'>Log in</Link> :
                                <Link className='nav-link text-white' onClick={logoutHandler}>Logout</Link>}
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Header;