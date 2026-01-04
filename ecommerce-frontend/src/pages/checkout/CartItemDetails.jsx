import dayjs from "dayjs";
import {formatMoney} from "../../utils/money.js";
import {DeliveryOptions} from "./DeliveryOptions.jsx";
import axios from "axios";
import {useState} from "react";

export function CartItemDetails({cart, deliveryOptions, loadCart}) {
    const [editQty, setEditQty] = useState(false);
    const [qty, setQty] = useState(0);
    return (cart.map((cartItem) => {
            let selectedDeliveryOption = deliveryOptions.find((option) => option.id === cartItem.deliveryOptionId);
            const deleteCartItem = async () => {
                await axios.delete(`/api/cart-items/${cartItem.productId}`);
                await loadCart();
            }
            const updateItem = async () => {
                await axios.put(`/api/cart-items/${cartItem.productId}`, {
                    quantity: qty,
                });
                await loadCart();
            }
            return (
                <div className="cart-item-container" key={cartItem.productId}>
                    <div className="delivery-date">
                        Delivery
                        date: {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format("dddd, DD MMMM YYYY")}
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
                                                      Quantity:

                                                        {
                                                            editQty ?
                                                                <>
                                                                    <input
                                                                        type="text"
                                                                        placeholder={cartItem.quantity}
                                                                        style={{width: "50px"}}
                                                                        className="quantity-editor"
                                                                        onChange={(event) => setQty(Number(event.target.value))}
                                                                    />
                                                                    <span
                                                                        className="update-quantity-link link-primary"
                                                                        onClick={async () => {
                                                                            await updateItem();
                                                                            setEditQty(!editQty);
                                                                        }}
                                                                    >
                                                                        Save
                                                                    </span>
                                                                    <span
                                                                        className="update-quantity-link link-primary"
                                                                        onClick={() => {
                                                                            setQty(0);
                                                                            setEditQty(!editQty);
                                                                        }}
                                                                    >
                                                                        Cancel
                                                                    </span>
                                                                </>
                                                                :
                                                                <span
                                                                    className="quantity-label">{cartItem.quantity}
                                                                </span>
                                                        }

                                                    </span>
                                <br/>
                                <button
                                    type="button"
                                    className="update-quantity-link link-primary button-link"
                                    onClick={async () => {
                                        setEditQty(!editQty);
                                    }}
                                    disabled={editQty}
                                >
                                  Update
                                </button>
                                <span
                                    className="delete-quantity-link link-primary"
                                    onClick={deleteCartItem}
                                >
                                  Delete
                                </span>
                            </div>
                        </div>

                        <DeliveryOptions deliveryOptions={deliveryOptions} cartItem={cartItem} loadCart={loadCart}/>
                    </div>
                </div>)
        }))
}
