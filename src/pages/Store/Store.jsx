import { useParams, useNavigate } from "react-router-dom";

import { stores } from "../../data/stores";
import { categories } from "../../data/categories";

import "./Store.css";


function getDayName() {
    const days = [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday"
    ];

    return days[new Date().getDay()];
}


function getStoreStatus(schedule) {

    const today = getDayName();

    const hours = schedule[today];

    if (!hours) {
        return {
            open: false,
            text: "Cerrada hoy"
        };
    }

    const [openTime, closeTime] = hours;

    const now = new Date();

    const currentMinutes =
        now.getHours() * 60 + now.getMinutes();

    const [openHour, openMinute] =
        openTime.split(":").map(Number);

    const [closeHour, closeMinute] =
        closeTime.split(":").map(Number);

    const openingMinutes =
        openHour * 60 + openMinute;

    const closingMinutes =
        closeHour * 60 + closeMinute;

    const open =
        currentMinutes >= openingMinutes &&
        currentMinutes < closingMinutes;

    if (open) {
        return {
            open: true,
            text: `Abierta · Cierra ${closeTime}`
        };
    }

    if (currentMinutes < openingMinutes) {
        return {
            open: false,
            text: `Abre a las ${openTime}`
        };
    }

    return {
        open: false,
        text: "Cerrada"
    };
}


function Store() {

    const { storeId } = useParams();

    const navigate = useNavigate();


    const store = stores.find(
        store => store.id === storeId
    );


    if (!store) {

        return (
            <main className="store-not-found">

                <h1>Tienda no encontrada</h1>

                <button
                    onClick={() => navigate("/")}
                >
                    Volver al inicio
                </button>

            </main>
        );
    }


    const storeCategories = categories.filter(
        category => category.storeId === store.id
    );


    const status = getStoreStatus(
        store.schedule
    );


    return (

        <main className="store-page">


            {/* BOTÓN VOLVER */}

            <button
                className="back-button"
                onClick={() => navigate("/")}
            >
                ← Volver
            </button>


            {/* INFORMACIÓN DE LA TIENDA */}

            <section className="store-header">


                <div className="store-header-image">

                    <img
                        src={store.image}
                        alt={store.name}
                    />

                </div>


                <div className="store-header-info">

                    <span className="store-label">
                        TIENDA
                    </span>

                    <h1>
                        {store.name}
                    </h1>

                    <p>
                        {store.description}
                    </p>


                    <div
                        className={`store-page-status ${
                            status.open
                                ? "open"
                                : "closed"
                        }`}
                    >

                        <span className="status-dot"></span>

                        {status.open
                            ? "ABIERTA"
                            : "CERRADA"}

                    </div>


                    <span className="store-page-hours">
                        {status.text}
                    </span>

                </div>

            </section>


            {/* CATEGORÍAS */}

            <section className="categories-section">

                <div className="categories-title">

                    <span></span>

                    <h2>
                        ¿Qué quieres pedir?
                    </h2>

                    <span></span>

                </div>


                <div className="categories-grid">

                    {storeCategories.map(
                        category => (

                            <article
                                key={category.id}
                                className="category-card"
                                onClick={() =>
                                    navigate(
                                        `/tienda/${store.id}/categoria/${category.id}`
                                    )
                                }
                            >



                                <div className="category-info">

                                    <h3>
                                        {category.name}
                                    </h3>

                                    <p>
                                        {category.description}
                                    </p>

                                </div>


                                <div className="category-arrow">
                                    →
                                </div>

                            </article>

                        )
                    )}

                </div>

            </section>

        </main>

    );
}

export default Store;