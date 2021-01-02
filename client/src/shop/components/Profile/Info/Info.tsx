import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { routesUrl } from '../../../../app/Routes';
import AuthContext from '../../../../context/Auth/AuthContext';
import Menu from '../Menu/Menu';

const Info = () => {
    const authContext = useContext(AuthContext);
    let history = useHistory();

    const { user } = authContext;

    useEffect(() => {
        if(!authContext.isAuthenticated){
            history.push(routesUrl.Homepage)
        }

        // eslint-disable-next-line
    }, [authContext.isAuthenticated, history])

    return (
        <main
            className="content"
            role="main"
            itemScope={undefined}
            itemProp="mainContentOfPage"
        >
            <section className="content__product-detail">
                <div className="container">     
                    <Menu />
                    <h1>Profile</h1>
                    <h2>{user.name}</h2>
                    <h3>{user.email}</h3>
                </div>
            </section>      
        </main>
    );
}

export default Info;
