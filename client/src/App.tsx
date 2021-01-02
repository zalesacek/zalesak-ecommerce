import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from './shop/components/Header/Header';
import Footer from './shop/components/Footer/Footer';
import Sidebar from './admin/components/Sidebar/Sidebar';
import './shop/styles/layout/app.scss';
import { routes, IRoute } from './app/Routes';
import { Layout } from './app/Types';
import AuthState from './context/Auth/AuthState';
import CartState from './context/Cart/CartState';
import ProtectedRoute from './app/ProtectedRoute';

const App = () => {  

  const layoutType = (route: IRoute) => {
    let layout;
    switch (route.layout) {
      case Layout.Blank:
        layout = (
          <div className="page page--blank">
            <route.component /> 
          </div>
        )
        break;

      case Layout.Shop:
        layout = (
          <div className="page">
            <Header />
              <route.component />
            <Footer />
          </div>
        )
        break;

      case Layout.Admin:
        layout = (
          <div className="page page--admin">
            <Sidebar />
            <route.component />
          </div>
        )
        break;
    
      default:
        layout = (
          <>
            <Header />
              <route.component />
            <Footer />
          </>
        )
        break;
    }
    return layout;
  }

  return (
    <AuthState>
      <CartState>
        <BrowserRouter>      
          <Switch>
            {routes.map((route: IRoute) => {   
              if(route.protected){
                return <ProtectedRoute
                  key={route.path}
                  exact={route.exact}
                  path={route.path}
                >
                  {layoutType(route)}
                </ProtectedRoute>
              } else {
                return <Route
                  key={route.path}
                  exact={route.exact}
                  path={route.path}
                >
                    {layoutType(route)}
                </Route>
              }                   
            })}
          </Switch>      
        </BrowserRouter>
      </CartState>
    </AuthState>
  );
}

export default App;
