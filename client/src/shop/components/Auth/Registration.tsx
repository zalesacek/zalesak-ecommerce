import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { routesUrl } from '../../../app/Routes';
import AuthContext from '../../../context/Auth/AuthContext';

const Registration = () => {
    const authContext = useContext(AuthContext);
    let history = useHistory();

    useEffect(() => {
        if (authContext.isAuthenticated) {
            history.push(routesUrl.Homepage)
        }
        if (authContext.error === "User already exist") {
            // set error
        }
        // eslint-disable-next-line
    }, [authContext.error, authContext.isAuthenticated]);

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const { name, email, password, confirmPassword } = user;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const onSubmit = (e: React.MouseEvent) => {
        e.preventDefault();
        if(name === "" || email === '' || password === ''){
            // trigger err
        } else if (password !== confirmPassword) {
            // trigger err
        } else {
          authContext.register({ name, email, password, confirmPassword });
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
                        type="text"
                        placeholder="Name"
                        name="name"
                        value={name}
                        onChange={onChange}
                    /> 
                    <br />
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
                    <input
                        type="text"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={onChange}
                        minLength={6}
                    />
                     <br />
                    <button type="button" onClick={onSubmit}>Create a new user</button>                     
                </div>
            </section>      
        </main>
    );
}

export default Registration;
