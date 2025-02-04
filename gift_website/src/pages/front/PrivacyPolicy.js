import MoreHelpButton from "../../components/MoreHelpButton";
import '../../stylesheets/privacyPolicy.css';

function PrivacyPolicy() {
    return(<>
        <div className="container px-4">
            <div className="row">
                <div className="col-12 text-center">
                    <h2 className="my-4 fw-bold privacy-policy-title">Privacy Policy</h2>
                </div>
                <div className="col-12">
                    <div className="info-section">
                        <h4 className="info-title">Information We Collect</h4>
                        <p className="info-content">
                            We collect only the necessary information to process your orders, such as your name, email, shipping address, and payment details.
                        </p>
                    </div>
                    <div className="info-section">
                        <h4 className="info-title">How We Use Your Information</h4>
                        <p className="info-content">
                            Your information is used to process transactions, deliver orders, and improve our services. We do not sell or share your data with third parties for marketing purposes.
                        </p>
                    </div>
                    <div className="info-section">
                        <h4 className="info-title">Data Security</h4>
                        <p className="info-content">
                            We take security seriously. Your personal data is protected through encryption and secure payment processing to ensure confidentiality.
                        </p>
                    </div>
                    <div className="info-section">
                        <h4 className="info-title">Cookies & Tracking</h4>
                        <p className="info-content">
                            We use cookies to enhance your shopping experience, such as remembering your cart items. You can disable cookies in your browser settings if you prefer.
                        </p>
                    </div>
                    <div className="info-section">
                        <h4 className="info-title">Your Rights</h4>
                        <p className="info-content">
                            You have the right to access, update, or request the deletion of your personal information. Contact us if you need any assistance regarding your data.
                        </p>
                    </div>
                    <div className="info-section">
                        <h4 className="info-title">Changes to This Policy</h4>
                        <p className="info-content">
                            We may update our Privacy Policy from time to time. Any changes will be posted on this page, so please check back periodically.
                        </p>
                    </div>
                    <MoreHelpButton />
                </div>
            </div>
        </div>
    </>)
}

export default PrivacyPolicy;