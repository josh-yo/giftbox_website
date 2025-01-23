import "../../stylesheets/shippingInformation.css";

function ShippingInformation() {
  return (<>
        <div className="container px-4">
            <div className="row">
                <div className="col-12 text-center">
                    <h2 className="my-4 fw-bold shipping-page-title">Shipping Information</h2>
                </div>
                <div className="col-12">
                    <div className="info-section">
                        <h4 className="info-title">Free Shipping</h4>
                        <p className="info-content">We offer free shipping on all orders within Australia, ensuring that you get the best value for your purchase without any hidden costs.</p>
                    </div>
                    <div className="info-section">
                        <h4 className="info-title">Delivery Locations</h4>
                        <p className="info-content">Currently, we deliver to locations within Australia only. International shipping is not available at the moment.</p>
                    </div>
                    <div className="info-section">
                        <h4 className="info-title">Standard Delivery Time:</h4>
                        <ul className="info-content">
                            <li>Metro areas: 3–5 business days</li>
                            <li>Regional areas: 5–7 business days</li>
                        </ul>
                    </div>
                    <div className="info-section">
                        <h4 className="info-title">Order Processing</h4>
                        <p className="info-content">All orders are processed within 1–2 business days of payment confirmation.</p>
                    </div>
                    <div className="info-section">
                        <h4 className="info-title">Large or Heavy Items</h4>
                        <p className="info-content mb-5">For large or heavy items, there are no additional shipping charges.</p>
                    </div>
                </div>
            </div>
        </div>
    </>  
  );
}

export default ShippingInformation;