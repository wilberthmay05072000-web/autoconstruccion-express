
import { useNavigate } from "react-router-dom";
import { getScheduleStatus } from "../../data/storeSchedule";

import "./StoreCard.css";


function StoreCard({ store }) {

    const navigate = useNavigate();


    // =========================
    // ESTADO DE LA TIENDA
    // =========================

    const status = getScheduleStatus(
        store.schedule
    );


    return (

        <article
            className="store-card"
            onClick={() =>
                navigate(`/tienda/${store.id}`)
            }
        >


            {/* =========================
                IMAGEN
            ========================= */}

            <div className="store-image-container">

                <img
                    src={store.image}
                    alt={store.name}
                    className="store-image"
                />


                {/* ESTADO */}

                <div
                    className={`store-status ${
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

            </div>


            {/* =========================
                INFORMACIÓN
            ========================= */}

            <div className="store-info">

                <h3>
                    {store.name}
                </h3>


                <p>
                    {store.description}
                </p>


                <span className="store-hours">

                    {status.text}

                </span>

            </div>

        </article>

    );
}


export default StoreCard;
