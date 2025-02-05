import { ToastContainer, toast } from 'react-toastify';
import '../stylesheets/contact.css'
import { useState } from 'react';

function ContactUs(){
    const handleSubmit = (e) => {
        // Prevent the form from refreshing the page
        e.preventDefault();

        toast.success("Message sent successfully!");

        // Clear the form
        e.target.reset();
    };

    
    return(<>
        <div className="container mt-5 mb-5">
            <div className="row d-flex justify-content-center align-items-center">
                {/* image */}
                <div className="col-8 col-sm-7 col-md-6 col-lg-4 mb-4 image-container">
                    <div className="image-section">
                        <img src="https://img.freepik.com/free-vector/emails-concept-illustration_114360-27246.jpg?t=st=1737363096~exp=1737366696~hmac=244274a6985acff92c1ea154db5642d1b65770a32147a316577a554e5ebda731&w=740" alt="Contact Illustration" />
                    </div>
                </div>
                {/* form */}
                <div className="col-12 col-sm-5 col-md-4">
                    <div className="form-section">
                        <h2>Get in Touch</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input type="text" placeholder="Name" name="name" required 
                                onInvalid={(e) => e.target.setCustomValidity("Please fill out this field.")}
                                onInput={(e) => e.target.setCustomValidity("")}
                                />
                            </div>
                            <div className="form-group">
                                <input type="email" placeholder="Email" required 
                                onInvalid={(e) => e.target.setCustomValidity("Please enter a valid email address")}
                                onInput={(e) => e.target.setCustomValidity("")}
                                />
                            </div>
                            <div className="form-group">
                                <textarea placeholder="Message" required 
                                onInvalid={(e) => e.target.setCustomValidity("Please fill out this field.")}
                                onInput={(e) => e.target.setCustomValidity("")}
                                >
                                </textarea>
                            </div>
                            <input type="submit" className="submit-button form-button" value="Send" />
                            {/* <button type="button" className="submit-button form-button">Send</button> */}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default ContactUs;