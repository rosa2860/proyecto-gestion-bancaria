/* ========================================= 
        IMPORTAR MODELO MOVIMIENTO
Banco necesitará crear movimientos automáticamente cuando se realicen operaciones como depósitos. 
========================================= */
import { Movimiento } from "./Movimiento.js";

/* ========================================= 
            MODELO BANCO
Banco será el encargado de coordinar usuarios, cuentas y movimientos.
========================================= */
export class Banco {
  constructor({ usuarios = [], cuentas = [], movimientos = [] } = {}) {
    this.usuarios = usuarios;
    this.cuentas = cuentas;
    this.movimientos = movimientos;
  }

  /* =====================================
       AGREGAR USUARIO
    ===================================== */
  agregarUsuario(usuario) {
    // some() comprueba si al menos un elemento del array cumple con la condición indicada.
    const existe = this.usuarios.some((u) => u.id === usuario.id);

    // Detenemos la operación si encontramos un usuario con el mismo identificador.
    if (existe) {
      throw new Error("El usuario ya existe.");
    }

    // Si no existe Agregamos el usuario al array
    this.usuarios.push(usuario);

    return usuario;
  }

  /* ========================================= 
    BUSCAR USUARIO POR ID
    Busca un usuario utilizando su identificador interno.
    find() devuelve el primer elemento que cumple la condición.
========================================= */

  buscarUsuarioPorId(usuarioId) {
    return this.usuarios.find((usuario) => usuario.id === usuarioId) || null;
  }

  /* ========================================= 
        AGREGAR CUENTA
========================================= */
  agregarCuenta(cuenta) {
    // Buscamos el propietario o usuario
    const usuario = this.buscarUsuarioPorId(cuenta.usuarioId);

    // Si el usuario no existe termina el metodo aqui y mandame un mensaje
    if (!usuario) {
      throw new Error("El usuario propietario de la cuenta no existe.");
    }

    // Consideramos duplicada una cuenta si coincide su ID o su número.
    const existe = this.cuentas.some(
      (c) => c.id === cuenta.id || c.numeroCuenta === cuenta.numeroCuenta,
    );

    // Si eciste la cuenta duplicada termina el metodo y mandame un mensaje
    if (existe) {
      throw new Error("La cuenta ya existe.");
    }

    // Si no existe simplemente REGISTRAR CUENTA
    this.cuentas.push(cuenta);

    return cuenta;
  }

  /* ========================================= 
        BUSCAR CUENTA POR ID 
Localiza una cuenta mediante su identificador interno.
========================================= */
  buscarCuentaPorId(cuentaId) {
    return this.cuentas.find((cuenta) => cuenta.id === cuentaId) || null;
  }

  /* ========================================= 
        BUSCAR CUENTA POR NÚMERO
Localiza una cuenta utilizando su número bancario visible.
========================================= */
  buscarCuentaPorNumero(numeroCuenta) {
    return (
      this.cuentas.find((cuenta) => cuenta.numeroCuenta === numeroCuenta) ||
      null
    );
  }

  /* ========================================= 
        OBTENER CUENTAS DE USUARIO
Recupera todas las cuentas que pertenezcan al usuario indicado.
========================================= */
  obtenerCuentasDeUsuario(usuarioId) {
    return this.cuentas.filter((cuenta) => cuenta.usuarioId === usuarioId);
  }

  /* ========================================= 
REGISTAR MOVIMIENTO
    agrega un movimiento al historial general del banco. 
========================================= */
  registrarMovimiento(movimiento) {
    this.movimientos.push(movimiento);

    return movimiento;
  }

  /* ========================================= 
        REALIZAR DEPÓSITO
        
Coordina toda la operación de depósito: 
1. Validar monto. 
2. Buscar cuenta. 
3. Actualizar saldo. 
4. Crear movimiento. 
5. Registrar movimiento
========================================= */
  realizarDeposito({ cuentaId, monto, descripcion = "" }) {
    // CONVERTIR MONTO
    const montoNumerico = Number(monto);

    // /* El monto debe ser un número válido y mayor que cero.
    if (!Number.isFinite(montoNumerico) || montoNumerico <= 0) {
      throw new Error("Monto inválido, el monto debe ser mayor a cero.");
    }

    // BUSCAR CUENTA Y VALIDAMOS
    const cuenta = this.buscarCuentaPorId(cuentaId);

    if (!cuenta) {
      throw new Error("La cuenta no existe.");
    }

    // ACTUALIZAR SALDO
    cuenta.depositar(montoNumerico);

    // Después del depósito creamos automáticamente un registro de la operación
    const movimiento = new Movimiento({
      tipo: "DEPOSITO",
      monto: montoNumerico,
      descripcion,
      cuentaOrigen: cuenta.id,
      saldoResultante: cuenta.saldo,
    });

    // REGISTRAR MOVIMIENTO
    this.registrarMovimiento(movimiento);

    return movimiento;
  }

