import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = props => {
  return (
    <div className="navbar navbar-dark bg-dark">
      <Link to='/' className="navbar-brand">Google Book Search</Link>
      <nav className="navbar-nav ml-auto">
        <NavLink to="/" className="nav-link" activeClassName="active">Search</NavLink>
        <NavLink to='/saved' className="nav-link" activeClassName="active">Saved</NavLink>
      </nav>
    </div>
  )
}

export default Navbar;