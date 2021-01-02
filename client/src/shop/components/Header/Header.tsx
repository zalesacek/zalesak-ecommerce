import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../styles/layout/header.scss';
import { routesUrl } from '../../../app/Routes'
import Navbar from './Navbar';
import CartPreview from '../Cart/CartPreview/CartPreview'

const Header = () => {
  return (
    <header
        className="header"
        role="banner"
        itemScope={undefined}
        itemType="http://schema.org/WPHeader"
    >
      <div className="header__logo">
          <NavLink to={routesUrl.Homepage}>
            <img src="https://via.placeholder.com/180x60" alt="" />
          </NavLink>
      </div>
      <div className="header__content">
        <Navbar />
        <div className="header__controls">
          <CartPreview />
        </div>
      </div>
    </header>
  );
}

export default Header;