  /* ========================================= 
        OBTENER MOVIMIENTOS DE UNA CUENTA
Devuelve todos los movimientos en los que la cuenta aparezca como origen o como destino.
========================================= */
  obtenerMovimientosDeCuenta(cuentaId) {
    return this.movimientos.filter(
      (movimiento) =>
        movimiento.cuentaOrigen === cuentaId ||
        movimiento.cuentaDestino === cuentaId,
    );
  }
}

/* ========================================= 
        AGREGAR USUARIO
Registra un usuario dentro del banco siempre que no exista otro usuario con el mismo ID.
========================================= */
/*agregarUsuario(usuario) {
  // some() comprueba si al menos un elemento del array cumple con la condición indicada.
  const existe = this.usuarios.some((u) => u.id === usuario.id);

  // Detenemos la operación si encontramos un usuario con el mismo identificador.
  if (existe) {
    throw new Error("El usuario ya existe.");
  }

  // Si no existe Agregamos el usuario al array
  this.usuarios.push(usuario);

  return usuario;
}*/

/* ========================================= 
            AGREGAR CUENTA
Registra una cuenta bancaria después de comprobar que su propietario existe y que la cuenta no está duplicada. 
========================================= */
/*function agregarCuenta(cuenta) {
  // Buscamos el propietario o usuario
  const usuario = this.buscarUsuarioPorId(cuenta.usuarioId);

  // Si el usuario no existe termina el metodo aqui y mandame un mensaje
  if (!usuario) {
    throw new Error("El usuario propietario de la cuenta no existe.");
  }

  // Consideramos duplicada una cuenta si coincide su ID o su número.
  const existe = this.cuentas.some(
    (c) => c.id === cuenta.id || c.numeroCuenta === cuenta.numeroCuenta,
  );

  // Si eciste la cuenta duplicada termina el metodo y mandame un mensaje
  if (existe) {
    throw new Error("La cuenta ya existe.");
  }

  // Si no existe simplemente REGISTRAR CUENTA
  this.cuentas.push(cuenta);

  return cuenta;
}*/

/* ========================================= 
        BUSCAR CUENTA POR NÚMERO
Localiza una cuenta utilizando su número bancario visible.
========================================= */

/*// USUSARIO DEMO
const usuarioDemo = new Usuario({
    nombre: 'Juan Suarez',
    email: 'juan@correo.com',
    telefono: '5512345678',
    password: '123456',
});

bancoDemo.agregarUsuario(
    usuarioDemo,
);

console.log(
    'Usuarios registrados:',
    bancoDemo.usuarios,
);

// CUENTA DEMO
const cuentaDemo = new Cuenta({
    numeroCuenta: '123456789012',
    usuarioId: usuarioDemo.id,
});

// Desde Banco validará el propietario y evitará cuentas duplicadas.
bancoDemo.agregarCuenta(
    cuentaDemo,
);

// MOSTRAR SALDO
console.log(
    'Saldo actual:',
    formatCurrency(cuentaDemo.saldo),
);

// MOSTRAR MOVIMIENTO GENERADO
console.log(
    'Movimiento generado:',
    depositoDemo,
);

// MOSTRAR HISTORIAL GENERAL
console.log(
    'Movimientos registrados:',
    bancoDemo.movimientos,
);

// BÚSQUEDA POR ID
const usuarioEncontrado =
    bancoDemo.buscarUsuarioPorId(
        usuarioDemo.id,
    );

// MUESTRA SI LO ENCONTRO
console.log(
    'Usuario encontrado:',
    usuarioEncontrado,
);

console.log(
    usuarioEncontrado === usuarioDemo,
);

// PRUEBA DE OBTENER LAS CUENTAS USUARIO
const cuentasUsuario =
    bancoDemo.obtenerCuentasDeUsuario(
        usuarioDemo.id,
    );

// MOSTRAMOS CUALES SON SUS CUENTAS
console.log(
    'Cuentas del usuario:',
    cuentasUsuario,
);


// PRUEBA CON REGLA NEGATIVA
// Intentamos realizar un depósito con un monto inválido.
try {
    bancoDemo.realizarDeposito({
        cuentaId: cuentaDemo.id,
        monto: -500,
    });
} catch (error) {
    console.log(
        'Error controlado:',
        error.message,
    );
}*/
