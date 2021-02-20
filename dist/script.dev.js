"use strict";

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
var bitcoinPriceUrl = "https://api.coindesk.com/v1/bpi/currentprice.json";
var priceElement = document.querySelector("h2");
var timeElement = document.querySelector("p");
var button = document.querySelector("button");
var coinType = document.querySelector('select');

function cambiarMoneda(data) {
  var USD_INFO = data.bpi.USD;
  priceElement.innerHTML = "".concat(USD_INFO.code).concat(USD_INFO.symbol, " ").concat(USD_INFO.rate); // Utilizo un evento change para saber si cambia el select

  coinType.addEventListener("change", function (event) {
    event.preventDefault();
    var optionSelected = event.target.value; // Iteramos para ver el valor que se selecciono y así enviar la información necesaria

    if (optionSelected == 'EUR') {
      var EUR_INFO = data.bpi.EUR;
      priceElement.innerHTML = "".concat(EUR_INFO.code).concat(EUR_INFO.symbol, " ").concat(EUR_INFO.rate);
    } else if (optionSelected == 'GBP') {
      var GBP_INFO = data.bpi.GBP;
      priceElement.innerHTML = "".concat(GBP_INFO.code).concat(GBP_INFO.symbol, " ").concat(GBP_INFO.rate);
    } else {
      var _USD_INFO = data.bpi.USD;
      priceElement.innerHTML = "".concat(_USD_INFO.code).concat(_USD_INFO.symbol, " ").concat(_USD_INFO.rate);
    }
  });
}

var actualizarDatos = function actualizarDatos() {
  fetch(bitcoinPriceUrl, {
    method: "GET"
  }).then(function (response) {
    // La propiedad que nos dice si hubo un error en el request es "ok"
    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#checking_that_the_fetch_was_successful
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.status);
    }

    return response.json();
  }).then(function (data) {
    cambiarMoneda(data); // AQUI TENEMOS LA FECHA DENTRO DE data.time.updated

    var time_info = data.time.updated;
    timeElement.innerHTML = "Actualizado en: ".concat(time_info);
  })["catch"](function (error) {
    onsole.log("error", error);
  });
};

actualizarDatos();
button.addEventListener("click", actualizarDatos); // 118240946