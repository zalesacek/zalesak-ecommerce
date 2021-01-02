import React from 'react';
import { NavLink } from "react-router-dom";
import { routesUrl } from '../../../../app/Routes';

const ProfileMenu = () => {

  return (
    <nav className="profile__navbar">
      <ul>
        <li>
          <NavLink to={routesUrl.UserProfile}>Profile</NavLink>
        </li>
        <li>
          <NavLink to={routesUrl.UserOrders}>Orders</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default ProfileMenu;
