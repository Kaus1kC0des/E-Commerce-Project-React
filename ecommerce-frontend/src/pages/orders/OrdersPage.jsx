import "./OrdersPage.css";
import {Header} from "../../components/Header.jsx"
import {Fragment, useEffect, useState} from "react";
import axios from "axios";
import {OrdersGrid} from "./OrdersGrid.jsx";


export function OrdersPage({cart}) {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        axios.get("/api/orders?expand=products")
            .then((response) => {
                setOrders(response?.data);
            })
    },[])
    return (
        <>
            <Header cart={cart}/>
            <link rel="icon" href="/orders-favicon.png"/>
            <title>Orders</title>
            <div className="orders-page">
                <div className="page-title">Your Orders</div>

                <OrdersGrid orders={orders}/>
            </div>
        </>
    )
}