# Sistema de Gestión Bancaria

Proyecto integrador correspondiente al Módulo 4.

El objetivo es desarrollar progresivamente un sistema bancario utilizando JavaScript moderno, arquitectura modular, programación orientada a objetos y programación funcional.

## Tecnologías

- HTML5
- CSS3
- JavaScript
- ECMAScript Modules
- Node.js
- npm
- Git
- GitHub

## Arquitectura

El proyecto utiliza las siguientes capas:

- Models
- Services
- UI
- Utils
- Tests

## Arquitectura actual

```text
js/
├── main.js
├── models/
│   ├── Cuenta.js
│   ├── Movimiento.js
│   └── Usuario.js
└── utils/
    ├── formatters.js
    ├── helpers.js
    └── validators.js
```

## Utilidades disponibles

### Validators

- `validarCampoObligatorio()`
- `validarMonto()`

### Helpers

- `generarId()`

### Formatters

- `formatCurrency()`
- `formatDate()`
- `formatAccountNumber()`

## Modelos disponibles

### Usuario

Representa a una persona registrada dentro del sistema.

Propiedades principales:

- `id`
- `nombre`
- `email`
- `telefono`
- `password`
- `activo`

### Cuenta

Representa una cuenta bancaria perteneciente a un usuario.

Propiedades principales:

- `id`
- `numeroCuenta`
- `tipo`
- `saldo`
- `usuarioId`
- `fechaApertura`
- `activa`

Métodos disponibles:

- `depositar()`
- `retirar()`

### Movimiento

Representa una operación registrada sobre una cuenta.

Propiedades principales:

- `id`
- `tipo`
- `monto`
- `descripcion`
- `cuentaOrigen`
- `cuentaDestino`
- `saldoResultante`
- `fecha`

## Funcionalidades previstas

Durante las siguientes versiones se desarrollarán:

- Registro de usuarios.
- Inicio de sesión.
- Gestión de cuentas.
- Depósitos.
- Transferencias.
- Historial de movimientos.
- Persistencia con LocalStorage.
- Manipulación del DOM.
- Manejo de eventos.
- Librerías visuales.
- Pruebas automatizadas con Jest.
- Git y GitHub.

## Versión actual

v0.3.0 — Modelado del dominio con Programación Orientada a Objetos.
