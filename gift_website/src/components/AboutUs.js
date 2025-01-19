import '../stylesheets/aboutUs.css';

function AboutUs() {
    return(<>
        <div className="text-center aboutUs">
            <p className="pt-5">Our Beliefs</p>
            <p className="slogan">Memorable, Celebrate, Connect</p>
        </div>
        <div className="container mt-5 mb-6">
            <div className="row d-flex justify-content-center align-items-center">
                <div className="col-6 col-md-5 col-lg-4">
                    <img src="https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="CEOpicture" alt="" />
                </div>
                <div className="col-6 col-md-6 col-lg-3">
                    <p className="content-title">Gifts bring people together</p>
                    <p className="CEOcontent">We believe that every gift has the power to strengthen relationships, bring joy, and make life’s moments even more special. Our mission is to make giving simple, personal, and unforgettable.</p>
                    <p className="CEOcontent text-end">— Lily Anderson (CEO) —</p>
                </div>
            </div>
        </div>
    </>)
}
export default AboutUs;