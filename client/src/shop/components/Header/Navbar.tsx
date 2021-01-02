import React, { useContext } from 'react';
import { NavLink, Link } from "react-router-dom";
import { routesUrl } from '../../../app/Routes';
import AuthContext from '../../../context/Auth/AuthContext';
import '../../styles/components/navbar.scss';

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, user } = authContext;

  const authLinks = (
    <>
      <li>
        <Link to={routesUrl.UserProfile}>User: {user && user.name}</Link>
      </li>
      <li>
        <button type="button" onClick={authContext.logout}>Logout</button>
      </li>
    </>
  );

  const nonAuthLinks = (
    <>
      <li>
        <NavLink to={routesUrl.Login}>Login</NavLink>
      </li>
      <li>
        <NavLink to={routesUrl.Registration}>Registration</NavLink>
      </li>
    </>
  );

  const adminLinks = (
    <>
      <li>
          <NavLink to={routesUrl.AdminProductsList}>Admin</NavLink>
      </li>
    </>
  );

  return (
    <nav className="header__navbar">
      <ul>
        <li>
          <NavLink to={routesUrl.Homepage}>Home</NavLink>
        </li>
        <li>
          <NavLink to={routesUrl.ProductsList}>Products</NavLink>
        </li>
        {isAuthenticated ? authLinks : nonAuthLinks}
        {user.isAdmin && adminLinks}
      </ul>
    </nav>
  );
}

export default Navbar;
