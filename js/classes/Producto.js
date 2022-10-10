//clase Producto (tiene id, nombre, descripcion, precio, cantidad disponible, url, modelo)
export class Producto {
    constructor(id, nombre, descripcion, precio, cantidadDisponible, url, modelo){
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = parseFloat(precio).toFixed(2);
        this.cantidadDisponible = parseInt(cantidadDisponible);
        this.url = url;
        this.modelo = modelo;
    }
}
