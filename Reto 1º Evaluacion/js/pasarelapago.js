const datosResumen =  localStorage.getItem('datosResumen');

function resumenCompraCompra() {
    // Recuperar los asientos seleccionados desde localStorage
    const resumenCompra = document.getElementsByClassName('resumen-compra')
    const asientosSeleccionados = JSON.parse(localStorage.getItem('selectedSeats')) || [];
    const asientos = asientosSeleccionados.map(id => `Asiento ${id}`).join(', ') || 'No hay asientos seleccionados';
    const totalPagar = asientosSeleccionados.length * sesion.precio;

    if (!resumenCompra) {
        console.error("Elemento .resumen-compra no encontrado");
        return;
    }

    // Renderizar la información en el resumen de compra
    resumenCompra.innerHTML = `
        <img src="../src/img/${sesion.pelicula.imagen}" class="poster" alt="Póster de ${sesion.pelicula.nombre}">
        <div class="detalle-compra">
            <h2>RESUMEN DE LA COMPRA</h2>
            <p><strong>Pelicula:</strong> ${sesion.pelicula.nombre}</p>
            <p><strong>Sala:</strong> ${sesion.sala.numero}</p>
            <p><strong>Asientos:</strong> ${asientos}</p> <!-- Aquí se muestran los asientos seleccionados -->
            <p><strong>TOTAL A PAGAR:</strong> ${totalPagar.toFixed(2)} $</p>
            <p>
                Usaremos tu correo electrónico en acuerdo con las políticas de
                privacidad, te invitamos a leerlas.
            </p>
        </div>
    `;
}
