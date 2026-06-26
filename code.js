
/* Header */
const header = document.querySelector('header');

function esMobile() {
    return window.innerWidth <= 600;
}

if (!esMobile()) {
    document.addEventListener('mousemove', (e) => {
        if (e.clientY < 20) {
            header.style.top = '0';
        } else if (!header.matches(':hover')) {
            header.style.top = '-100px';
        }
    });
    header.addEventListener('mouseleave', () => {
        header.style.top = '-100px';
    });
} else {
    header.style.top = '0';
}

/* Contador de días juntos */
const fechaInicio = new Date('2023-07-03T00:00:00');

function actualizarContador() {
    const ahora = new Date();
    const diferencia = ahora - fechaInicio; // milisegundos totales

    const dias    = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas   = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

    document.getElementById('contador-dias').textContent = dias;
    document.getElementById('contador-horas').textContent = horas;
    document.getElementById('contador-minutos').textContent = minutos;
    document.getElementById('contador-segundos').textContent = segundos;
}

actualizarContador(); // ejecuta una vez al cargar sin esperar 1 segundo
setInterval(actualizarContador, 1000); // después actualiza cada segundo

/* Modal razones */
/* Modal razones */
const textoRazones = `Es una persona hermosa en todos los sentidos, amable, valiente, adoro su pelo marroncito hermoso, su cara tan linda, sus cachetes tan tiernos, su risa que ella dice que aveces es molesta pero que a mi me encanta, sus chistes boludos, sus sueños, las historias que crea en su cerebro tan hermoso, su cuerpo que me vuelve loco como nadie, sus ojos color cafe que al mirarme me dan ganas de vivir, en fin, nunca se me van a acabar las razones para amarte mi amor.`;

const modalRazones = document.getElementById('modal-razones');
let intervaloTypewriter = null; // guardamos referencia para poder cancelarlo

function interpolarColor(progreso) {
    // inicial: #f0a0c0 = rgb(240, 160, 192) — rosa claro
    // final:   #e0004a = rgb(224,   0,  74) — rosa fuerte
    const r = Math.round(240 + (224 - 240) * progreso);
    const g = Math.round(160 + (0   - 160) * progreso);
    const b = Math.round(192 + (74  - 192) * progreso);
    return `rgb(${r}, ${g}, ${b})`;
}

function typewriter(elemento, texto) {
    if (intervaloTypewriter) clearInterval(intervaloTypewriter);

    elemento.innerHTML = '';
    let i = 0;

    intervaloTypewriter = setInterval(() => {
        const progreso = i / texto.length;
        const colorFinal = interpolarColor(progreso);
        const char = texto[i];

        if (char === '\n') {
            elemento.appendChild(document.createElement('br'));
        } else {
            const span = document.createElement('span');
            span.classList.add('letra-typewriter');
            span.textContent = char;
            span.style.color = '#f0a0c0'; // nace rosa claro

            elemento.appendChild(span);

            // un frame después cambia al color final — dispara la transición CSS
            requestAnimationFrame(() => {
                span.style.color = colorFinal;
            });
        }

        i++;
        if (i >= texto.length) clearInterval(intervaloTypewriter);
    }, 45);
}
document.getElementById('razones-trigger').addEventListener('click', () => {
    modalRazones.classList.add('activo');
    const elemento = document.getElementById('razones-texto');
    typewriter(elemento, textoRazones);
});

document.getElementById('cerrar-razones').addEventListener('click', () => {
    modalRazones.classList.remove('activo');
    if (intervaloTypewriter) clearInterval(intervaloTypewriter);
});

modalRazones.addEventListener('click', (e) => {
    if (e.target === modalRazones) {
        modalRazones.classList.remove('activo');
        if (intervaloTypewriter) clearInterval(intervaloTypewriter);
    }
});

