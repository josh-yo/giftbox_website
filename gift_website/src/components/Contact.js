import '../stylesheets/contact.css'

function ContactUs(){
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
                        <form>
                            <div className="form-group">
                                <input type="text" placeholder="Name" required />
                            </div>
                            <div className="form-group">
                                <input type="email" placeholder="Email" required />
                            </div>
                            <div className="form-group">
                                <textarea placeholder="Message" required></textarea>
                            </div>
                            <button type="button" className="submit-button form-button">Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default ContactUs;