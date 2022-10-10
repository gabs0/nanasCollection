
import { Producto} from './classes/Producto.js';
import { LineaCarrito } from './classes/LineaCarrito.js';

let codigo;
let productosLS = [];
let carrito = [];

//Función para actualizar storage
function sincronizarLStorage(key, value){
    localStorage.setItem(`${key}`, JSON.stringify(value))
}

//Funcion para evaluar si hay algo en productos
function comprobarEstadoLSproductos(){
    //Operador ternario
    localStorage.getItem('productosLS') ? productosLS = JSON.parse(localStorage.getItem('productosLS')) : sincronizarLStorage(`productosLS`, productosLS);
}

//Funcion para evaluar si hay algo en el carrito
function comprobarEstadoLSCarrito(){
    //Operador ternario
    localStorage.getItem('carrito') ? carrito = JSON.parse(localStorage.getItem('carrito')) : sincronizarLStorage(`carrito`, carrito);
}

//Comprueba si hay algo en el ls de carrito
comprobarEstadoLSCarrito();

//Funcion para verificar variable definida
function valorIsDefine(variable){
    if (variable !== null && variable !== undefined && variable.length !== 0){
        return true
    }
}

//Función para agregar nueva linea de carrito
function nuevaLineaCarrito(p, cantidad){
    let lineaDetalle = new LineaCarrito(p.id, p.modelo, p.descripcion, p.precio, cantidad, (getSubtotal(cantidad, p.precio)), p.url); 
    carrito.push(lineaDetalle);
}

//Función para obtener subtotal de una compra
function getSubtotal(cantidadItem, precioItem){
    if (cantidadItem >= 5){
        return (cantidadItem*precioItem)*0.8;
    }
    else if(cantidadItem >= 15){
        return (cantidadItem*precioItem)*0.6;
    }
    else{
        return cantidadItem*precioItem;
    }
}

//Función para crear cada card del item en productos disponibles
function renderizarProductos(item, divProductos){
    let newProduct = document.createElement("div");
    newProduct.innerHTML = `<div class="cardProducto">
                                <img src="../assets/${item.url}" alt="${item.nombre} - ${item.descripcion}">
                                <div class="card--detalle">
                                    <h4>${item.modelo}</h4>
                                    <p>${item.descripcion}</p>
                                    <p class="precio"> $ ${item.precio}</p>
                                    <div class="btn--buy">
                                        <button id='agregarProducto${item.id}' class="btnComprar" ">comprar</button>
                                    </div>
                                </div>
    </div>`
                                    
    divProductos.appendChild(newProduct);

    // Evento agregar item al carrito
    let btnComprar = document.getElementById(`agregarProducto${item.id}`);
    btnComprar.addEventListener('click',()=>{
        showItem()
        mostrarProducto(item);
        cantidadItems.value = '';
    })
}

//Función para cargar productos con DOM con evento de comprar
const cargarProductos = async ()=>{
    const respuesta = await fetch("../productos.json");
    const productos = await respuesta.json();
    let divProductos = document.getElementById("productos");

    for(let item of productos){
        let nuevoItem = new Producto(item.id, item.nombre, item.descripcion, item.precio, item.cantidadDisponible, item.url,  item.modelo);
        productosLS.push(nuevoItem);
        renderizarProductos(nuevoItem, divProductos)
    }
    sincronizarLStorage(`productosLS`, productosLS);
}

//Función para mostrar la carga y luego los productos
function simularCarga(){
    let divCarga = document.getElementById("loader");
    divCarga.innerHTML=`<img src="../assets/icons/loader.svg" alt="">
                        <p>Los productos están cargando</p>`
    setTimeout(()=>{
        divCarga.remove();
        cargarProductos()
    }, 2500)
}

//Cargando productos...
simularCarga();

//Comprueba estado de ls productos
comprobarEstadoLSproductos();

//DOM para generar un item en un modal
let imgCard = document.createElement('img');
let descripcionCard = document.createElement('div');
let idItem;

