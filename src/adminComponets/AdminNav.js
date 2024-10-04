import { NavLink } from "react-router-dom";

function AdminNav() {
    return ( 

        
<ul className="nav-ul admin-nav-ul mt-5">
        <NavLink exact to="/admin/aman" activeClassName="active-link">
          <li>Posts</li>
        </NavLink>
        <NavLink to="/admin/stars" activeClassName="active-link">
          <li>Stars</li>
        </NavLink>
        <NavLink to="/admin/terabox" activeClassName="active-link">
          <li>TeraBox</li>
        </NavLink>
        <NavLink to="/admin/channels" activeClassName="active-link">
          <li>Channels</li>
        </NavLink>
      </ul>
     );
}

export default AdminNav;