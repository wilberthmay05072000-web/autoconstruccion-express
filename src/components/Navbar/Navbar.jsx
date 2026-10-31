import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./Navbar.css";

function Navbar() {

    const { totalItems } = useCart();

    return (
        <header className="navbar">

            <Link to="/" className="navbar-logo">
                AUTOCONSTRUCCION
                <span> EXPRESS</span>
            </Link>

            <Link to="/carrito" className="cart-button">

                <span className="cart-icon">
                    🛒
                </span>

                <span>
                    Carrito
                </span>

                {totalItems > 0 && (
                    <span className="cart-count">
                        {totalItems}
                    </span>
                )}

            </Link>

        </header>
    );
}

export default Navbar;