document.addEventListener("DOMContentLoaded", function () {
    const tablaAsientos = document.querySelector(".seating-chart");
    const botonComprar = document.getElementById("comprarBtn");
    const listaResumen = document.getElementById("summary-list");
    const idSesion = localStorage.getItem('idSesion');
    let asientosSeleccionados = [];
    let precioEntrada = 0;

    const urlApi = `https://localhost:7103/Sesion/${idSesion}`;
    function cargarAsientos() {
        fetch(urlApi)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al obtener los datos de la API');
                }
                return response.json();
            })
            .then(sesion => {
                //almacena la constante de la sala los asientos y el precio de la entrada 
                const sala = sesion.sala;
                const asientos = sesion.listaAsientos;
                precioEntrada = sesion.precio;
                //llamada a la funcion
                generarAsientos(asientos, sala.Capacidad);
            })
            .catch(error => console.error("Error al cargar los asientos:", error));
    }
    //carga los asientos
    function generarAsientos(asientos, capacidad) {
        //siempre sera la misma cantidad de columans 
        const columnas = 5;
        //operacion para calcular el tamaño de la sala
        const filas = Math.ceil(capacidad / columnas);

        while (tablaAsientos.firstChild) {
            tablaAsientos.removeChild(tablaAsientos.firstChild);
        }

        asientos.forEach((asiento, indice) => {

            const elementoAsiento = document.createElement("div");
            elementoAsiento.classList.add("seat");
            //en caso de estar libre green 
            if (!asiento.ocupado) {
                elementoAsiento.style.backgroundColor = "green";
            } else {
                //en caso de ya estar selecionado no nos dejara selecionarlo y estara rojo
                elementoAsiento.classList.add("ocupado");
                elementoAsiento.style.backgroundColor = "red";
                elementoAsiento.style.cursor = "not-allowed";
            }
            //imprimir por pantalla el asiento
            const fila = Math.floor(indice / columnas) + 1;
            const columna = (indice % columnas) + 1;
            //si el  NO esta ocupado nos los desleccionara al hacer click
            if (!asiento.ocupado) {
                elementoAsiento.addEventListener("click", function () {
                    alternarSeleccionAsiento(elementoAsiento, asiento.id, fila, columna);
                });
            }
            
            elementoAsiento.dataset.index = indice;
            elementoAsiento.dataset.selected = false;

            tablaAsientos.appendChild(elementoAsiento);
        });

        tablaAsientos.style.gridTemplateColumns = `repeat(${columnas}, 50px)`;
    }

    function alternarSeleccionAsiento(elementoAsiento, idAsiento, fila, columna) {
        //en caso de ser verde lo volveremos azul y nos cambiara el valor del asiento 
        if (elementoAsiento.style.backgroundColor === "green") {
            elementoAsiento.style.backgroundColor = "blue";
            elementoAsiento.dataset.selected = true;
            //subimos los datos sobre el asiento
            asientosSeleccionados.push({ id: idAsiento, fila, columna, precio: precioEntrada });
        } else if (
            //en caso de estar selecionado y volver a ser pulsado volvera al estado original
            elementoAsiento.style.backgroundColor === "blue") {
            elementoAsiento.style.backgroundColor = "green";
            elementoAsiento.dataset.selected = false;
            //lo quitamos del arry ya que ha sido deselaccionado
            asientosSeleccionados = asientosSeleccionados.filter(asiento => asiento.id !== idAsiento);
        }
        //actualizamos los datos 
        actualizarResumen();
        actualizarBotonCompra();
    }

    function actualizarResumen() {
        listaResumen.innerHTML = "";

        let totalEntradas = 0;
        let totalPrecio = 0;
        // por cada asiento selecionado se le actualiza el resumen  
        asientosSeleccionados.forEach(asiento => {
            totalEntradas++;
            totalPrecio += asiento.precio;
            //CREACION de los asientos!!!
            const listItem = document.createElement("li");
            //to fixed sirve para redodndear a los decimales
            listItem.textContent = `Entrada F${asiento.fila} A${asiento.columna}  ${asiento.precio.toFixed(2)} €`;
            listaResumen.appendChild(listItem);
        });
        //imprimimos por pantalla la cantidad de tickets comprados y su precio total €
        const totalItem = document.createElement("li");
        totalItem.textContent = `Total (${totalEntradas} Entradas)  ${totalPrecio.toFixed(2)} €`;
        totalItem.style.borderTop = "1px solid #000";
        totalItem.style.marginTop = "10px";
        //atualizamos el boton de la compra!
        listaResumen.appendChild(totalItem);
    }
    //actualia el boton de compra (aparece el valor y cantidad de tickets compraos)
    function actualizarBotonCompra() {
        botonComprar.disabled = asientosSeleccionados.length === 0;
    
    }


    function comprarAsientos() {
        if (asientosSeleccionados.length > 0) {
            const idsAsientos = asientosSeleccionados.map(asiento => asiento.id);
            fetch(`https://localhost:7103/Sesion/actualizarAsientos/${idSesion}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(idsAsientos)
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error al actualizar los asientos en la API');
                    }
    
                    //return response.json(); // Si esperas una respuesta en JSON
                })
                .then(data => {
                    window.location.href = 'pasarelapago.html';
                })
                .catch(error => console.error("Error al realizar la compra:", error));
        } else {
            console.warn("No hay asientos seleccionados para comprar.");
        }
    }    

    botonComprar.addEventListener("click", comprarAsientos);

    cargarAsientos();
});