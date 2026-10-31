import { stores } from "../../data/stores";
import { useState } from "react";

import {
    Link,
    useNavigate
} from "react-router-dom";

import { useCart } from "../../context/CartContext";

import "./Checkout.css";


function Checkout() {

    const {
        cartItems,
        total
    } = useCart();

    const navigate = useNavigate();


    const [customerName, setCustomerName] = useState("");
    const [moduleNumber, setModuleNumber] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [orderConfirmed, setOrderConfirmed] = useState(false);
    const [errors, setErrors] = useState({});


    /* =========================
       TOTAL DE PRODUCTOS
    ========================= */

    const totalItems = cartItems.reduce(
        (sum, item) => sum + item.quantity,
        0
    );


    /* =========================
       CALCULAR ENVÍO
    ========================= */

    const getDeliveryCost = (storeId) => {

        const store = stores.find(
            store => store.id === storeId
        );

        if (!store) {
            return 0;
        }

        if (store.location === "meche") {
            return 10;
        }

        if (store.location === "cerca-auto") {
            return 5;
        }

        return 0;
    };


    /* =========================
       ENVÍO DEL PEDIDO
       
       Se revisan todas las tiendas
       y solamente se toma el envío
       más caro.
    ========================= */

    const deliveryCost = cartItems.reduce(
        (highestCost, item) => {

            const currentCost =
                getDeliveryCost(
                    item.store.id
                );

            return Math.max(
                highestCost,
                currentCost
            );

        },
        0
    );


    /* =========================
       TOTAL FINAL
    ========================= */

    const finalTotal =
        total + deliveryCost;


    /* =========================
       WHATSAPP
    ========================= */

    const handleWhatsApp = () => {

        const message = `

NUEVO PEDIDO

AUTOCONSTRUCCION EXPRESS

Cliente: ${customerName}

Modulo: ${moduleNumber}

Metodo de pago: ${paymentMethod}


DETALLE DEL PEDIDO

${cartItems.map(item => `

Tienda: ${item.store.name}

Producto: ${item.product.name}

${item.option.type !== "simple"
        ? `${item.option.type}: ${item.option.name}`
        : ""}

Cantidad: ${item.quantity}

${item.option.comment
        ? `Comentario: ${item.option.comment}`
        : ""}

Subtotal: $${(
            item.option.price *
            item.quantity
        ).toFixed(2)}

`).join("\n")}


RESUMEN DEL PAGO

Productos: $${total.toFixed(2)}

Envío: $${deliveryCost.toFixed(2)}

TOTAL A PAGAR: $${finalTotal.toFixed(2)}


Gracias por tu pedido.

`.trim();


        const phoneNumber =
            "529831562704";


        const whatsappUrl =
            `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;


        window.open(
            whatsappUrl,
            "_blank"
        );
    };


    /* =========================
       CONFIRMAR PEDIDO
    ========================= */

    const handleSubmit = (event) => {
        event.preventDefault();

        const newErrors = {};

        if (!customerName.trim()) {
            newErrors.customerName = "Escribe tu nombre completo.";
        }

        if (!moduleNumber.trim()) {
            newErrors.moduleNumber = "Escribe tu número de módulo.";
        }

        if (!paymentMethod) {
            newErrors.paymentMethod = "Selecciona un método de pago.";
        }

        setErrors(newErrors);

        // Si hay errores, no continuar.
        if (Object.keys(newErrors).length > 0) {
            return;
        }

        setOrderConfirmed(true);
    };


    /* =========================
       CARRITO VACÍO
    ========================= */

    if (cartItems.length === 0) {

        return (

            <main className="checkout-page">

                <div className="checkout-empty">

                    <div className="checkout-empty-icon">
                        🛒
                    </div>


                    <h1>
                        No hay productos
                    </h1>


                    <p>
                        Agrega productos antes de continuar.
                    </p>


                    <Link
                        to="/"
                        className="checkout-back-button"
                    >
                        Explorar tiendas
                    </Link>

                </div>

            </main>
        );
    }


    /* =========================
       CONFIRMACIÓN
    ========================= */

    if (orderConfirmed) {

        return (

            <main className="checkout-page">

                <div className="order-confirmation">


                    <div className="confirmation-icon">
                        ✓
                    </div>


                    <span className="confirmation-small-title">
                        PEDIDO LISTO
                    </span>


                    <h1>
                        Tu pedido está listo para continuar
                    </h1>


                    <p className="confirmation-message">

                        A partir de este momento, el proceso de tu
                        pedido continuará por WhatsApp. Ahí podrás
                        confirmar los detalles y continuar con el
                        proceso de pago.

                    </p>


                    {/* =========================
                        DATOS
                    ========================= */}

                    <div className="confirmation-info">


                        <div className="confirmation-info-row">

                            <span>
                                Cliente
                            </span>

                            <strong>
                                {customerName}
                            </strong>

                        </div>


                        <div className="confirmation-info-row">

                            <span>
                                Módulo
                            </span>

                            <strong>
                                {moduleNumber}
                            </strong>

                        </div>


                        <div className="confirmation-info-row">

                            <span>
                                Método de pago
                            </span>

                            <strong>
                                {paymentMethod}
                            </strong>

                        </div>


                        {/* PRODUCTOS */}

                        <div className="confirmation-info-row">

                            <span>
                                Productos
                            </span>

                            <strong>
                                ${total.toFixed(2)}
                            </strong>

                        </div>


                        {/* ENVÍO */}

                        <div className="confirmation-info-row">

                            <span>
                                Envío
                            </span>

                            <strong>
                                {deliveryCost === 0
                                    ? "Gratis"
                                    : `$${deliveryCost.toFixed(2)}`
                                }
                            </strong>

                        </div>


                        {/* TOTAL */}

                        <div className="confirmation-info-row confirmation-total">

                            <span>
                                TOTAL
                            </span>

                            <strong>
                                ${finalTotal.toFixed(2)}
                            </strong>

                        </div>


                    </div>


                    {/* =========================
                        PRODUCTOS
                    ========================= */}

                    <div className="confirmation-products">


                        <div className="confirmation-products-title">
                            PRODUCTOS
                        </div>


                        {cartItems.map(item => (

                            <div
                                className="confirmation-product"
                                key={item.id}
                            >

                                <div>

                                    <strong>
                                        {item.quantity} × {item.product.name}
                                    </strong>


                                    <span>
                                        {item.option.name}
                                    </span>


                                    {item.option.comment && (

                                        <span>
                                            "{item.option.comment}"
                                        </span>

                                    )}

                                </div>


                                <strong>
                                    ${(
                                        item.option.price *
                                        item.quantity
                                    ).toFixed(2)}
                                </strong>

                            </div>

                        ))}


                    </div>


                    {/* =========================
                        WHATSAPP
                    ========================= */}

                    <button
                        type="button"
                        className="whatsapp-button"
                        onClick={handleWhatsApp}
                    >
                        Continuar por WhatsApp
                    </button>


                    <button
                        className="confirmation-back-button"
                        type="button"
                        onClick={() =>
                            setOrderConfirmed(false)
                        }
                    >
                        ← Regresar
                    </button>


                </div>

            </main>
        );
    }


    /* =========================
       CHECKOUT
    ========================= */

    return (

        <main className="checkout-page">


            {/* HEADER */}

            <div className="checkout-header">

                <span>
                    AUTOCONSTRUCCION EXPRESS
                </span>


                <h1>
                    Finalizar pedido
                </h1>


                <p>
                    Completa tus datos para continuar.
                </p>

            </div>


            <div className="checkout-layout">


                {/* =========================
                    FORMULARIO
                ========================= */}

                <form
                    className="checkout-form"
                    onSubmit={handleSubmit}
                >


                    {/* =========================
                        DATOS DEL CLIENTE
                    ========================= */}

                    <section className="checkout-section">

                        <div className="checkout-section-title">

                            <span>
                                01
                            </span>

                            <h2>
                                Datos del cliente
                            </h2>

                        </div>


                        <div className="form-group">

                            <label>
                                Nombre
                            </label>

                            <input
                                type="text"
                                placeholder="Ej. Juan Pérez"
                                value={customerName}
                                className={errors.customerName ? "input-error" : ""}
                                onChange={(event) => {
                                    setCustomerName(event.target.value);

                                    if (event.target.value.trim()) {
                                        setErrors(prev => ({
                                            ...prev,
                                            customerName: ""
                                        }));
                                    }
                                }}
                            />

                            {errors.customerName && (
                                <p className="field-error">
                                    {errors.customerName}
                                </p>
                            )}

                        </div>


                        <div className="form-group">
                            <label>Número de módulo</label>

                            <input
                                type="text"
                                placeholder="Ej. 24"
                                value={moduleNumber}
                                className={errors.moduleNumber ? "input-error" : ""}
                                onChange={(event) => {
                                    setModuleNumber(event.target.value);

                                    if (event.target.value.trim()) {
                                        setErrors((prev) => ({
                                            ...prev,
                                            moduleNumber: ""
                                        }));
                                    }
                                }}
                            />

                            {errors.moduleNumber && (
                                <p className="field-error">
                                    {errors.moduleNumber}
                                </p>
                            )}
                        </div>

                    </section>


                    {/* =========================
                        MÉTODOS DE PAGO
                    ========================= */}

                    <section className="checkout-section">

                        <div className="checkout-section-title">

                            <span>
                                02
                            </span>

                            <h2>
                                Métodos de pago
                            </h2>

                        </div>


                        <div
                            className={
                                errors.paymentMethod
                                    ? "payment-options payment-options-error"
                                    : "payment-options"
                            }
                        >


                            {/* EFECTIVO */}

                            <button
                                type="button"
                                className={
                                    paymentMethod === "Efectivo"
                                        ? "payment-option selected"
                                        : "payment-option"
                                }
                                onClick={() => {
                                    setPaymentMethod("Efectivo");

                                    setErrors((prev) => ({
                                        ...prev,
                                        paymentMethod: ""
                                    }));
                                }}
                            >

                                <span className="payment-icon">
                                    💵
                                </span>


                                <strong>
                                    Efectivo
                                </strong>


                                <span>
                                    Pago al recibir
                                </span>

                            </button>


                            {/* TRANSFERENCIA */}

                            <button
                                type="button"
                                className={
                                    paymentMethod === "Transferencia"
                                        ? "payment-option selected"
                                        : "payment-option"
                                }
                                onClick={() => {
                                    setPaymentMethod("Transferencia");

                                    setErrors((prev) => ({
                                        ...prev,
                                        paymentMethod: ""
                                    }));
                                }}
                            >

                                <span className="payment-icon">
                                    🏦
                                </span>


                                <strong>
                                    Transferencia
                                </strong>


                                <span>
                                    Pago electrónico
                                </span>

                            </button>


                            {/* TERMINAL */}

                            <button
                                type="button"
                                className={
                                    paymentMethod === "Terminal"
                                        ? "payment-option selected"
                                        : "payment-option"
                                }
                                onClick={() => {
                                    setPaymentMethod("Terminal");

                                    setErrors((prev) => ({
                                        ...prev,
                                        paymentMethod: ""
                                    }));
                                }}
                            >

                                <span className="payment-terminal-image">

                                    <img
                                        src="/images/payment/terminal-mercado-pago.png"
                                        alt="Terminal Mercado Pago"
                                    />

                                </span>


                                <strong>
                                    Terminal Mercado Pago
                                </strong>


                                <span>
                                    Pago con tarjeta
                                </span>

                            </button>
                    

                        </div>
                        {errors.paymentMethod && (
                            <p className="field-error">
                                {errors.paymentMethod}
                            </p>
                        )}

                    </section>


                    {/* =========================
                        CONFIRMAR
                    ========================= */}

                    <button
                        type="submit"
                        className="confirm-order-button"
                    >
                        Confirmar pedido
                    </button>


                </form>


                {/* =========================
                    RESUMEN
                ========================= */}

                <aside className="checkout-summary">


                    <div className="checkout-summary-title">
                        RESUMEN
                    </div>


                    {/* PRODUCTOS */}

                    <div className="checkout-products">

                        {cartItems.map(item => (

                            <div
                                className="checkout-product"
                                key={item.id}
                            >

                                <div>

                                    <strong>
                                        {item.quantity} × {item.product.name}
                                    </strong>


                                    <span>
                                        {item.option.name}
                                    </span>


                                    {item.option.comment && (

                                        <span>
                                            "{item.option.comment}"
                                        </span>

                                    )}

                                </div>


                                <strong>
                                    ${(
                                        item.option.price *
                                        item.quantity
                                    ).toFixed(2)}
                                </strong>

                            </div>

                        ))}

                    </div>


                    {/* TOTAL DE PRODUCTOS */}

                    <div className="checkout-total">

                        <span>
                            {totalItems} productos
                        </span>

                        <strong>
                            ${total.toFixed(2)}
                        </strong>

                    </div>


                    {/* ENVÍO */}

                    <div className="checkout-delivery">

                        <span>
                            Envío
                        </span>

                        <strong>
                            {deliveryCost === 0
                                ? "Gratis"
                                : `$${deliveryCost.toFixed(2)}`
                            }
                        </strong>

                    </div>


                    {/* TOTAL FINAL */}

                    <div className="checkout-final-total">

                        <span>
                            TOTAL A PAGAR
                        </span>

                        <strong>
                            ${finalTotal.toFixed(2)}
                        </strong>

                    </div>


                    <button
                        type="button"
                        className="back-cart-button"
                        onClick={() =>
                            navigate("/carrito")
                        }
                    >
                        ← Volver al carrito
                    </button>


                </aside>

            </div>

        </main>
    );
}


export default Checkout;