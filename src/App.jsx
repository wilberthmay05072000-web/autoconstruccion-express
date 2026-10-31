import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";

import Home from "./pages/Home/Home";
import Store from "./pages/Store/Store";
import Category from "./pages/Category/Category";
import Product from "./pages/Product/Product";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";


function Placeholder({ title }) {

    return (
        <main
            style={{
                minHeight: "80vh",
                display: "grid",
                placeItems: "center",
                color: "#00d9ff",
                padding: "30px",
                textAlign: "center"
            }}
        >
            <h1>{title}</h1>
        </main>
    );
}


function App() {

    return (

        <BrowserRouter>

            <Navbar />

            <Routes>

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/tienda/:storeId"
                    element={<Store />}
                />

                <Route
                    path="/tienda/:storeId/categoria/:categoryId"
                    element={<Category />}
                />

                <Route
                    path="/tienda/:storeId/categoria/:categoryId/producto/:productId"
                    element={<Product />}
                />

                <Route
                    path="/carrito"
                    element={<Cart />}
                />

                <Route
                    path="/checkout"
                    element={<Checkout />}
                />

            </Routes>

        </BrowserRouter>

    );
}


export default App;