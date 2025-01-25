import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";
import "../stylesheets/footer.css";

import amex from "../pages/front/payments/amex.svg";
import visa from "../pages/front/payments/visa.svg";
import mastercard from "../pages/front/payments/mastercard.svg";
import googlepay from "../pages/front/payments/googlepay.svg";
import applepay from "../pages/front/payments/applepay.svg";
import paypal from "../pages/front/payments/paypal.svg";

function Footer() {
    // payments array
    const paymentImages = [amex, applepay, googlepay, visa, mastercard, paypal];

    // Check if the screen width is less than 768px
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 768);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (<>
        <footer className="bg-dark text-white pt-5 pb-4">
            <div className="container" id="accordion">
                <div className="row">

                    {/* Services */}
                    <div className="col-11 col-sm-12 col-md-3 mb-4 footer-container mx-auto">
                        <h5 className="footer-title d-flex justify-content-between align-items-center"
                            data-bs-toggle={!isDesktop ? "collapse" : null} // only active when the screen width is less than 768px
                            data-bs-target="#collapseOne" 
                            aria-controls="collapseOne"
                            aria-expanded={!isDesktop}
                        >
                            SERVICES
                            <span className="bi bi-chevron-down toggle-icon d-md-none d-sm-block"></span>
                        </h5>
                        <ul className="footer-list list-unstyled d-md-block collapse" id="collapseOne" aria-labelledby="headingOne" data-bs-parent="#accordion">
                            <li><a href="#account" className="footer-link">My Account</a></li>
                            <NavLink to="shipping-info" className="footer-link d-block">Shipping Information</NavLink>
                            <NavLink to="returns-info" className="footer-link d-block">Returns Policy</NavLink>
                            <NavLink to="privacy-info" className="footer-link d-block">Privacy Policy</NavLink>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="col-11 col-sm-12 col-md-3 mb-4 footer-container mx-auto">
                        <h5 className="footer-title d-flex justify-content-between align-items-center"
                            data-bs-toggle={!isDesktop ? "collapse" : null} // only active when the screen width is less than 768px
                            aria-expanded={!isDesktop}
                            data-bs-target="#collapseTwo" 
                            aria-controls="collapseTwo"
                        >
                            ABOUT US
                            <span className="bi bi-chevron-down toggle-icon d-md-none d-sm-block"></span>
                        </h5>
                        <ul className="footer-list list-unstyled d-md-block collapse" id="collapseTwo" aria-labelledby="headingOne" data-bs-parent="#accordion">
                            <li><a href="#find-us" className="footer-link">Our Story</a></li>
                        </ul>
                    </div>

                    {/* Payments */}
                    <div className="col-11 col-sm-12 col-md-3 mb-4 footer-container mx-auto">
                        <h5 className="footer-title d-flex justify-content-between align-items-center"
                            data-bs-toggle={!isDesktop ? "collapse" : null} // only active when the screen width is less than 768px
                            aria-expanded={!isDesktop}
                            data-bs-target="#collapseThree" 
                            aria-controls="collapseThree"
                        >
                            PAYMENTS
                            <span className="bi bi-chevron-down toggle-icon d-md-none d-sm-block"></span>
                        </h5>
                        <div className="footer-list list-unstyled d-md-block collapse" id="collapseThree" aria-labelledby="headingOne" data-bs-parent="#accordion">
                            <div className="payment-icons d-flex flex-wrap">
                                {paymentImages.map((src, index) => (
                                    <img key={index} src={src} alt="payment method" className="payment-icon" />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Phone and Social Media */}
                    <div className="col-11 col-sm-12 col-md-3 mb-4 mx-auto contact-list">
                        <h5 className="footer-title">CONTACT US</h5>
                        <p className="mb-1">
                        <i className="bi bi-telephone-fill me-2"></i>+61 412 345 678
                        </p>
                        <p className="mb-3">
                        <i className="bi bi-envelope-fill me-2"></i>giftbox@services.com
                        </p>
                        <div className="d-flex">
                            <a href="#facebook" className="footer-social me-3">
                                <i className="bi bi-facebook"></i>
                            </a>
                            <a href="#instagram" className="footer-social me-3">
                                <i className="bi bi-instagram"></i>
                            </a>
                            <a href="#youtube" className="footer-social">
                                <i className="bi bi-youtube"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    </>);
}

export default Footer;