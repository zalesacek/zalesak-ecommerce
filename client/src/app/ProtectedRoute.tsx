import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../context/Auth/AuthContext";
import { routesUrl } from './Routes';

const PrivateRoute = (props: any) => {
    const authContext = useContext(AuthContext);
    const { isAuthenticated, user } = authContext;

    let routeContent;
    const renderChild = () => {
        if(isAuthenticated && user.isAdmin){
            routeContent = {...props.children}
        } else {
            routeContent = (
                <Redirect to={routesUrl.AdminLogin} />
            )            
        }
        return routeContent;
    }

  return (
    <Route
        {...props}
    >
        {renderChild}        
    </Route>
  );
};

export default PrivateRoute;
