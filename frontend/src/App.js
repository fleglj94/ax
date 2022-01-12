import './App.css';
import Layout from "./Components/UI/Layout";
import {Switch, Route, Redirect} from "react-router-dom";
import LoginForm from "./Components/LoginForm";
import RegistrationForm from "./Components/RegistrationForm";
import Users from "./Components/Users";
import AuthContext from "./Contexts/auth-context";
import {useContext} from "react";


function App() {

    const authCtx = useContext(AuthContext);
    return (
        <div className='bg-light'>
            <Layout>
                <Switch>
                    {!authCtx.isLoggedIn && (<Route path='/login'>
                        <LoginForm />
                    </Route>)}
                    <Route path='/signup'>
                        <RegistrationForm/>
                    </Route>
                    {authCtx.isLoggedIn && (<Route path='/users'>
                        <Users />
                    </Route>)}
                    <Route path='*'>
                        {authCtx.isLoggedIn ? <Redirect to='/users'/> : <Redirect to='/login'/>}
                    </Route>
                </Switch>
            </Layout>
        </div>
    );
}

export default App;
