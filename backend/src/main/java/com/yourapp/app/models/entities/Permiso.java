package com.yourapp.app.models.entities;

public enum Permiso {
    // --------- CATEGORIA ----------
    CATEGORIA_CREAR("Crear una categoria"),
    CATEGORIA_ELIMINAR("Eliminar una categoria"),

    // --------- CLIENTE ----------
    CLIENTE_CREAR("Crear un cliente"),
    CLIENTE_VER("Ver clientes"),
    CLIENTE_MODIFICAR("Modificar un cliente"),
    CLIENTE_ELIMINAR("Eliminar un cliente"),

    // --------- COLOR ----------
    COLOR_CREAR("Crear un color"),
    COLOR_ELIMINAR("Eliminar un color"),

    // --------- EMPLEADO ----------
    EMPLEADO_CREAR("Crear un empleado"),
    EMPLEADO_VER("Ver empleados"),
    EMPLEADO_MODIFICAR("Modificar un empleado"),
    EMPLEADO_ELIMINAR("Eliminar un empleado"),

    // --------- PRODUCTO ----------
    PRODUCTO_CREAR("Crear un producto o un detalle de producto"),
    PRODUCTO_VER("Ver productos"),
    PRODUCTO_MODIFICAR("Modificar un producto o un detalle de producto"),
    PRODUCTO_ELIMINAR("Eliminar un producto o un detalle de producto"),

    // --------- PROVEEDOR ----------
    PROVEEDOR_CREAR("Crear un proveedor"),
    PROVEEDOR_ELIMINAR("Eliminar un proveedor"),

    // --------- ROL ----------
    ROL_CREAR("Crear un rol"),
    ROL_ELIMINAR("Eliminar un rol"),
    ROL_VER("Ver roles"),

    // --------- TALLE ----------
    TALLE_CREAR("Crear un talle"),
    TALLE_ELIMINAR("Eliminar un talle"),

    // --------- SUBCATEGORIA ----------
    SUBCATEGORIA_CREAR("Crear una subcategoria"),
    SUBCATEGORIA_ELIMINAR("Eliminar una subcategoria"),

    // --------- USUARIO ----------
    USUARIO_VER("Ver usuarios"),
    USUARIO_MODIFICAR("Modificar el rol de un usuario"),

    // --------- VENTA ----------
    VENTA_CREAR("Crear una venta o un detalle de venta"),
    VENTA_VER("Ver ventas"),
    VENTA_PAGAR("Pagar una venta"),
    VENTA_RESERVAR("Reservar una venta"),
    VENTA_CANCELAR("Cancelar una venta"),
    VENTA_RECHAZAR("Rechazar una venta"),
    VENTA_ELIMINAR("Eliminar una venta"),
    VENTA_CAMBIAR("Cambiar productos en una venta"),
    VENTA_PROCESAR("Cancelar reservas vencidas automáticamente");
    
    private final String descripcion;

    Permiso(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getDescripcion() {
        return descripcion;
    }
}


// ----------------- ENVIAR AL FRONT ASI
// List<Map<String, String>> permisos = Arrays.stream(Permiso.values())
//     .map(p -> Map.of("codigo", p.name(), "descripcion", p.getDescripcion()))
//     .collect(Collectors.toList());