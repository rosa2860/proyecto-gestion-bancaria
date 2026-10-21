/* ===========================================================
		FUNCIONES AUXILIARES
        Este archivo contiene funciones que pueden ser reutilizables
        para otras funciones o acciones de otros archivos
=========================================================== */

/*Funcion que genera identificadores dinamicos*/
export function generarId() {
  /* Date.now() devuelve la cantidad de milisegundos transcurridos desde el 1 de enero de 1970. */
  /* Math.random() genera un número pseudoaleatorio entre 0 y 1. */
  /*con toString() se convierte de numero a cadena de texto */
  return `${Date.now()}-${Math.random()
    .toString(36)

    /* Tomamos solamente una parte del resultado generado
    desde el indice 2 hasta nates del índice 9 */
    .substring(2, 9)}`;
}
