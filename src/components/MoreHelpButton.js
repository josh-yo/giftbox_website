import { NavLink } from "react-router-dom";
import '../stylesheets/moreHelpButton.css';

function MoreHelpButton() {
    return(<>
        <NavLink to="/contact" className="submit-button form-button mb-5 help-button">Need More Help ?</NavLink>
    </>)
}

export default MoreHelpButton;