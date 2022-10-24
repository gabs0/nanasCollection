//Vivienne Westwood Nana's Collection
import { Usuario } from './classes/Usuario.js';

//Arrays
let usuarios = [];
let productos = [];
let carrito = [];

let array = [];
let u = {};

let sesionIniciada = '';

let input0;
let input1;
let input2;

//Expresion para validar mail
const regExpCorreo = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/


//Storage usuarios
//Función para actualizar storage
function sincronizarLStorage(key, nombre){
    localStorage.setItem(`${key}`, JSON.stringify(nombre))
}

//Si hay algo en el array de usuarios
function comprobarEstadoDeLocalSUsuarios(){
    //Operador ternario
    localStorage.getItem('usuarios') ? usuarios = JSON.parse(localStorage.getItem('usuarios')) : sincronizarLStorage('usuarios', usuarios);
}

function comprobarSesion(){
    //Operador ternario
    localStorage.getItem('sesionEstado') ? sesionIniciada = (JSON.parse(localStorage.getItem('sesionEstado'))) : sincronizarLStorage('sesionEstado', sesionIniciada);
}

/*  ------------------------------ funciones  ------------------------------*/ 
//variable no nula para verificar
function valorIsDefine(variable){
    if (variable !== null && variable !== undefined && variable.length !== 0){
        return true
    }
}

//Registrar usuario
function registrarUsuario(nombre,  mail, password){
    u =  new Usuario(nombre, mail, password);
}

/*  ------------------------------ funciones con DOM ------------------------------*/

//Comprueba si hay algo en ls de Usuarios
comprobarEstadoDeLocalSUsuarios();
console.log(sesionIniciada)
comprobarSesion();


//Abrir modal form, por defecto inicia en form de registro
function showForm(){
    modal.classList.add('modal--show');
    mostrarRegistro();
    ocultarIniciarSesion();
}

//Cerrar modal form
function hideForm(){
    modal.classList.remove('modal--show');
}

//Validar campos del Form
function validarFormulario(){
    //obtener valores del input
    const valorNombre = nombreCompleto.value;
    const valorCorreo = correo.value;
    const valorPassw = passw.value;

    if(!valorIsDefine(valorNombre)){
        console.log("vacio");
        valorFalla(nombreCompleto, 'Campo vacío');

    }else{
        valorCorrecto(nombreCompleto, ' ')
        input0 = true;
    }

    if(!valorIsDefine(valorCorreo)){
        console.log("vacio");
        valorFalla(correo, 'Campo vacío');

    }else if(!validarCorreo(valorCorreo)) {
        valorFalla(correo, 'Ingrese un correo válido');
    } else{
        valorCorrecto(correo, ' ');
        input1 = true;
    }

    if(!valorIsDefine(valorPassw)){
        console.log("vacio");
        valorFalla(passw, 'Campo vacío');
    }else if(valorPassw.length < 8){
        valorFalla(passw, 'La contraseña debe tener al menos 8 caracteres');
    }else{
        valorCorrecto(passw, ' ');
        input2 = true;
    }
}

//Mostrar falla
function valorFalla(campo, mensaje){
    let controlarCampo = campo.parentElement;
    let aviso = controlarCampo.querySelector('small');
    aviso.innerText = mensaje;
    controlarCampo.className = 'div__input falla';
}

//Mostrar valor correcto
function valorCorrecto(campo, mensaje){
    let controlarCampo = campo.parentElement;
    let aviso = controlarCampo.querySelector('small');
    aviso.innerText = mensaje;
    controlarCampo.className = 'div__input correcto';
}

//Validar correo
function validarCorreo(mail){
    return  regExpCorreo.test(mail)
}

//Limpiar formulario
function resetForm(){
    document.getElementById("formUserSignUp").reset();
}

/* ------ Modal con registro de Usuario ------*/

//DOM para abrir modal de registro
const openForm = document.getElementById("logUser");
const closeForm = document.getElementById("closeModal");
const modal = document.getElementById("formModal");

//DOM para el registro de un usuario
const nombreCompleto = document.getElementById("nombreUsuario");
const correo = document.getElementById("mailUsuario");
const passw = document.getElementById("passwordUsuario");
const btnRegistrarse = document.getElementById('btn--GuardarUsuario');
const formularioRegistro = document.getElementById("formUserSignUp");


//Evento para mostrar el formulario
openForm.addEventListener('click', showForm);

//Evento para quitar el formulario
closeForm.addEventListener('click', hideForm);

//cambiar nombre del log
function cambiarNombre(name){
    openForm.innerText = name.split(' ')[0]
}

//Fubción para mostrar mensaje de estado de sesión
function mostrarMensajeSesion(valor){
    Toastify({
        text: valor,
        duration: 2000,
        gravity: 'bottom',
        position: 'center',
        className: 'notificacion',
        stopOnFocus: true,
    }).showToast()
}


//Evento para registrar un nuevo usuario
btnRegistrarse.addEventListener('click', (evento)=>{
    evento.preventDefault();
    validarFormulario();
    if(input0 && input1 && input2){
        registrarUsuario(nombreCompleto.value, correo.value, passw.value);
        usuarios.push(u);
        //Actualizar usuario
        sincronizarLStorage('usuarios', usuarios);
        sincronizarLStorage('sesionEstado', 'Iniciada');
        mostrarMensajeSesion('Usuario creado');
        mostrarSesion();
        hideForm();
    }
    resetForm();
    ocultarRegistrarse()
})

//Modal de log in de usuario
//DOM para mostrar modal de inicio de sesión 
const formularioLog = document.getElementById("formUserLogIn");
const btnMostrarIniciarSesion = document.getElementById('btn--IniciarSesion');
const btnIniciarSesion = document.getElementById('btn--IniciarSesionLogIn');

