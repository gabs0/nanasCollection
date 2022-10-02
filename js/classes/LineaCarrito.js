//clase LineaCarrito (contiene el id, nombre, descripcion, precio unit, cantidad, subtotal)

export class LineaCarrito{
    constructor(id, nombreProducto, descripcion, precio, cantidad, subtotal, url){
        this.id = id;
        this.nombreProducto = nombreProducto;
        this.descripcion = descripcion;
        this.precio = parseFloat(precio).toFixed(2);
        this.cantidad = parseInt(cantidad);
        this.subtotal = parseFloat(subtotal).toFixed(2);
        this.url = url;
    }
}