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

// //Polleras
// const producto1 = new Producto(generateId(), "Pollera", "Escocesa negro", 600, 1000, "p-negro.png", "Pollera Hachiko");
// const producto2 = new Producto(generateId(), "Pollera", "Escocesa rojo", 650, 1200, "p-rojo.png", "Pollera Osaki");
// const producto3 = new Producto(generateId(), "Pollera", "Escocesa gris", 690, 900, "p-gris.png", "Pollera Shin");

// //Remeras
// const producto4 = new Producto(generateId(), "Remera", "Diseño 'Black Stones'", 1500, 2000, "d-blackStones.png",'Black Stones' );
// const producto5 = new Producto(generateId(),"Remera", "Diseño 'Trapnest'", 1100, 500, "d-trapnest.png", 'Trapnest');
// const producto6 = new Producto(generateId(), "Remera", "Diseño 'The Sex Pistols'", 900, 700, "d-sexPistols.png", 'The Sex Pistols');

// //Accesorios
// const producto7 = new Producto(generateId(), "Accesorio", "Lentes de sol", 2000, 300, "a-sunglasses.png", "Lentes de sol" );
// const producto8 = new Producto(generateId(), "Accesorio", "Anillo", 1500, 100, "a-anillo.png",  "Anillo" );
// const producto9 = new Producto(generateId(), "Accesorio", "Encendedor", 3000, 100, "a-encendedor.png", "Orb ligther");
// const producto10 = new Producto(generateId(), "Accesorio", "Púa de guitarra", 250, 90, "a-guitarpicks.png", "Púa");

