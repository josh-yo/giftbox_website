import { NavLink } from "react-router-dom";
import logo from "../pages/front/logo.png"

function Navbar(){
    return(<>
                    

        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <NavLink className="navbar-brand" to="/">Navbar</NavLink>


            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse justify-content-center" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                <NavLink className="nav-item nav-link me-4" to="/">Home <span className="sr-only"></span></NavLink>
                <NavLink className="nav-item nav-link me-4" to="/about">About</NavLink>
                <NavLink className="nav-item nav-link me-4" to="/products">Product</NavLink>
                <NavLink className="nav-item nav-link me-4" to="/detail">Detail</NavLink>
                <NavLink className="nav-item nav-link me-4" to="/detail">Contact</NavLink>
                <NavLink className="nav-item nav-link" to="/cart"><i className="bi bi-cart4"></i></NavLink>
                </div>
            </div>


        </nav>
    </>)
}

export default Navbar;