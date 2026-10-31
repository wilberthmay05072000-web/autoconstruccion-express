export function getDayName() {

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


export function getScheduleStatus(schedule) {

    const today = getDayName();

    const hours = schedule[today];


    // =========================
    // DÍA CERRADO
    // =========================

    if (!hours) {

        return {
            open: false,
            text: "No abrimos hoy"
        };

    }


    const [openTime, closeTime] = hours;


    const now = new Date();

    const currentMinutes =
        now.getHours() * 60 +
        now.getMinutes();


    const [openHour, openMinute] =
        openTime
            .split(":")
            .map(Number);


    const [closeHour, closeMinute] =
        closeTime
            .split(":")
            .map(Number);


    const openingMinutes =
        openHour * 60 +
        openMinute;


    const closingMinutes =
        closeHour * 60 +
        closeMinute;


    // =========================
    // TIENDA ABIERTA
    // =========================

    if (
        currentMinutes >= openingMinutes &&
        currentMinutes <= closingMinutes
    ) {

        return {
            open: true,
            text: `Cerramos a las ${closeTime}`,
            openTime,
            closeTime
        };

    }


    // =========================
    // TODAVÍA NO ABRE
    // =========================

    if (
        currentMinutes < openingMinutes
    ) {

        return {
            open: false,
            text: `Abrimos a las ${openTime}`,
            openTime,
            closeTime
        };

    }


    // =========================
    // YA CERRÓ
    // =========================

    return {
        open: false,
        text: "Servicio cerrado por hoy",
        openTime,
        closeTime
    };

}