import React from "react";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand" href="/">
        Covid-19 Statistics Tracker
      </a>
      <a className="nav-link text-light" href="/">
        Global Statistics
      </a>
      <a className="nav-link text-light" href="/">
        Work in Progress
      </a>

    </nav>
  );
}

export default Nav;