function mostrarProducto(producto){
    //capturar divModal
    let divCardModal =document.getElementById('cardItem');
    console.log(divCardModal)

    //setear atributos
    imgCard.setAttribute('class', 'articulo');
    imgCard.setAttribute('src',`../assets/${producto.url}`);
    imgCard.setAttribute('alt',`${producto.nombre} - ${producto.descripcion}`);

    //agregar card en la pos 0
    divCardModal.insertBefore(imgCard, divCardModal.childNodes[0]);

    descripcionCard.setAttribute('class',"descripcionItem")
    descripcionCard.innerHTML = `<h4>${producto.modelo}</h4>
                                <p>${producto.descripcion}</p>
                                <p>$ ${producto.precio}</p>`
    //agregar descripcion en la pos 1
    divCardModal.insertBefore(descripcionCard, divCardModal.childNodes[1])
    idItem = producto.id;
}

//DOM del modal Item
let cantidadItems = document.getElementById('cantidadItem');
const btnPlus = document.getElementById('btnAgregar');
const btnMinus = document.getElementById('btnQuitar');
const btnAgregarAlCarrito = document.getElementById('btnAgregarItems');
const closeItem = document.getElementById("closeItemModal");
const modalItem = document.getElementById('cardModal');
const mensajeStock = document.getElementById('mensajeDisponibilidad');

//Función para abrir modal item
function showItem(){
    modalItem.classList.add('modal--show');
}

//Función para cerrar modal item
function hideItem(){
    modalItem.classList.remove('modal--show');
}

//Función para verificar stock de un producto
function verificarStock(producto, cantidadAComprar){
    if(producto.cantidadDisponible < cantidadAComprar){
        mensajeStock.innerHTML = `No hay suficiente stock <br> Quedan ${producto.cantidadDisponible} unidades disponibles`;
        return false
    }else{
        return true
    }


}

//Función con aplicación de Toastify para notificar que se agregó un producto al carrito
function mostrarMensaje(){
    Toastify({
        text: 'Agregado al carrito',
        duration: 2000,
        gravity: 'bottom',
        className: 'notificacion',
        stopOnFocus: true,
    }).showToast()
}

//Evento cerrar modal Item
closeItem.addEventListener('click', hideItem);

//Evento agregar un item al modal
btnPlus.addEventListener('click', ()=>{
    let cantidad = parseInt(cantidadItems.value);

    !isNaN(cantidad) ? cantidad++ : cantidad = 1;
    cantidadItems.value = cantidad;
})

//Eventos quitar un item al modal
btnMinus.addEventListener('click', ()=>{
    let cantidad = parseInt(cantidadItems.value);

    !isNaN(cantidad) && cantidad != 0 ? cantidad-- : cantidad = 0;
    cantidadItems.value = cantidad;
})

//Evento agregar elementos al carrito
btnAgregarAlCarrito.addEventListener('click',()=>{
    console.log(valorIsDefine(cantidadItems.value));
    if(valorIsDefine(cantidadItems.value)){
        let itemComprado = productosLS.find((item => item.id === idItem));
        let existeEnCarrito = carrito.some (prod => prod.id === itemComprado.id);

        if(existeEnCarrito){
            carrito.map(prod => {
                if(prod.id === idItem){
                    prod.cantidad += Number(cantidadItems.value)
                    console.log(prod.cantidad)
                }
                if(verificarStock(prod, prod.cantidad)){
                    sincronizarLStorage('carrito', carrito);
                }
                
            })
        }else{
            //Si hay stock procede sino muestra mensaje de error
            if(verificarStock(itemComprado,cantidadItems.value)){
                console.log(itemComprado);

                //generar nueva linea de producto
                nuevaLineaCarrito(itemComprado, cantidadItems.value);
                //Actualizar carrito
                sincronizarLStorage('carrito', carrito);
                console.log(carrito);
            }
        }
        mostrarMensaje();
        hideItem();
    }
})


