/* ========================================= 
		FORMATEADORES DE INFORMACIÓN 
========================================= */
/* Convierte un valor numérico a una representación monetaria utilizando pesos mexicanos. */
/*Esta funcion formatea un valor numérico como una cadena de texto en formato de moneda mexicana */
/*Su parametro es el "valor" a formatear */
export function formatCurrency(valor) {
  const numero = Number(valor);

  if (!Number.isFinite(numero)) {
    return "$0.00";
  }

  //Se aplica formato de moneda
  return numero.toLocaleString("es-MX", {
    //Establece el estilo de formato como moneda
    style: "currency",
    //Establece pesos mexicanos como moneda a utilizar
    currency: "MXN",
  });
}

/* ========================================= 
			FORMATEAR FECHA 
========================================= */
/* Convierte una fecha a una representación más amigable utilizando la configuración regional de México. */
export function formatDate(fecha) {
  //Convierte el parametro fecha en un objeto de fecha para poder trabajar con el valor
  const fechaObjeto = new Date(fecha);

  //validaci{on para que no se muestre un valor incorrecto en caso de que la fecha no sea valida
  //esta validacion se hace con el metodo getTime() que devuelve el valor numerico de la fecha y si no es valida devuelve NaN
  if (Number.isNaN(fechaObjeto.getTime())) {
    return "";
  }

  //Formato de fecha para mexico en donde se muestra el dia, mes y año en formato corto
  return fechaObjeto.toLocaleDateString("es-MX");
}

/* ========================================= 
		FORMATEAR NÚMERO DE CUENTA 
========================================= */

/*Funcion para dar formato al numero de cuenta */
export function formatAccountNumber(numeroCuenta) {
  const numero = String(numeroCuenta ?? "");

  //SEPARAR GRUPOS DE CUATRO DÍGITOS
  return numero.replace(/(\d{4})(?=\d)/g, "$1 ");
}
