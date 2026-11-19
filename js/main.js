let tiempo = 0;

function Animar(){
   tiempo += 0.02;
   document.documentElement.style.setProperty('--posicion-fondo', `${50 + Math.sin(tiempo) * 12}%`);
   requestAnimationFrame(Animar);

}
Animar();
// sistema de categoria
const botones = document.querySelectorAll('.btn-categoria');
const juegos = document.querySelectorAll('.game-card');

botones.forEach(boton =>{
    boton.addEventListener("click", () =>{
        const categoria = boton.dataset.categoria;

        juegos.forEach(juego=> {
            const categoriasJuego= juego.dataset.categoria.split(/\s+/);
            juego.hidden = categoria !== "todos" && !categoriasJuego.includes(categoria);
        });
    });
});

//imagen
const galeria = document.querySelector('.gallery-grid');
const visor = document.querySelector('.image-viewer');

if (galeria && visor){
    const imagenGrande = visor.querySelector('img');
    const botonCerrar = visor.querySelector('.image-viewer__close');
    galeria.addEventListener("click", (evento) =>{
    const boton = evento.target.closest(".gallery-trigger");
    const miniatura = boton && boton.querySelector("img");
    if(!miniatura ||  !imagenGrande)return;
    imagenGrande.src = miniatura.src;
    imagenGrande.alt = miniatura.alt;
    visor.showModal()
});
botonCerrar.addEventListener("click", ()=> visor.close());
}
//validacion formulario
const m = document.querySelector("#mensaje");
const aviso = document.querySelector("#mensaje-error");

if (m && aviso) m.addEventListener("input", () =>{
    const invalido = m.ariaValueMax.trim().length < 10;
    aviso.textContent = invalido ? "Escribe al menos 10 caracteres." : "";
    m.setCustomValidity(invalido ? aviso.textContent : "");
});

//menu hamburguesa
const button = document.getElementById('menu-button');
const menu = document.getElementById('page-menu');

if (button && menu) {
    function closeMenu() {
        menu.classList.remove('is-open');
        button.setAttribute('aria-expanded', 'false');
        button.setAttribute('aria-label', 'Abrir menú');
    }

    button.addEventListener('click', () => {
        const isOpen = menu.classList.toggle('is-open');
        button.setAttribute('aria-expanded', String(isOpen));
        button.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeMenu();
    });

    menu.addEventListener('click', (event) => {
        if (event.target.closest('a')) closeMenu();
    });
}