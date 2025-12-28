import dayjs from "dayjs";
import {formatMoney} from "../../utils/money.js";
import {DeliveryOptions} from "./DeliveryOptions.jsx";

export function CartItemDetails({ cart, deliveryOptions }){
    return(
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
                            alt={cartItem.product.name}
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

                        <DeliveryOptions deliveryOptions={deliveryOptions} cartItem={cartItem}/>
                    </div>
                </div>
            )
        })
    )
}