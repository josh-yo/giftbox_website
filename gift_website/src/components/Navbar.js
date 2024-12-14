import { NavLink, useLocation } from "react-router-dom";
import logo from "../pages/front/logo.png"

import '../stylesheets/navbar.css'
import { useState, useEffect } from 'react';


function Navbar(){
    const [isScrolled, setIsScrolled] = useState(false);

    const location = useLocation();
    const isHomePage = location.pathname === "/";
    
    useEffect(() => {
        if (!isHomePage) return;
        
        const handleScroll = () => {
        if (window.scrollY > 50) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return(<>

    <nav className={`navbar navbar-expand-md navbar-dark bg-dark ${
        isHomePage
          ? isScrolled
            ? "scrolled"
            : "navbar-absolute"
          : "navbar-fixed"
      }`}>
        <div className="container-fluid d-flex align-items-center justify-content-between">

            {/* logo */}
            <NavLink className="navbar-brand d-flex align-items-center mx-5" to="/">
                <img src={logo} alt="" width="30" height="24" className="d-inline-block align-text-top" />
            GIFT BOX
            </NavLink>
            
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse justify-content-center" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <NavLink className="nav-item nav-link me-4" to="/">Home <span className="sr-only"></span></NavLink>
                    <NavLink className="nav-item nav-link me-4" to="/about">About</NavLink>
                    <NavLink className="nav-item nav-link me-4" to="/products">Product</NavLink>
                    <NavLink className="nav-item nav-link me-4" to="/detail">Contact</NavLink>
                </div>
            </div>

            {/* icon */}
            <div className="d-flex align-items-center mx-5">
                <NavLink className="nav-item nav-link" to="/cart"><i className="bi bi-cart4" style={{color: 'white'}}></i></NavLink>
            </div>
        </div>
    </nav>
    </>)
}

export default Navbar;