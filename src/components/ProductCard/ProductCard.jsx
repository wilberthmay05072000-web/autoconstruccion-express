import { useNavigate } from "react-router-dom";
import "./ProductCard.css";

function ProductCard({ product, storeId, categoryId }) {

    const navigate = useNavigate();

    let priceText;

    if (product.type === "size") {

        priceText = `Desde $${product.sizes.mediana}`;

    } else if (product.type === "cheese") {

        priceText = `Desde $${Math.min(
            product.cheese.con,
            product.cheese.sin
        )}`;

    } else {

        priceText = `$${product.price}`;

    }

    return (
        <article
            className={
                product.image
                    ? "product-card"
                    : "product-card product-card-no-image"
            }
            onClick={() =>
                navigate(
                    `/tienda/${storeId}/categoria/${categoryId}/producto/${product.id}`
                )
            }
        >

            {/* IMAGEN DEL PRODUCTO */}

            {product.image && (
                <div className="product-image-container">

                    <img
                        src={product.image}
                        alt={product.name}
                        className="product-image"
                    />

                </div>
            )}


            {/* INFORMACIÓN DEL PRODUCTO */}

            <div className="product-card-info">

                <h3>
                    {product.name}
                </h3>

                <p>
                    {product.description}
                </p>

                <div className="product-card-bottom">

                    <span className="product-price">
                        {priceText}
                    </span>

                    <span className="product-arrow">
                        →
                    </span>

                </div>

            </div>

        </article>
    );
}

export default ProductCard;