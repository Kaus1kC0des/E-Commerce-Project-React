import {formatMoney} from "../../utils/money.js";
import dayjs from "dayjs";
import {useState} from "react";

export function DeliveryOptions({deliveryOptions, cartItem}){
    const [checked, setChecked] = useState(null);
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
                return(
                    <div className="delivery-option" key={option.id}>
                        <input
                            checked={cartItem.deliveryOptionId === option.id || cartItem.deliveryOptionId === checked}
                            onChange={(e) => {
                                setChecked(cartItem.deliveryOptionId);
                            }}
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