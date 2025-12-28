import "./TrackingPage.css"
import {Header} from "../components/Header.jsx"
import {Link, useParams} from "react-router";
import {useEffect, useState} from "react";
import axios from "axios";
import dayjs from "dayjs";

export function TrackingPage({ cart }) {
    let {orderId, productId} = useParams();
    const [order, setOrder] = useState(null);
    useEffect(() => {
        const fetchOrders = async () => {
            const response = await axios.get(`/api/orders/${orderId}?expand=products`);
            setOrder(response?.data);
        }

        fetchOrders().then(() => {
            console.log("Orders fetched successfully!");
        });
    }, [orderId, productId]);
    if(!order) return null;
    const orderProduct = order.products.find((product) => {
        return product.productId === productId;
    });

    const totalDeliveryTimeMs = orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs;
    const timePassedMs = dayjs().diff(dayjs(order.orderTimeMs));
    let deliveryPercent = (timePassedMs / totalDeliveryTimeMs) * 100;
    if(deliveryPercent > 100) deliveryPercent = 100;
    let isPreparing = deliveryPercent < 33;
    let isShipped = deliveryPercent > 33 && deliveryPercent <= 66;
    let isDelivered = deliveryPercent > 66;

    return (
        <>
            <Header  cart={cart}/>
            <link rel="icon" href="/tracking-favicon.png"/>
            <title>Tracking</title>
            <div className="tracking-page">
                <div className="order-tracking">
                    <Link className="back-to-orders-link link-primary" to="/orders">
                        View all orders
                    </Link>

                    <div className="delivery-date">
                        {
                            deliveryPercent < 100 ?
                                `Delivered on ${dayjs(orderProduct.estimatedDeliveryTimeMs).format("dddd - DD MMMM, YYYY")}`
                                :
                                `Arriving on ${dayjs(orderProduct.estimatedDeliveryTimeMs).format("dddd - DD MMMM, YYYY")}`
                        }
                    </div>

                    <div className="product-info">
                        {orderProduct.product.name}
                    </div>

                    <div className="product-info">
                        {`Quantity: ${orderProduct.quantity}`}
                    </div>

                    <img className="product-image" src={orderProduct.product.image} alt={orderProduct.product.name}/>

                    <div className="progress-labels-container">
                        <div className={`${isPreparing ? "current-status ":""}progress-label`}>
                            Preparing
                        </div>
                        <div className={`${isShipped ? "current-status ":""}progress-label`}>
                            Shipped
                        </div>
                        <div className={`${isDelivered ? "current-status ":""}progress-label`}>
                            Delivered
                        </div>
                    </div>

                    <div className="progress-bar-container">
                        <div className="progress-bar" style={{width: `${deliveryPercent}%`}}></div>
                    </div>
                </div>
            </div>
        </>
    )
}