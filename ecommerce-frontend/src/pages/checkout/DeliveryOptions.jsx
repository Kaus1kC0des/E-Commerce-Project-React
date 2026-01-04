import {formatMoney} from "../../utils/money.js";
import dayjs from "dayjs";
import {useState} from "react";
import axios from "axios";

export function DeliveryOptions({deliveryOptions, cartItem, loadCart}){
    return (
        <div className="delivery-options">
            <div className="delivery-options-title">
                Choose a delivery option:
            </div>
            {deliveryOptions.map((option) => {
                let deliveryPrice = "FREE Shipping";
                if(option.priceCents > 0){
                    deliveryPrice = `${formatMoney(option.priceCents)} - Shipping`;
                }
                const updateDeliveryOption = async () => {
                    await axios.put(`/api/cart-items/${cartItem.productId}`, {
                        deliveryOptionId: option.id,
                    });
                    await loadCart();
                }
                return(
                    <div
                        className="delivery-option"
                        key={option.id}
                        onClick={updateDeliveryOption}
                    >
                        <input
                            checked={cartItem.deliveryOptionId === option.id}
                            onChange={() => {}}
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
    )
}