import "./Header.css"
import {NavLink} from "react-router";
import LogoWhite from "../assets/images/logo-white.png";
import MobileLogoWhiteImage from "../assets/images/mobile-logo-white.png";
import SearchIcon from "../assets/images/icons/search-icon.png"
import CartIcon from "../assets/images/icons/cart-icon.png"

export function Header({cart}) {
    let totalQty = 0;
    cart?.forEach((item) => {
        totalQty += item.quantity;
    });
    return (
        <>
            <div className="header">
                <div className="left-section">
                    <NavLink
                        to="/"
                        className={({ isActive }) => isActive ? "header-link" : ""}
                    >
                        <img
                            className="logo"
                            src={LogoWhite}
                            alt="Logo Image"
                        />
                        <img className="mobile-logo" src={MobileLogoWhiteImage} alt="Image"/>
                    </NavLink>
                </div>

                <div className="middle-section">
                    <input className="search-bar" type="text" placeholder="Search"/>

                    <button className="search-button">
                        <img className="search-icon" src={SearchIcon} alt="Image"/>
                    </button>
                </div>

                <div className="right-section">
                    <NavLink
                        to="/orders"
                        className={({ isActive}) => `orders-link ${isActive ? "header-link" : ""}`}
                    >
                        <span className="orders-text">Orders</span>
                    </NavLink>

                    <NavLink
                        to="/checkout"
                        className={({ isActive}) => `cart-link ${isActive ? "header-link" : ""}`}
                    >
                        <img className="cart-icon" src={CartIcon} alt="Image"/>
                        <div className="cart-quantity">{totalQty}</div>
                        <div className="cart-text">Cart</div>
                    </NavLink>
                </div>
            </div>
        </>
    )
}