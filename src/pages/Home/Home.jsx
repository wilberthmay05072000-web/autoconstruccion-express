
import { useEffect, useState } from "react";

import { stores } from "../../data/stores";
import { webSchedule } from "../../data/webSchedule";

import { getScheduleStatus } from "../../data/storeSchedule";

import StoreCard from "../../components/StoreCard/StoreCard";

import "./Home.css";


function Home() {

    const tiendasAuto = stores.filter(
        store => store.location === "auto"
    );

    const tiendasCercaAuto = stores.filter(
        store => store.location === "cerca-auto"
    );

    const tiendasMeche = stores.filter(
        store => store.location === "meche"
    );


    // =========================
    // ESTADO DEL SERVICIO
    // =========================

    const [status, setStatus] = useState(
        () => getScheduleStatus(webSchedule)
    );


    // =========================
    // ACTUALIZAR CADA MINUTO
    // =========================

    useEffect(() => {

        const interval = setInterval(() => {

            setStatus(
                getScheduleStatus(webSchedule)
            );

        }, 60000);


        return () => clearInterval(interval);

    }, []);


    return (

        <main className="home">

            {/* =========================
                HERO
            ========================= */}

            <section className="hero">

                <div className="hero-glow"></div>


                <span className="hero-small">
                    SERVICIO LOCAL
                </span>


                <h1>
                    AUTOCONSTRUCCION
                    <span> EXPRESS</span>
                </h1>


                <p>
                    Compra comida y productos
                    de las tiendas cercanas.
                </p>


                {/* =========================
                    ESTADO DEL SERVICIO
                ========================= */}

                <div
                    className={`web-status ${
                        status.open
                            ? "open"
                            : "closed"
                    }`}
                >

                    <span className="web-status-dot"></span>


                    <strong>
                        {status.open
                            ? "ABIERTA"
                            : "CERRADA"}
                    </strong>


                    <span className="web-status-text">
                        {status.text}
                    </span>

                </div>

            </section>


            {/* =========================
                TIENDAS EN AUTO
            ========================= */}

            <StoreSection
                title="Servicios en Auto"
                stores={tiendasAuto}
            />


            {/* =========================
                TIENDAS CERCA DE AUTO
            ========================= */}

            <StoreSection
                title="Tiendas cerca de Auto u alrededores"
                stores={tiendasCercaAuto}
            />


            {/* =========================
                TIENDAS DE LA MECHE
            ========================= */}

            <StoreSection
                title="Tiendas de La Meche"
                stores={tiendasMeche}
            />

        </main>
    );
}


function StoreSection({ title, stores }) {

    return (

        <section className="store-section">

            <div className="section-title">

                <div className="section-line"></div>

                <h2>
                    {title}
                </h2>

                <div className="section-line"></div>

            </div>


            <div className="stores-grid">

                {stores.map(store => (

                    <StoreCard
                        key={store.id}
                        store={store}
                    />

                ))}

            </div>

        </section>
    );
}


export default Home;
