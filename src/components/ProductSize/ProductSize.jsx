import { useState } from "react";
import { useCart } from "../../context/CartContext";
import "./ProductSize.css";

function ProductSize({ product, store }) {

    const [selectedSize, setSelectedSize] = useState("mediana");
    const [quantity, setQuantity] = useState(1);
    const [comment, setComment] = useState("");
    const [added, setAdded] = useState(false);

    const { addToCart } = useCart();

    const price = product.sizes[selectedSize];

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
                type: "size",
                name: selectedSize === "mediana"
                    ? "Mediana"
                    : "Grande",
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

            <div className="option-title">
                Tamaño
            </div>

            <div className="size-options">

                <button
                    className={
                        selectedSize === "mediana"
                            ? "size-option selected"
                            : "size-option"
                    }
                    onClick={() => setSelectedSize("mediana")}
                >
                    <span>Mediana</span>
                    <strong>${product.sizes.mediana}</strong>
                </button>

                <button
                    className={
                        selectedSize === "grande"
                            ? "size-option selected"
                            : "size-option"
                    }
                    onClick={() => setSelectedSize("grande")}
                >
                    <span>Grande</span>
                    <strong>${product.sizes.grande}</strong>
                </button>

            </div>


            <div className="quantity-section">

                <span>Cantidad</span>

                <div className="quantity-control">

                    <button onClick={decreaseQuantity}>
                        −
                    </button>

                    <strong>{quantity}</strong>

                    <button onClick={increaseQuantity}>
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

                <span>TOTAL</span>

                <strong>
                    ${price * quantity}
                </strong>

            </div>


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

export default ProductSize;