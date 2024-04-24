import React, { useEffect } from 'react';
import {Link, useLocation, useNavigate } from "react-router-dom";


const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = ()=>{
    localStorage.removeItem('Token'); 
    navigate('/login');

  }

  // using useEffect hook we can use hover effect for the navbar 
  let location = useLocation();
 useEffect(() => {
    console.log(location.pathname);
  }, [location]); 

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">iNotebook</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
        </li>      
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} aria-current="page" to="/about">About</Link>
        </li>
      </ul>

     { ! localStorage.getItem('Token')?(<form className="d-flex">
      <Link type="button" to="/login" className="btn btn-primary mx-1">Login</Link>
      <Link type="button" to="/signUp" className="btn btn-primary mx-1">SignUp</Link>
      </form>) : (<button className='btn btn-primary mx-1' onClick={handleLogout}>Log Out</button>)}
    </div>
  </div>
</nav>
  )
}

export default Navbar
