import React from 'react';
import { NavLink } from "react-router-dom";
import { routesUrl } from '../../../app/Routes';
import '../../styles/components/menu.scss';

const SidebarMenu = () => {
  return (
    <nav className="sidebar__menu">
      <ul>
        <li>
          <NavLink to={routesUrl.AdminLogin}>Login</NavLink>
        </li>
        <li>
          <NavLink to={routesUrl.AdminProductsList}>Products</NavLink>
        </li>
        <li>
          <NavLink to={routesUrl.AdminUsersList}>Users</NavLink>
        </li>
        <li>
          <NavLink to={routesUrl.AdminOrders}>Orders</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default SidebarMenu;
