import "./CheckoutPageHeader.css"
import {NavLink} from "react-router";
import LogoImage from "../../assets/images/logo.png";
import MobileLogoImage from "../../assets/images/mobile-logo.png";
import CheckoutLockImage from "../../assets/images/icons/checkout-lock-icon.png";

export function CheckoutHeader(){
    return (
        <>
            <div className="checkout-header">
                <div className="header-content">
                    <div className="checkout-header-left-section">
                        <NavLink to="/">
                            <img className="logo" src={LogoImage} alt="Image"/>
                            <img className="mobile-logo" src={MobileLogoImage} alt="Image"/>
                        </NavLink>
                    </div>

                    <div className="checkout-header-middle-section">
                        Checkout (
                        <NavLink
                            to="/"
                            className={({ isActive }) => isActive ? "return-to-home-link" : ""}
                        >
                            3 items
                        </NavLink>
                        )
                    </div>

                    <div className="checkout-header-right-section">
                        <img src={CheckoutLockImage} alt="Image"/>
                    </div>
                </div>
            </div>
        </>
    )
}