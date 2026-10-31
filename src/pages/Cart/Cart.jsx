import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./Cart.css";

function Cart() {

    const {
        cartItems,
        updateQuantity,
        removeFromCart,
        clearCart,
        total
    } = useCart();


    if (cartItems.length === 0) {

        return (
            <main className="cart-page">

                <div className="cart-empty">

                    <div className="cart-empty-icon">
                        🛒
                    </div>

                    <h1>
                        Tu carrito está vacío
                    </h1>

                    <p>
                        Agrega productos de alguna de nuestras tiendas.
                    </p>

                    <Link
                        to="/"
                        className="cart-back-button"
                    >
                        Explorar tiendas
                    </Link>

                </div>

            </main>
        );
    }


    return (

        <main className="cart-page">

            <div className="cart-header">

                <div>

                    <span className="cart-small-title">
                        TU PEDIDO
                    </span>

                    <h1>
                        Carrito
                    </h1>

                </div>


                <button
                    className="clear-cart-button"
                    onClick={clearCart}
                >
                    Vaciar carrito
                </button>

            </div>


            <div className="cart-content">


                {/* =========================
                    PRODUCTOS
                ========================= */}

                <section className="cart-items">

                    {cartItems.map(item => {

                        const subtotal =
                            item.option.price * item.quantity;

                        const hasImage =
                            Boolean(item.product.image);


                        return (

                            <article
                                className={
                                    hasImage
                                        ? "cart-item"
                                        : "cart-item cart-item-no-image"
                                }
                                key={item.id}
                            >


                                {/* IMAGEN SOLO SI EXISTE */}

                                {hasImage && (

                                    <div className="cart-item-image">

                                        <img
                                            src={item.product.image}
                                            alt={item.product.name}
                                        />

                                    </div>

                                )}


                                {/* INFORMACIÓN */}

                                <div className="cart-item-info">

                                    <span className="cart-store">
                                        {item.store.name}
                                    </span>


                                    <h2>
                                        {item.product.name}
                                    </h2>


                                    <p className="cart-option">
                                        {item.option.name}
                                    </p>


                                    {item.option.comment && (

                                        <p className="cart-comment">
                                            "{item.option.comment}"
                                        </p>

                                    )}


                                    <div className="cart-item-bottom">


                                        {/* CANTIDAD */}

                                        <div className="cart-quantity">

                                            <button
                                                onClick={() =>
                                                    updateQuantity(
                                                        item.id,
                                                        item.quantity - 1
                                                    )
                                                }
                                            >
                                                −
                                            </button>


                                            <strong>
                                                {item.quantity}
                                            </strong>


                                            <button
                                                onClick={() =>
                                                    updateQuantity(
                                                        item.id,
                                                        item.quantity + 1
                                                    )
                                                }
                                            >
                                                +
                                            </button>

                                        </div>


                                        {/* SUBTOTAL */}

                                        <strong className="cart-subtotal">
                                            ${subtotal}
                                        </strong>

                                    </div>


                                    <button
                                        className="remove-item"
                                        onClick={() =>
                                            removeFromCart(item.id)
                                        }
                                    >
                                        Eliminar
                                    </button>

                                </div>

                            </article>

                        );

                    })}

                </section>


                {/* =========================
                    RESUMEN
                ========================= */}

                <aside className="cart-summary">

                    <div className="summary-title">
                        RESUMEN DEL PEDIDO
                    </div>


                    <div className="summary-row">

                        <span>
                            Productos
                        </span>

                        <span>
                            {cartItems.reduce(
                                (sum, item) =>
                                    sum + item.quantity,
                                0
                            )}
                        </span>

                    </div>


                    <div className="summary-row total-row">

                        <span>
                            TOTAL
                        </span>

                        <strong>
                            ${total}
                        </strong>

                    </div>


                    <Link
                        to="/checkout"
                        className="checkout-button"
                    >
                        Continuar con el pedido
                    </Link>


                    <Link
                        to="/"
                        className="continue-shopping"
                    >
                        Seguir comprando
                    </Link>

                </aside>

            </div>

        </main>
    );
}

export default Cart;