/* Poemas {section/article} */
const poemas = {
    1: {
        titulo: "Poema I",
        texto: `Amor mío,<br><br>
Si no fuera por vos, mis segundos serían vacíos,<br>
sin la exactitud del ser.<br><br>
Si no fuera por vos, mis minutos tendrían<br>
los matices negros de las hojas caídas.<br><br>
Si no fuera por vos, mis horas no conocerían<br>
la belleza de todos los colores de la vida.<br><br>
Si no fuera por vos, mis días serían<br>
<strong>jodidamente</strong> exhaustivos.<br><br>
Si no fuera por vos, mis semanas pasarían<br>
sin más sentido que el de la simple existencia.<br><br>
Si no fuera por vos, mis meses y años estarían perdidos<br>
en un limbo incesante, carente de deseos y ambición.<br><br>
Si no fuera por vos, mi vida no tendría<br>
un ápice de dirección.<br><br>
<strong>Amor mío, sos mi brújula<br>
y la razón por la que cada día sigo adelante.</strong>`
    },
    2: {
        titulo: "Poema II",
        texto: `Cariño mío,<br><br>
<strong>Eres como un cuchillo</strong>;<br>
filosa, cortante e implacable, por un lado,<br>
pero suave, tersa y sutil por el otro.<br><br>
Mi niña, podrías <strong>sellar mis labios de sangre</strong> si quisieras;<br>
no me negaría, porque al fin y al cabo<br>
me tienes atrapado, como una sirena a su presa.<br><br>
Mi amor por ti es tan grande,<br>
que no me opondría a ser degollado por tu mano...<br>
con tal de conseguir, al menos, una caricia tuya.`
    },
    3: {
        titulo: "Poema III",
        texto: `Esa voz molesta,<br>
que habita siempre en mi cabeza<br>
y no me deja en paz.<br><br>
Entorpece mis planes,<br>
me prohíbe el fin.<br><br>
Quiero ceder, pero esa <strong>maldita</strong> voz<br>
me dicta lo contrario:<br>
me incita a la vida,<br>
a algo tan vano y frágil.<br><br>
A su lado, los cuchillos parecen de plástico;<br>
no me cortan, se deshacen al tocarme.<br><br>
<em>Esas palabras son más fuertes<br>
que cualquier acero existente.</em>`
    }
};

const modal = document.getElementById('modal');
const modalTitulo = document.getElementById('modal-titulo');
const modalTexto = document.getElementById('modal-texto');

document.querySelectorAll('.poemas-bloque').forEach(bloque => {
    bloque.addEventListener('click', () => {
        const data = poemas[bloque.dataset.poema];
        modalTitulo.textContent = data.titulo;
        modalTexto.innerHTML = data.texto;
        modal.classList.add('activo');
    });
});

document.getElementById('cerrar').addEventListener('click', () => {
    modal.classList.remove('activo');
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('activo');
});


/* Galería de fotos */
const fotos = [
    { src: 'images/array_galeria/image_1.jpeg', fecha: '14 de Febrero de 2024', mensaje: 'Nuestro segundo San valentin Juntos' },
    
];

let indiceActual = 0;

const modalGaleria = document.getElementById('modal-galeria');

function mostrarFoto(indice) {
    const foto = fotos[indice];
    document.getElementById('galeria-foto').src = foto.src;
    document.getElementById('galeria-fecha').textContent = foto.fecha;
    document.getElementById('galeria-mensaje').textContent = foto.mensaje;
    document.getElementById('galeria-contador').textContent = `${indice + 1} / ${fotos.length}`;
}

// Abrir modal
document.getElementById('galeria-trigger').addEventListener('click', () => {
    indiceActual = 0;
    mostrarFoto(indiceActual);
    modalGaleria.classList.add('activo');
});

// Flechas
document.getElementById('galeria-anterior').addEventListener('click', () => {
    indiceActual = (indiceActual - 1 + fotos.length) % fotos.length;
    mostrarFoto(indiceActual);
});

document.getElementById('galeria-siguiente').addEventListener('click', () => {
    indiceActual = (indiceActual + 1) % fotos.length;
    mostrarFoto(indiceActual);
});

// Cerrar
document.getElementById('cerrar-galeria').addEventListener('click', () => {
    modalGaleria.classList.remove('activo');
});

modalGaleria.addEventListener('click', (e) => {
    if (e.target === modalGaleria) modalGaleria.classList.remove('activo');
});

/* Modal canciones */
const modalCanciones = document.getElementById('modal-canciones');

document.getElementById('canciones-trigger').addEventListener('click', () => {
    modalCanciones.classList.add('activo');
});

document.getElementById('cerrar-canciones').addEventListener('click', () => {
    modalCanciones.classList.remove('activo');
});

modalCanciones.addEventListener('click', (e) => {
    if (e.target === modalCanciones) modalCanciones.classList.remove('activo');
});