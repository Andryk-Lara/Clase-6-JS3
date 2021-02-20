// 118240946
/**
 * Ejercicio #5:
 *
 * Imprimir el precio del Bitcoin en USD$
 *
 * API: https://api.coindesk.com/v1/bpi/currentprice.json
 *
 * ¿Como funciona?:
 *
 * 1. Cuando la pagina cargue debemos agregar el precio del Bitcoin en dolares USD y la fecha de actualización
 * 2. Cuando el usuario haga click en el boton "Recargar", debemos actualizar el precio del Bitcoin y la fecha de actualización
 *
 *
 * ¿Que voy a evaluar?
 * 1. Que se imprima el precio del Bitcoin y la fecha de actualización correctamente
 * 2. Que se actualice el precio y la fecha al hacer click en recargar
 * 3. Buenas practicas (incluyendo buenas practicas pasadas)
 *
 *
 * TASKS:
 * 1. Tenemos para obtener del Bitcoin
 * 2. fetch al url https://api.coindesk.com/v1/bpi/currentprice.json
 * 3. Imprimir el precio en el DOM
 * 4. Imprimir la fecha de actualizacion
 * 5. Escuchar el evento del click en el boton "Recargar"
 *    5.1. agarrar el boton
 *    5.2. agregar el evento
 * 6. Jalar la informacion nuevamente con un fetch
 * 7. Imprimir el precio en el DOM
 * 8. Imprimir la fecha de actualizacion
 */

/**
 * PARA LA CASA
 * Agregar la funcionalidad de mostrar el precio en GBP y EUR.
 *
 * Usando el <select> cuando el usuario seleccione otra moneda, actualizar el precio
 * en la moneda seleccionada.
 *
 * El value del select se saca del "elemento.value"
 *
 * ¿Que voy a evaluar?
 * 1. Que se imprima el precio del Bitcoin y la fecha de actualización correctamente
 * en la modena seleccionada por el usuario
 * 2. Buenas practicas (incluyendo buenas practicas pasadas)
 */

const bitcoinPriceUrl = "https://api.coindesk.com/v1/bpi/currentprice.json";
const priceElement = document.querySelector("h2");
const timeElement = document.querySelector("p");
const button = document.querySelector("button");
const coinType = document.querySelector('select');

function cambiarMoneda(data){
    const USD_INFO = data.bpi.USD;
    priceElement.innerHTML = `${USD_INFO.code}${USD_INFO.symbol} ${USD_INFO.rate}`;
    // Utilizo un evento change para saber si cambia el select
    coinType.addEventListener("change", (event) =>{
        event.preventDefault();
        const optionSelected = event.target.value;
        // Iteramos para ver el valor que se selecciono y así enviar la información necesaria
        if(optionSelected == 'EUR'){
            const EUR_INFO = data.bpi.EUR;
            priceElement.innerHTML = `${EUR_INFO.code}${EUR_INFO.symbol} ${EUR_INFO.rate}`;
        }else if (optionSelected == 'GBP'){
            const GBP_INFO = data.bpi.GBP;
            priceElement.innerHTML = `${GBP_INFO.code}${GBP_INFO.symbol} ${GBP_INFO.rate}`;
        }else{
            const USD_INFO = data.bpi.USD;
            priceElement.innerHTML = `${USD_INFO.code}${USD_INFO.symbol} ${USD_INFO.rate}`;
        }
    });  
}


const actualizarDatos = () => {
    fetch(bitcoinPriceUrl, {
        method: "GET"
    })
    .then((response) => {
        // La propiedad que nos dice si hubo un error en el request es "ok"
        // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#checking_that_the_fetch_was_successful
        if (!response.ok) {
            throw new Error("Network response was not ok " + response.status);
        }
        return response.json();
    })
    .then((data) => {
        cambiarMoneda(data);
      // AQUI TENEMOS LA FECHA DENTRO DE data.time.updated
        const time_info = data.time.updated;
        timeElement.innerHTML = `Actualizado en: ${time_info}`;
    })
    .catch((error) => {
        onsole.log("error", error);
    });
};

actualizarDatos();

button.addEventListener("click", actualizarDatos);
// 118240946