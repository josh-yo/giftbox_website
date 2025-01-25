import '../../stylesheets/returnsPolicy.css';

function ReturnsPolicy() {
    return(<>
        <div className="container px-4">
            <div className="row">
                <div className="col-12 text-center">
                    <h2 className="my-4 fw-bold returns-policy-title">Returns Policy</h2>
                </div>
                <div className="col-12">
                    <div className="info-section">
                        <h4 className="info-title">1. Check Your Order</h4>
                        <p className="info-content">Please inspect your items upon arrival to ensure everything is correct. If you receive the wrong item or something is missing, let us know as soon as possible.</p>
                    </div>
                    <div className="info-section">
                        <h4 className="info-title">2. Keep Packaging</h4>
                        <p className="info-content">Keep all original packaging and documents until you are satisfied with your order. This helps with any potential returns or exchanges.</p>
                    </div>
                    <div className="info-section">
                        <h4 className="info-title">3. Report Issues Quickly</h4>
                        <p className="info-content">If there are any problems with your order, please contact us within 7 days of receiving your item. We’re happy to help!</p>
                    </div>
                    <div className="info-section">
                        <h4 className="info-title">4. Proof of Purchase</h4>
                        <p className="info-content">Keep your invoice or order reference handy for quick and efficient assistance with your return request.</p>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default ReturnsPolicy;