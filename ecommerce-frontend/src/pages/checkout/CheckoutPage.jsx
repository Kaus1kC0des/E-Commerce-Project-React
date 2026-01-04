import "./CheckoutPageHeader.css";
import "./CheckoutPage.css";
import {CheckoutHeader} from "./CheckoutHeader.jsx";
import axios from "axios";
import {useState, useEffect} from "react";
import {OrderSummary} from "./OrderSummary.jsx";
import {PaymentSummary} from "./PaymentSummary.jsx";

export function CheckoutPage({ cart, loadCart }) {
    const [deliveryOptions, setDeliveryOptions] = useState([]);
    const [paymentSummary, setPaymentSummary] = useState(null);

    useEffect(() => {
        const getDeliveryOptions = async () => {
            const response = await axios.get("/api/delivery-options?expand=estimatedDeliveryTime");
            setDeliveryOptions(response?.data);
        }

        getDeliveryOptions().then();
    }, []);

    useEffect(() =>{
        const fetchPaymentSummary = async () => {
            const response  = await axios.get("/api/payment-summary");
            setPaymentSummary(response?.data);
        }
        fetchPaymentSummary().then();
    } , [cart]);

    return (
        <>
            <link rel="icon" href="/cart-favicon.png"/>
            <title>Checkout</title>
            <CheckoutHeader/>

            <div className="checkout-page">
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">
                    <OrderSummary deliveryOptions={deliveryOptions} cart={cart} loadCart={loadCart}/>
                    <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart}/>
                </div>
            </div>
        </>
    );
}
