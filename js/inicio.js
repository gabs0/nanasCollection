//Vivienne Westwood Nana's Collection

/*  ----------------------------- funciones con DOM ------------------------------*/

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

//Función para cargar la ruta de la imagen, y mostrar deseada
function renderizarSlider(posicion){
    imgSlider.setAttribute('id', posicion)
    imgSlider.setAttribute('class', 'slide__img');
    imgSlider.setAttribute('src',`${rutas[posicion]}`);
}

//Función para mostrar siguiente imagen
function mostrarSliderSiguiente(){
    posicion = Number(divSlider.children[0].getAttribute('id'));
    posicion >= rutas.length - 1 ? posicion = 0 : posicion++;
    renderizarSlider(posicion);
}

//Función para mostrar el anterior 
function mostrarSliderAnterior(){
    posicion = Number(divSlider.children[0].getAttribute('id'));
    posicion <= 0  ? posicion = rutas.length - 1 : posicion--;
    renderizarSlider(posicion);
}

//Eventos de siguiente y previo
btnNext.addEventListener('click', mostrarSliderSiguiente);
btnPrevio.addEventListener('click', mostrarSliderAnterior);

//DOM slider con cards de los personajes
const cardsConPersonajes = document.getElementById('cardPersonajes');
const arrayPersonajes =[...cardsConPersonajes.children];
const btnAvanzar = document.getElementById('btnAvanzar');
const btnRetroceder = document.getElementById('btnRetroceder');
let root = document.documentElement;

const medida = -40;
let pos=0;
let avanza = false;

//Función para modificar valor de CSS y agregar clase para desplazar
function desplazarX(elemento, valor){
    root.style.setProperty('--moverX', `${valor}%`);
    elemento.classList.add('desplazar');
}

//Función para desplazar segun posición
function asignarValorDesplazamiento(avanza){
    for(let i of arrayPersonajes){
        (pos == 0) && desplazarX(i, medida*pos);
        (pos == 1) && desplazarX(i, medida*pos);
        (pos == 2) && desplazarX(i, medida*pos);
        (pos == 3) && desplazarX(i, medida*pos);
        (pos == 4) && desplazarX(i, medida*pos);
        (pos == 5) && desplazarX(i, medida*pos);
        (pos == 6) && desplazarX(i, medida*pos);
        
        if(avanza){
            if (pos > 6) { 
                desplazarX(i, 0); 
                pos = 0
            };
        }else{
            if (pos < 0) {
                desplazarX(i, medida*pos); 
                pos = 6
            };
        }
    }
}

//Evento pora desplazar hacia la derecha
btnAvanzar.addEventListener('click',()=>{
    pos++;
    avanza = true;
    asignarValorDesplazamiento(avanza)
})

//Evento para desplazar a la izquierda
btnRetroceder.addEventListener('click',()=>{
    pos--;
    avanza = false;
    asignarValorDesplazamiento(avanza)
})


