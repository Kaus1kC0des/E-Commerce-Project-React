import dayjs from "dayjs";
import {formatMoney} from "../../utils/money.js";
import {Fragment} from "react";
import {Link} from "react-router";
import axios from "axios";

export function OrdersGrid({ orders, loadCart }) {
    return (
        <div className="orders-grid">
            {orders?.map((order) => {
                return (
                    <div className="order-container" key={order.id} id={order.id}>

                        <div className="order-header">
                            <div className="order-header-left-section">
                                <div className="order-date">
                                    <div className="order-header-label">Order Placed:</div>
                                    <div>{dayjs(order.orderTimeMs).format("MMMM DD, YYYY")}</div>
                                </div>
                                <div className="order-total">
                                    <div className="order-header-label">Total:</div>
                                    <div>{formatMoney(order.totalCostCents)}</div>
                                </div>
                            </div>

                            <div className="order-header-right-section">
                                <div className="order-header-label">Order ID:</div>
                                <div>{order.id}</div>
                            </div>
                        </div>

                        <div className="order-details-grid">
                            {order.products?.map((product) => {
                                const addToCart = async () => {
                                    await axios.post("/api/cart-items", {
                                        productId: product.productId,
                                        quantity: 1,
                                    });
                                    await loadCart();
                                }
                                return (
                                    <Fragment key={product.productId}>
                                        <div className="product-image-container">
                                            <img src={product.product.image} alt={product.product.name}/>
                                        </div>

                                        <div className="product-details">
                                            <div className="product-name">
                                                {product.product.name}
                                            </div>
                                            <div className="product-delivery-date">
                                                Arriving on: {dayjs(product.estimatedDeliveryTimeMs).format("dddd, DD MMMM YYYY")}
                                            </div>
                                            <div className="product-quantity">
                                                Quantity: {product.quantity}
                                            </div>
                                            <button
                                                className="buy-again-button button-primary"
                                                onClick={addToCart}
                                            >
                                                <img className="buy-again-icon" src="/images/icons/buy-again.png" alt={product.product.name + " Buy Again Icon"}/>
                                                <span
                                                    className="buy-again-message"
                                                >
                                                    Add to Cart
                                                </span>
                                            </button>
                                        </div>

                                        <div className="product-actions">
                                            <Link to={`/tracking/${order.id}/${product.productId}`}>
                                                <button className="track-package-button button-secondary">
                                                    Track package
                                                </button>
                                            </Link>
                                        </div>
                                    </Fragment>
                                )
                            })}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}