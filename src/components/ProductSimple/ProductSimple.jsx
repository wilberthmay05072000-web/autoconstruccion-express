import { useState } from "react";
import { useCart } from "../../context/CartContext";
import "./ProductSimple.css";

function ProductSimple({ product, store }) {

    const [quantity, setQuantity] = useState(1);
    const [comment, setComment] = useState("");
    const [added, setAdded] = useState(false);

    const { addToCart } = useCart();

    const decreaseQuantity = () => {
        setQuantity(current => Math.max(1, current - 1));
    };

    const increaseQuantity = () => {
        setQuantity(current => current + 1);
    };

    const handleAddToCart = () => {

        addToCart({
            product,
            store,
            quantity,
            option: {
                type: "simple",
                name: "Único tamaño",
                price: product.price,
                comment: comment.trim()
            }
        });

        setAdded(true);

        setTimeout(() => {
            setAdded(false);
        }, 2000);
    };

    return (
        <div className="product-option-content">

            {/* TÍTULO */}

            <div className="option-title">
                Cantidad
            </div>


            {/* CANTIDAD */}

            <div className="quantity-section">

                <span>
                    Cantidad
                </span>

                <div className="quantity-control">

                    <button
                        onClick={decreaseQuantity}
                    >
                        −
                    </button>

                    <strong>
                        {quantity}
                    </strong>

                    <button
                        onClick={increaseQuantity}
                    >
                        +
                    </button>

                </div>

            </div>


            {/* COMENTARIOS */}

            <div className="product-comment">

                <label>
                    Comentarios
                </label>

                <textarea
                    value={comment}
                    onChange={(event) =>
                        setComment(event.target.value)
                    }
                    placeholder="Ej. Sin cebolla, sin picante..."
                    maxLength={150}
                />

            </div>


            {/* TOTAL */}

            <div className="product-total">

                <span>
                    TOTAL
                </span>

                <strong>
                    ${product.price * quantity}
                </strong>

            </div>


            {/* AGREGAR */}

            <button
                className={
                    added
                        ? "add-product-button added"
                        : "add-product-button"
                }
                onClick={handleAddToCart}
            >
                {added
                    ? "✓ Producto agregado"
                    : "🛒 Agregar al carrito"
                }
            </button>

        </div>
    );
}

export default ProductSimple;