import {
    useParams,
    useNavigate
} from "react-router-dom";

import { products } from "../../data/products";
import { categories } from "../../data/categories";
import { stores } from "../../data/stores";

import ProductSize
    from "../../components/ProductSize/ProductSize";

import ProductCheese
    from "../../components/ProductCheese/ProductCheese";

import ProductSimple
    from "../../components/ProductSimple/ProductSimple";

import "./Product.css";


function Product() {

    const {
        storeId,
        categoryId,
        productId
    } = useParams();

    const navigate = useNavigate();


    const store = stores.find(
        store => store.id === storeId
    );


    const category = categories.find(
        category =>
            category.id === categoryId &&
            category.storeId === storeId
    );


    const product = products.find(
        product =>
            product.id === productId &&
            product.storeId === storeId &&
            product.categoryId === categoryId
    );


    if (!store || !category || !product) {

        return (
            <main className="product-not-found">

                <h1>
                    Producto no encontrado
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


    return (

        <main className="product-page">

            <button
                className="product-back"
                onClick={() =>
                    navigate(
                        `/tienda/${storeId}/categoria/${categoryId}`
                    )
                }
            >
                ← {category.name}
            </button>


            <section
                className={
                    product.image
                        ? "product-detail"
                        : "product-detail product-detail-no-image"
                }
            >

                {/* IMAGEN DEL PRODUCTO */}

                {product.image && (
                    <div className="product-detail-image">

                        <img
                            src={product.image}
                            alt={product.name}
                        />

                    </div>
                )}


                {/* INFORMACIÓN Y OPCIONES */}

                <div className="product-detail-info">

                    <span className="product-store-name">
                        {store.name}
                    </span>

                    <h1>
                        {product.name}
                    </h1>

                    <p className="product-description">
                        {product.description}
                    </p>


                    {product.type === "size" && (
                        <ProductSize
                            product={product}
                            store={store}
                        />
                    )}


                    {product.type === "cheese" && (
                        <ProductCheese
                            product={product}
                            store={store}
                        />
                    )}


                    {product.type === "simple" && (
                        <ProductSimple
                            product={product}
                            store={store}
                        />
                    )}

                </div>

            </section>

        </main>

    );

}

export default Product;