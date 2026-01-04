import {DeliveryOptions} from "./DeliveryOptions.jsx";
import {CartItemDetails} from "./CartItemDetails.jsx";

export function OrderSummary({ deliveryOptions, cart, loadCart }){
    return(
        <div className="order-summary">
            {
                deliveryOptions.length > 0 &&
                <CartItemDetails cart={cart} deliveryOptions={deliveryOptions} loadCart={loadCart}/>
            }
        </div>
    )
}