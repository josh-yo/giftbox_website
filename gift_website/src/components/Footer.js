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
        <div className="container">
            <div className="row accordion">
                
           
         
                 
            {/* <div class="accordion" id="accordionExample">
                    <button className="btn btn-link" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                    Collapsible Group Item #1
                    </button>
                      
                

                    <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                        <div className="card-body">
                            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                        </div>
                    </div>
            </div> */}


                


                {/* Services */}
                <div className="col-xs-12 col-md-3 mb-3" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                    <h5 className="footer-title d-flex justify-content-between align-items-center">SERVICES
                        <span className="bi bi-chevron-down toggle-icon d-md-none d-sm-block"></span>
                    </h5>
                    
                    <ul className="footer-list list-unstyled d-md-block collapse" id="collapseOne" aria-labelledby="headingOne" data-parent="#accordion">
                        <li><a href="#account" className="footer-link">My Account</a></li>
                        <li><a href="#shipping" className="footer-link">Delivery</a></li>
                        <li><a href="#returns" className="footer-link">Returns Policy</a></li>
                        <li><a href="#returns" className="footer-link">Privacy Policy</a></li>
                    </ul>
                </div>

                {/* Contact */}
                <div className="col-xs-12 col-md-3 mb-3">
                    <h5 className="footer-title">ABOUT US</h5>
                    <ul className="list-unstyled">
                        <li><a href="#find-us" className="footer-link">Our Story</a></li>
                        <li><a href="#map" className="footer-link">Customer Reviews</a></li>
                    </ul>
                </div>

                {/* Phone and Social Media */}
                <div className="col-xs-12 col-md-3 mb-3">
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

                {/* Payments */}
                <div className="col-xs-12 col-md-3 mb-3 text-center">
                    <h5 className="footer-title">PAYMENTS</h5>
                        <div className="payment-icons d-flex justify-content-center flex-wrap">
                            {paymentImages.map((src, index) => (
                                <img key={index} src={src} alt="payment method" className="payment-icon" />
                            ))}
                        </div>
                </div>
            </div>
        </div>


        
        </footer>
    </>);
}

export default Footer;
