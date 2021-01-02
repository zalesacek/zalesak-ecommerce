import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from "react-router-dom";
import { routesUrl } from '../../../app/Routes';
import AuthContext from '../../../context/Auth/AuthContext';

const Login = () => {
    const authContext = useContext(AuthContext);
    let history = useHistory();

    useEffect(() => {
        if (authContext.isAuthenticated) {
            history.push(routesUrl.Homepage)
        }
        if (authContext.error === "Invalid email") {
            // set error msg
        }
    }, [authContext.error, authContext.isAuthenticated, history]);

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const { email, password } = user;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const onSubmit = (e: React.MouseEvent) => {
        e.preventDefault();
        if(email === '' || password === ''){
            // trigger error
        } else {
          authContext.login( { email, password } );
        }
    };

    return (
        <main
            className="content"
            role="main"
            itemScope={undefined}
            itemProp="mainContentOfPage"
        >
            <section className="content__product-detail">
                <div className="container">     
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={email}
                        onChange={onChange}
                    />
                    <br />
                    <input
                        type="text"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={onChange}
                    />
                    <br />
                    <button type="button" onClick={onSubmit}>Login</button>                     
                </div>
            </section>      
        </main>
    );
}

export default Login;
