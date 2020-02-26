import React from "react";
import { NavLink } from "react-router-dom";
import "./Nav.css"

function Nav() {
  return (
    <nav  className="Navbar">
        <h1 className="Brand">
        Covid-19 Statistics Tracker
        </h1>
        <ul className="NavClass">
            <li>
                <NavLink exact to="/">
                    Global Statistics
                </NavLink>
            </li>
            <li>
                <NavLink exact to="/">
                Work in Progress
                </NavLink>
            </li>
            <li>
                <NavLink exact to="/">
                Still in development
                </NavLink>
            </li>
        </ul>

    </nav>
  );
}

export default Nav;
