import { NavLink } from "react-router-dom";
import Lottie from "lottie-react";
import NotFoundAnimation from "./NotFound404.json";
import logo from "../../pages/front/logo.png";
import "../../stylesheets/NotFound404.css"

export default function NotFound404() {
  return (<>
    <div className="not-found-navbar">
      <div className="container-fluid">
        <div className="not-found-logo d-flex align-items-center mx-4">
          <img src={logo} alt="Logo" width="30" height="24" className="d-inline-block align-text-top" />
          <h1 className="h1 text-white">GIFT BOX</h1>
        </div>
      </div>
    </div>
    
    <div className="not-found-bg">
      <div className="not-found-content">
        <h1 className="not-found-title">Page Not Found</h1>
        <Lottie className="not-found-animation" animationData={NotFoundAnimation} loop={true} />
        <NavLink to="/" className="not-found-subtext">🚀 Take me home</NavLink>
      </div>
    </div>
  </>);
}