import "./TrackingPage.css"
import {Header} from "../components/Header.jsx"
import {Link, useParams} from "react-router";
import {useEffect, useState} from "react";
import axios from "axios";
import dayjs from "dayjs";

export function TrackingPage() {
    let {orderId, productId} = useParams();
    const [orders, setOrders] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    useEffect(() => {
        const fetchOrders = async () => {
            const response = await axios.get(`/api/orders/${orderId}?expand=products`);
            setOrders(response?.data);
            const product = response?.data?.products?.find( product => product.productId === productId);
            setSelectedProduct(product);
            console.log(product);
        }

        fetchOrders().then(() => {
            console.log("Orders fetched successfully!");
        });
    }, [orderId, productId]);
    if(!orders || !selectedProduct) return null;
    return (
        <>
            <Header/>
            <link rel="icon" href="/tracking-favicon.png"/>
            <title>Tracking</title>
            <div className="tracking-page">
                <div className="order-tracking">
                    <Link className="back-to-orders-link link-primary" to="/orders">
                        View all orders
                    </Link>

                    <div className="delivery-date">
                        {`Arriving on ${dayjs(selectedProduct.estimatedDeliveryTimeMs).format("dddd - DD MMMM, YYYY")}`}
                    </div>

                    <div className="product-info">
                        {selectedProduct.product.name}
                    </div>

                    <div className="product-info">
                        {`Quantity: ${selectedProduct.quantity}`}
                    </div>

                    <img className="product-image" src={selectedProduct.product.image}/>

                    <div className="progress-labels-container">
                        <div className="progress-label">
                            Preparing
                        </div>
                        <div className="progress-label current-status">
                            Shipped
                        </div>
                        <div className="progress-label">
                            Delivered
                        </div>
                    </div>

                    <div className="progress-bar-container">
                        <div className="progress-bar"></div>
                    </div>
                </div>
            </div>
        </>
    )
}