import "./CheckoutPageHeader.css";
import "./CheckoutPage.css";
import {CheckoutHeader} from "./CheckoutHeader.jsx";
import axios from "axios";
import {useState, useEffect} from "react";
import {OrderSummary} from "./OrderSummary.jsx";
import {PaymentSummary} from "./PaymentSummary.jsx";

export function CheckoutPage({cart}) {
    const [deliveryOptions, setDeliveryOptions] = useState([]);
    const [paymentSummary, setPaymentSummary] = useState(null);

    useEffect(() => {
        axios.get("/api/delivery-options?expand=estimatedDeliveryTime")
            .then((response) => {
                setDeliveryOptions(response?.data);
            });

        axios.get("/api/payment-summary")
            .then((response) => {
                setPaymentSummary(response?.data);
            });

    }, []);
    return (
        <>
            <link rel="icon" href="/cart-favicon.png"/>
            <title>Checkout</title>
            <CheckoutHeader/>

            <div className="checkout-page">
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">
                    <OrderSummary deliveryOptions={deliveryOptions} cart={cart}/>
                    <PaymentSummary paymentSummary={paymentSummary}/>
                </div>
            </div>
        </>
    );
}
