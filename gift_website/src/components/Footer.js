import { NavLink } from "react-router-dom";
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

    return (<>
        <footer className="bg-dark text-white pt-5 pb-4">
            <div className="container" id="accordion">
                <div className="row">

                    {/* Services */}
                    <div className="col-xs-12 col-md-3 mb-3" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                        <h5 className="footer-title d-flex justify-content-between align-items-center">SERVICES
                            <span className="bi bi-chevron-down toggle-icon d-md-none d-sm-block"></span>
                        </h5>
                        <ul className="footer-list list-unstyled d-md-block collapse" id="collapseOne" aria-labelledby="headingOne" data-bs-parent="#accordion">
                            <li><a href="#account" className="footer-link">My Account</a></li>
                            <li><a href="#shipping" className="footer-link">Delivery</a></li>
                            <li><a href="#returns" className="footer-link">Returns Policy</a></li>
                            <li><a href="#returns" className="footer-link">Privacy Policy</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="col-xs-12 col-md-3 mb-3" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        <h5 className="footer-title d-flex justify-content-between align-items-center">ABOUT US
                            <span className="bi bi-chevron-down toggle-icon d-md-none d-sm-block"></span>
                        </h5>
                        <ul className="footer-list list-unstyled d-md-block collapse" id="collapseTwo" aria-labelledby="headingOne" data-bs-parent="#accordion">
                            <li><a href="#find-us" className="footer-link">Our Story</a></li>
                            <li><a href="#map" className="footer-link">Customer Reviews</a></li>
                        </ul>
                    </div>

                    {/* Payments */}
                    <div className="col-xs-12 col-md-3 mb-3" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        <h5 className="footer-title d-flex justify-content-between align-items-center">PAYMENTS
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
                    <div className="col-xs-12 col-md-3 mb-3 contact-list">
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