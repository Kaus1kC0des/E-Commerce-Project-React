import {formatMoney} from "../../utils/money.js";
import dayjs from "dayjs";

export function OrderSummary({ deliveryOptions, cart }){
    return(
        <div className="order-summary">
            {
                deliveryOptions.length > 0 &&
                cart.map((cartItem) => {
                    let selectedDeliveryOption = deliveryOptions.find((option) => option.id === cartItem.deliveryOptionId);
                    return(
                        <div className="cart-item-container" key={cartItem.productId}>
                            <div className="delivery-date">
                                Delivery date: {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format("dddd, DD MMMM YYYY")}
                            </div>

                            <div className="cart-item-details-grid">
                                <img
                                    className="product-image"
                                    src={cartItem.product.image}
                                />

                                <div className="cart-item-details">
                                    <div className="product-name">
                                        {cartItem.product.name}
                                    </div>
                                    <div className="product-price">{formatMoney(cartItem.product.priceCents)}</div>
                                    <div className="product-quantity">
                                                    <span>
                                                      Quantity: <span className="quantity-label">{cartItem.quantity}</span>
                                                    </span>
                                        <br />
                                        <span className="update-quantity-link link-primary">
                                                      Update
                                                    </span>
                                        <span className="delete-quantity-link link-primary">
                                                      Delete
                                                    </span>
                                    </div>
                                </div>

                                <div className="delivery-options">
                                    <div className="delivery-options-title">
                                        Choose a delivery option:
                                    </div>
                                    {deliveryOptions.map((option) => {
                                        let deliveryPrice = "FREE Shipping";
                                        if(option.priceCents > 0){
                                            deliveryPrice = `${formatMoney(option.priceCents)} - Shipping`;
                                        }
                                        return(
                                            <div className="delivery-option" key={option.id}>
                                                <input
                                                    checked={cartItem.deliveryOptionId === option.id}
                                                    onChange={() => cartItem.deliveryOptionId = option.id}
                                                    type="radio"
                                                    className="delivery-option-input"
                                                    name={`delivery-option-${cartItem.productId}`}
                                                />
                                                <div>
                                                    <div className="delivery-option-date">
                                                        {dayjs(option.estimatedDeliveryTimeMs).format("dddd, DD MMMM YYYY")}
                                                    </div>
                                                    <div className="delivery-option-price">
                                                        {deliveryPrice}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}