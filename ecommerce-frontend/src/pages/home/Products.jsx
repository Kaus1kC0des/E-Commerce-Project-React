import {formatMoney} from "../../utils/money.js";
import axios from "axios";
import {useState, useEffect, useRef} from "react";

export default function Products({product, loadCart}) {
    const [quantity, setQuantity] = useState(1);
    const [addedToCart, setAddedToCart] = useState(false);
    const addedTimerRef = useRef(null);

    useEffect(() => {
        return () => {
            if (addedTimerRef.current) {
                clearTimeout(addedTimerRef.current);
            }
        };
    }, []);

    const addToCart = async () => {
        await axios.post("/api/cart-items", {
            productId: product.id,
            quantity: quantity,
        });
        await loadCart();

        if (addedTimerRef.current) {
            clearTimeout(addedTimerRef.current);
        }

        setAddedToCart(true);
        addedTimerRef.current = setTimeout(() => setAddedToCart(false), 2000);
    }
    const selectQuantity = (event) => {
        const quantitySelected = Number(event.target.value);
        setQuantity(quantitySelected);
    }
    return (
        <div className="product-container" key={product.id} id={product.id}>
            <div className="product-image-container">
                <img
                    className="product-image"
                    src={product.image}
                    alt={product.name}
                />
            </div>

            <div className="product-name limit-text-to-2-lines">
                {product.name}
            </div>

            <div className="product-rating-container">
                <img
                    className="product-rating-stars"
                    src={`images/ratings/rating-${product.rating.stars * 10}.png`}
                    alt={`Rating ${product.rating.stars}`}
                />
                <div className="product-rating-count link-primary">{product.rating.count}</div>
            </div>

            <div className="product-price">{formatMoney(product.priceCents)}</div>

            <div className="product-quantity-container">
                <select
                    value={quantity}
                    onChange={selectQuantity}
                >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
            </div>

            <div className="product-spacer"></div>

            <div className="product-actions">
                {
                    addedToCart &&
                    <div className="added-to-cart added-to-cart--visible">
                        <img src="images/icons/checkmark.png" alt="Checkmark"/>
                        <p>Added</p>
                    </div>
                }

                <button
                    className="add-to-cart-button button-primary"
                    onClick={addToCart}
                >
                    Add to Cart
                </button>
            </div>
        </div>
    )
}