//DOM carrito
const openCartModal = document.getElementById('btnCarrito');
const sectionModal = document.getElementById('cartModal');
const modalConItems = document.getElementById('modalBody');
const btnFinalizarCompra = document.getElementById('btnFinalizarCompra');
const valorCompra = document.getElementById('precioTotal');
const closeCartModal = document.getElementById('closeCartModal');


//Función para abrir modal carrito
function showCart(){
    sectionModal.classList.add('modal--show');
}

//Función para cerrar modal carrito
function hideCart(){
    sectionModal.classList.remove('modal--show');
}

//Función para no mostrar botón de fin compra
function hideBtnFin(){
    btnFinalizarCompra.classList.add('hide');
}

//Función para eliminar item del carrito
function eliminarItem (id){
    carrito = carrito.filter((items => items.id !== id));
    sincronizarLStorage('carrito', carrito);
    cargarItemsEnCarrito(carrito);
}

//Función para calcular el total del carrito
function calcularTotal(array){
    let acumulador = 0;
    acumulador = array.reduce((acumulador,itemComprado)=>{
        return acumulador + Number(itemComprado.subtotal)
    },0)
    if(acumulador === 0){
        valorCompra.innerHTML = `No hay ningún item comprado`;
        hideBtnFin();
    }else{
        valorCompra.innerHTML = `El total acumulado es de  $${acumulador}`
    }
}

//Función para mostrar mensaje de artículo eliminado
function mensajeEliminado(){
    Toastify({
        text: 'Producto eliminado del carrito',
        duration: 2000,
        gravity: 'bottom',
        className: 'notificacion',
        stopOnFocus: true,
    }).showToast()
}

//Función para cargar items en el modal de carrito
function cargarItemsEnCarrito(array){
    modalConItems.innerHTML = '';
    array.forEach((itemComprado)=>{
        modalConItems.innerHTML += `<div id="itemCarrito${itemComprado.id}" class="cardProducto">
                                        <img class="itemComprado" src="../assets/${itemComprado.url}" alt="${itemComprado.nombreProducto} - ${itemComprado.descripcion}">
                                        <div class="card--detalle">
                                            <h4>${itemComprado.nombreProducto}</h4>
                                            <p>${itemComprado.descripcion}</p>
                                            <p class="precio"> $ ${itemComprado.precio}</p>
                                            <p>${itemComprado.cantidad} unidades</p>
                                            <p>Subtotal $ ${itemComprado.subtotal}</p>
                                        </div>
                                        <button id="btnEliminar${itemComprado.id}"  class="btn--eliminarItem"><img src="../assets/icons/trash-2.svg" alt="trash-2"></button>
                                    </div>`

        //Evento para eliminar un item del carrito
        let btnEliminarItem = document.getElementById(`btnEliminar${itemComprado.id}`);
        btnEliminarItem.addEventListener('click', ()=>{
            eliminarItem(itemComprado.id);
            mensajeEliminado();
        })
    })

    //calcular total
    calcularTotal(array);
}

//Función para descontar stock del ls productos
function descontarItems(productosLS, carrito){
    for(const item of carrito){
        let prod = (productosLS.find(producto => producto.id === item.id))
        prod.cantidadDisponible -= item.cantidad; 
        sincronizarLStorage('productosLS', productosLS)
    }
}

//Función de agradecimeinto 
function graciasPorSuCompra(){
    valorCompra.classList.add('hide');
    Toastify({
        text: 'Gracias por su compra!',
        duration: 2000,
        gravity: 'bottom',
        position: 'center',
        className: 'notificacion',
        stopOnFocus: true,
    }).showToast()
}

//Evento para abrir el modal carrito
openCartModal.addEventListener('click', ()=>{
    showCart();
    sincronizarLStorage('carrito',carrito)
    cargarItemsEnCarrito(carrito);
});

//Evento para cerrar el modal carrito
closeCartModal.addEventListener('click', hideCart);

//Evento finalizar compra
btnFinalizarCompra.addEventListener('click',()=>{
    descontarItems(productosLS, carrito);
    carrito = [];
    hideCart();
    graciasPorSuCompra()
    sincronizarLStorage('carrito',carrito)
    cargarItemsEnCarrito(carrito);
})