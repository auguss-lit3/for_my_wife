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