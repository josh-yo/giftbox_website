import { NavLink, useLocation } from "react-router-dom";
import logo from "../pages/front/logo.png"

import '../stylesheets/navbar.css'
import { useState, useEffect } from 'react';


function Navbar({ cartData, cartIconRef }){
    const [isScrolled, setIsScrolled] = useState(false);

    const location = useLocation();
    const isHomePage = location.pathname === "/";
    
    useEffect(() => {
        if (!isHomePage) {
            setIsScrolled(false);
            return;
        }
        
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

    <nav className={`navbar navbar-expand-md navbar-dark bg-dark pt-3 pb-3 ${
        isHomePage
          ? isScrolled
            ? "scrolled"
            : "navbar-absolute"
          : "navbar-fixed"
      }`}>
        <div className="container-fluid d-flex align-items-center justify-content-between">

            {/* logo */}
            <NavLink className="navbar-brand d-flex align-items-center mx-4 logo" to="/">
                <img src={logo} alt="" width="30" height="24" className="d-inline-block align-text-top" />
            <h1 className="h5">GIFT BOX</h1>
            </NavLink>
            
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse justify-content-center" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <NavLink className="nav-item nav-link home me-4" to="/">Home <span className="sr-only"></span></NavLink>
                    <NavLink className="nav-item nav-link about me-4" to="/aboutus">About</NavLink>
                    <NavLink className="nav-item nav-link products me-4" to="/products">Product</NavLink>
                    <NavLink className="nav-item nav-link detail me-4" to="/contact">Contact</NavLink>
                </div>
                {/* icon */}
                <div className="d-flex align-items-center icon">
                    {/* "My Account" and "Wishlist" are temporarily removed. To enable them, uncomment the code below. */}
                    {/* <NavLink className="nav-item nav-link" to="/cart"><i className="bi bi-person-circle nav-icon" style={{color: 'white'}}></i></NavLink>
                    <NavLink className="nav-item nav-link" to="/cart"><i className="bi bi-bookmark-heart nav-icon" style={{color: 'white'}}></i></NavLink> */}
                    
                    <NavLink className="nav-item nav-link position-relative" to="/cart">
                        <i className="bi bi-cart4 nav-icon fs-5" style={{color: 'white'}} ref={cartIconRef}></i>
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger cart-quantity">
                            {cartData?.carts?.length}
                        </span>
                    </NavLink>
                </div>
            </div>

            {/* <div className="d-none d-md-block navbar-transparent"></div> */}
            <div className="d-block d-md-none navbar-dark-bg"></div>
        </div>
    </nav>
    </>)
}

export default Navbar;