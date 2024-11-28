function cargarResumenCompra() {
    const resumenCompraContainer = document.querySelector(".resumen-compra");

    const compraData = localStorage.getItem("compra");
    const compra = JSON.parse(compraData);

    const resumenHTML = `
        <div class="resumen-compra__container">
            <img src="../img/img_normales/${compra.sesionReservada.pelicula.imagenPequeniaUrl}" alt="Imagen de la Sesión" class="resumen-compra__image">
            <div class="resumen-compra__details">
                <h2 class="resumen-compra__details__title">Resumen de la Compra</h2>
                <p class="resumen-compra__details__info"><strong>Asientos:</strong> ${compra.asientosPosiciones.join(", ")}</p>
                <p class="resumen-compra__details__info"><strong>Total de Entradas:</strong> ${compra.numEntradas}</p>
                <p class="resumen-compra__details__price"><strong>Precio Total:</strong> ${compra.precio.toFixed(2)} €</p>
            </div>
        </div>
    `;

    resumenCompraContainer.innerHTML = resumenHTML;
}

function cargarFormularioPago() {
    const mainContainer = document.querySelector("main");

    const formularioHTML = `
        <div class="pago-container">
            <h2 class="pago-container__title">Formulario de Pago</h2>
            <div class="pago-container__content">
                <div class="pago__tarjeta">
                    <h3 class="pago__title">Información de la Tarjeta</h3>
                    <form id="paymentForm">
                        <div class="form-group">
                            <label for="cardNumber">Número de tarjeta</label>
                            <input type="number" id="cardNumber" placeholder="1234 5678 9012 3456">
                        </div>
                        <div class="form-row">
                            <div class="form-column">
                                <label for="expiryDate">Fecha de expiración</label>
                                <input type="text" id="expiryDate" placeholder="MM/AA">
                            </div>
                            <div class="form-column">
                                <label for="cvv">CVV</label>
                                <input type="text" id="cvv" placeholder="123">
                            </div>
                        </div>
                    </form>
                </div>

                <div class="pago__contacto">
                    <h3 class="pago__title">Información de Contacto</h3>
                    <form id="contactForm">
                        <div class="form-group">
                            <label for="name">Nombre</label>
                            <input type="text" id="name" placeholder="Nombre">
                        </div>
                        <div class="form-group">
                            <label for="surname">Apellidos</label>
                            <input type="text" id="surname" placeholder="Apellidos">
                        </div>
                        <div class="form-group">
                            <label for="email">Correo Electrónico</label>
                            <input type="email" id="email" placeholder="correo@ejemplo.com">
                        </div>
                    </form>
                </div>
            </div>
            <div class="pago-container__actions">
                <button type="button" id="submitButton" class="pagar-btn">Realizar Pago</button>
            </div>
        </div>
    `;

    mainContainer.innerHTML += formularioHTML;

    document.getElementById("submitButton").addEventListener("click", realizarPago);
}

function realizarPago() {
    const nombre = document.getElementById("name").value;
    const apellidos = document.getElementById("surname").value;

    const compraData = localStorage.getItem("compra");
    const compra = JSON.parse(compraData);

    const fechaActual = new Date();
    const fechaPago = fechaActual.toISOString(); // Enviar la fecha completa en formato ISO

    const compraPost = {
        usuario: `${nombre} ${apellidos}`,
        asientosPosiciones: compra.asientosPosiciones,
        sala: compra.sesionReservada.sala.id, // Cambiado a solo el ID de la sala
        numEntradas: compra.numEntradas,
        precio: compra.precio,
        fecha: fechaPago
    };

    fetch("https://localhost:7103/Compra", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(compraPost)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en el POST: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            localStorage.setItem("idCompra", data.id);
            window.location.href = "ticket.html";
        })
        .catch(error => {
            alert("Hubo un problema al procesar el pago. Inténtelo nuevamente.");
        });
}

document.addEventListener("DOMContentLoaded", () => {
    cargarResumenCompra();
    cargarFormularioPago();
});