//Función para mostrar modal de inicio de sesión
function mostrarIniciarSesion(){
    formularioLog.classList.remove('hide');
}

//Función para ocultar modal de inicio de sesión
function ocultarIniciarSesion(){
    formularioLog.classList.add('hide')
}

//Función para ocultar modal de registro
function ocultarRegistro(){
    formularioRegistro.classList.add('hide');
}

//Función para mostrar modal de registro
function mostrarRegistro(){
    formularioRegistro.classList.remove('hide');
}

//Evento para mostrar form de incio de sesión
btnMostrarIniciarSesion.addEventListener('click',()=>{
    ocultarRegistro();
    mostrarIniciarSesion();
})

//DOM para evaluar el inicio de sesión de un usuario
const usuariosLS = JSON.parse(localStorage.getItem('usuarios'));
const mailIngresado = document.getElementById('mailUsuarioLogIn');
const passwIngresado = document.getElementById('passwordUsuarioLogIn');
const sesionUsuario = document.getElementById('sesion');

//Función para ocultar la opción de cerrar sesión
function ocultarSesion(){
    sesionUsuario.classList.add('hide')
}

//Función para mostrar la opción de cerrar sesión
function mostrarSesion(){
    sesionUsuario.classList.remove('hide')
}

//Función para ocultar la opción de registrarse
function ocultarRegistrarse(){
    logUser.classList.add('hide')
}

//Función para mostrar la opción de registrarse
function mostrarRegistrarse(){
    logUser.classList.remove('hide')
}

//Función para buscar en el registro de usuarios al usuario ingresado
function buscarUsuario(usuario){
    console.log(sesionIniciada)
    if(usuario.mail === mailIngresado.value && usuario.password === passwIngresado.value){
        //Setear el usuario que inició sesión
        sincronizarLStorage('sesionEstado', 'Iniciada');
        sesionIniciada = localStorage.getItem('sesionEstado');
    }
}

//Evento para mantener la sesión iniciada
btnIniciarSesion.addEventListener('click',()=>{
    for (const user of usuariosLS){
        buscarUsuario(user);
    }
})

//Función para evaluar si el usario inició sesión
function usuarioEnSesion(sesionIniciada){
    console.log(sesionIniciada)
    if(sesionIniciada === 'Iniciada'){
        mostrarSesion();
        ocultarRegistrarse();
        mostrarMensajeSesion('Sesión iniciada');
        return true
    }else{
        ocultarSesion();
        mostrarRegistrarse();
        return false
    }
}

//Función para cerrar sesión
function cerrarSesion(){
    //Setear el usuario que cerró sesión
    sincronizarLStorage('sesionEstado', 'Cerrada');
    sesionIniciada = localStorage.getItem('sesionEstado');
    mostrarMensajeSesion('Sesión cerrada');
}

//Evento para cerrar sesión de usuario
sesionUsuario.addEventListener('click', ()=>{
    cerrarSesion();
    mostrarRegistrarse();
    ocultarSesion();
}); 

usuarioEnSesion(sesionIniciada);

//DOM slider de nana inspo
const divSlider = document.getElementById("slideContenedor");
let imgSlider = document.querySelector(".slide img");
const btnNext = document.getElementById("btnNext");
const btnPrevio = document.getElementById("btnPrev");
const rutas = [ '../assets/slider_home/home.jpg',
                '../assets/slider_home/home2.jpg',
                '../assets/slider_home/home3.jpg',
                '../assets/slider_home/home4.jpg',
                '../assets/slider_home/home5.jpg',
                '../assets/slider_home/home6.jpg',
                '../assets/slider_home/home7.jpg'
];
let posicion;

function renderizarSlider(posicion){
    imgSlider.setAttribute('id', posicion)
    imgSlider.setAttribute('class', 'slide__img');
    imgSlider.setAttribute('src',`${rutas[posicion]}`);
}

function mostrarSliderSiguiente(){
    posicion = Number(divSlider.children[0].getAttribute('id'));
    posicion >= rutas.length - 1 ? posicion = 0 : posicion++;
    renderizarSlider(posicion);
}

function mostrarSliderAnterior(){
    posicion = Number(divSlider.children[0].getAttribute('id'));
    posicion <= 0  ? posicion = rutas.length - 1 : posicion--;
    renderizarSlider(posicion);
}

btnNext.addEventListener('click', mostrarSliderSiguiente);
btnPrevio.addEventListener('click', mostrarSliderAnterior);

//DOM slider con cards de los personajes
const cardsConPersonajes = document.getElementById('cardPersonajes').children;
const arrayPersonajes =[...cardsConPersonajes];
const btnAvanzar = document.getElementById('btnAvanzar');
const btnRetroceder = document.getElementById('btnRetroceder');
const puntos = document.getElementById('puntos');
let pos=0;

btnAvanzar.addEventListener('click',()=>{
    
    let esUltimoActive = (persona) => persona.classList.contains('active')
    let indexUltimoActive = arrayPersonajes.findLastIndex(esUltimoActive)
    console.log(indexUltimoActive)
    console.log(pos)

    if(indexUltimoActive+1 > arrayPersonajes.length){
        console.log(arrayPersonajes[0]);
        arrayPersonajes[0].setAttribute('display', 'initial');
    }else{
        arrayPersonajes[indexUltimoActive+1].classList.add('active');
        arrayPersonajes[0+pos].style.display = 'none';
        arrayPersonajes[0+pos].classList.remove('active');
    }
    pos++;
    console.log(indexUltimoActive)
    console.log(pos)
})