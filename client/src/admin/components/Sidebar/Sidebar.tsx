import React from 'react';
import '../../styles/layout/sidebar.scss';
import { NavLink } from 'react-router-dom';
import { routesUrl } from '../../../app/Routes';
import SidebarMenu from './SidebarMenu'; 

const Sidebar = () => {
  return (
    <aside className="sidebar">
        <div className="sidebar__logo">
          <NavLink to={routesUrl.Homepage}>
              <img src="https://via.placeholder.com/40x40" alt="" />
          </NavLink>
        </div>
        <SidebarMenu />
    </aside>
  );
}

export default Sidebar;
