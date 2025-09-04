import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="navbar flex gap-4">
      <h1>FitFlow</h1>
      <Link to="/dashboard"><p>Exercises</p></Link>
      <Link to="/favorites"><p>Favorites</p></Link>
      <Link to="/history"><p>History</p></Link>
      <Link to="/progress"><p>Progress</p></Link>
      <Link to="/plans"><p>Plans</p></Link>
      <hr />
    </nav>
  );
};

export default NavBar;
