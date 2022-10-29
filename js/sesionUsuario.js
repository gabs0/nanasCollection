import {Usuario} from './classes/Usuario.js'

let usuarios = [];
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


//Comprueba si hay algo en ls de Usuarios
comprobarEstadoDeLocalSUsuarios();
console.log(sesionIniciada)
comprobarSesion();
usuarioEnSesion(sesionIniciada);