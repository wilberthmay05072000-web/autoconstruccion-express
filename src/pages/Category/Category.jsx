import { useParams, useNavigate } from "react-router-dom";

import { stores } from "../../data/stores";
import { categories } from "../../data/categories";
import { products } from "../../data/products";

import ProductCard from "../../components/ProductCard/ProductCard";

import "./Category.css";


function Category() {

    const {
        storeId,
        categoryId
    } = useParams();

    const navigate = useNavigate();


    // =========================
    // BUSCAR TIENDA
    // =========================

    const store = stores.find(
        store => store.id === storeId
    );


    // =========================
    // BUSCAR CATEGORÍA
    // =========================

    const category = categories.find(
        category =>
            category.id === categoryId &&
            category.storeId === storeId
    );


    // =========================
    // VALIDACIÓN
    // =========================

    if (!store || !category) {

        return (
            <main className="category-not-found">

                <h1>
                    Categoría no encontrada
                </h1>

                <button
                    onClick={() =>
                        navigate("/")
                    }
                >
                    Volver al inicio
                </button>

            </main>
        );
    }


    // =========================
    // PRODUCTOS DE LA CATEGORÍA
    // =========================

    const categoryProducts =
        products.filter(
            product =>
                product.storeId === storeId &&
                product.categoryId === categoryId
        );


    return (

        <main className="category-page">


            {/* =========================
                VOLVER
            ========================= */}

            <button
                className="category-back"
                onClick={() =>
                    navigate(
                        `/tienda/${storeId}`
                    )
                }
            >
                ← {store.name}
            </button>


            {/* =========================
                ENCABEZADO
            ========================= */}

            <header className="category-header">

                <span className="category-label">
                    {store.name}
                </span>

                <h1>
                    {category.name}
                </h1>

                <p>
                    {category.description}
                </p>

                <span className="product-count">
                    {categoryProducts.length} productos
                </span>

            </header>


            {/* =========================
                PRODUCTOS
            ========================= */}

            <section className="products-section">

                {categoryProducts.length > 0 ? (

                    <div className="products-grid">

                        {categoryProducts.map(
                            product => (

                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    storeId={storeId}
                                    categoryId={categoryId}
                                />

                            )
                        )}

                    </div>

                ) : (

                    <div className="empty-category">

                        <div>
                            📦
                        </div>

                        <h2>
                            No hay productos todavía
                        </h2>

                        <p>
                            Estamos preparando esta categoría.
                        </p>

                    </div>

                )}

            </section>

        </main>

    );
}

export default Category;