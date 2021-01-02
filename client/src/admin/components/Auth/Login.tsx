import React from 'react';
import { NavLink } from 'react-router-dom';
import { routesUrl } from '../../../app/Routes';
import '../../styles/layout/auth.scss'

const Login = () => {

  return (
    <div className="auth">
        <div className="box box--auth">
            <h1 className="box__h1">Sign in to your account</h1>
            <div className="form-default auth-form">
                <div className="form-field">
                    <label className="form-field__label">E-Mail Address</label>
                    <input className="form-field__textbox" type="email" name="email" id="email" />
                </div>
                <div className="form-field">
                    <label className="form-field__label">Password</label>
                    <input className="form-field__textbox" type="password" name="password" id="password" />
                </div>
                <div className="form-info form-info--login">
                    <NavLink to={routesUrl.AdminProductsList}>Forgot password?</NavLink>
                    <div className="form-field">
                        <label className="form-field__checkbox">
                            <input type="checkbox" name="remember" id="remember" />
                            <span className="form-field__label">Remember me</span>
                            <span className="form-field__indicator"></span>
                        </label>                                    
                    </div>
                </div>              
                <button className="btn btn-primary w-100" type="button">Sign In</button>
            </div>            
            <NavLink to={routesUrl.AdminProductsList}>Continue</NavLink>
        </div>
        <div className="auth__info text-center">
            Don't have an Account? <NavLink to={routesUrl.AdminProductsList}><strong>Sign Up</strong></NavLink>
        </div>        
    </div>
  );
}

export default Login;
