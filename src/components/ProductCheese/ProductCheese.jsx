import { useState } from "react";
import { useCart } from "../../context/CartContext";
import "./ProductCheese.css";

function ProductCheese({ product, store }) {

    const [selectedOption, setSelectedOption] = useState("con");
    const [quantity, setQuantity] = useState(1);
    const [comment, setComment] = useState("");
    const [added, setAdded] = useState(false);

    const { addToCart } = useCart();

    const price = product.cheese[selectedOption];

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
                type: "cheese",
                name: selectedOption === "con"
                    ? "Con queso"
                    : "Sin queso",
                price,
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

            {/* OPCIÓN DE QUESO */}

            <div className="option-title">
                Queso
            </div>

            <div className="size-options">

                <button
                    className={
                        selectedOption === "con"
                            ? "size-option selected"
                            : "size-option"
                    }
                    onClick={() => setSelectedOption("con")}
                >
                    <span>
                        Con queso
                    </span>

                    <strong>
                        ${product.cheese.con}
                    </strong>
                </button>


                <button
                    className={
                        selectedOption === "sin"
                            ? "size-option selected"
                            : "size-option"
                    }
                    onClick={() => setSelectedOption("sin")}
                >
                    <span>
                        Sin queso
                    </span>

                    <strong>
                        ${product.cheese.sin}
                    </strong>
                </button>

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
                    ${price * quantity}
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

export default ProductCheese;