
/* Pantalla de bienvenida */
const bienvenida = document.getElementById('bienvenida');
const bienvenidaVideo = document.getElementById('bienvenida-video');
const btnVolumen = document.getElementById('bienvenida-volumen');
const btnSkip = document.getElementById('bienvenida-skip');

function cerrarBienvenida() {
    bienvenida.classList.add('fadeout');
    setTimeout(() => bienvenida.remove(), 1200);
}

bienvenidaVideo.addEventListener('canplaythrough', () => {
    bienvenidaVideo.play().catch(() => cerrarBienvenida());
}, { once: true });

bienvenidaVideo.addEventListener('ended', () => cerrarBienvenida());

// Skip
btnSkip.addEventListener('click', () => cerrarBienvenida());

// Volumen — toggle entre muted y con sonido
btnVolumen.addEventListener('click', () => {
    bienvenidaVideo.muted = !bienvenidaVideo.muted;
    btnVolumen.textContent = bienvenidaVideo.muted ? '🔇' : '🔊';
});

// Fallback por si el video no termina
setTimeout(() => {
    if (document.getElementById('bienvenida')) cerrarBienvenida();
}, 70000);




/* Header */
const header = document.querySelector('header');
const menuToggle = document.getElementById('menu-toggle');
const menuNav = document.getElementById('menu-nav');

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

/* Hamburguesa — solo actúa en mobile */
menuToggle.addEventListener('click', () => {
    menuNav.classList.toggle('activo');
    menuToggle.textContent = menuNav.classList.contains('activo') ? '✕' : '☰';
});

/* Cerrar menú al hacer click en un link */
menuNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        menuNav.classList.remove('activo');
        menuToggle.textContent = '☰';
    });
});


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
const textoRazones = `Es una persona hermosa en todos los sentidos, amable, valiente, adoro su pelo marroncito hermoso, su cara tan linda, sus cachetes tan tiernos, su risa que ella dice que aveces es molesta pero que a mi me encanta, sus chistes boludos, sus sueños, las historias que crea en su cerebro tan hermoso, sus ojos color cafe que al mirarme me dan ganas de vivir, sus palabras de aliento que me dan la fuerza necesaria para seguir adelante sin importar que, su cuerpo tan sexy que me prende como si fuera la primera vez, mi amor por ella que renace cada dia, nuestro futuro el cual es bastante bonito de imaginar, sus gustos por las cosas que aunque diferamos aveces no es impedimento para amarla mas y mas, en fin, nunca se me van a acabar las razones para amarte mi amor, mi esposa, mi mujer ♥♥♥`;

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
    { src: 'images/array_galeria/image_initial.jpeg', fecha: '3 de Octubre de 2022', mensaje: 'Empezando nuestra historia como amigos cercanos' },
    { src: 'images/array_galeria/image_1.jpeg', fecha: '29 de Marzo de 2023', mensaje: 'Aun amigos pero enamorados uno del otro' },
    { src: 'images/array_galeria/image_2.jpeg', fecha: '3 de Julio de 2023', mensaje: 'Esa noche que empezamos a escribir nuestra historia definitivamente ♥♥' },
    { src: 'images/array_galeria/image_3.jpeg', fecha: '21 de Agosto de 2023', mensaje: 'Nuestra primera cita oficial, pasandola en la plaza de Escobar' },
    { src: 'images/array_galeria/image_4.jpeg', fecha: '19 de Septiembre de 2023', mensaje: 'Volviendo cansados de un dia de estudio' },
    { src: 'images/array_galeria/image_5.jpeg', fecha: '27 de Septiembre de 2023', mensaje: 'Boludeando despues de salir de estudiar' },
    { src: 'images/array_galeria/image_6.jpeg', fecha: '4 de Octubre de 2023', mensaje: 'Hermosa tarde paseando cerca de mi casa' },
    { src: 'images/array_galeria/image_7.jpeg', fecha: '4 de Noviembre de 2023', mensaje: 'Celebrando nuestros 4 meses paseando por Pilar' },
    { src: 'images/array_galeria/image_8.jpeg', fecha: '3 de Enero de 2024', mensaje: 'Celebrando nuestros 6 meses en Escobar' },
    { src: 'images/array_galeria/image_9.jpeg', fecha: '21 de Enero de 2024', mensaje: 'Festejando tus 17 en la casa de un amigo' },
    { src: 'images/array_galeria/image_10.jpeg', fecha: '14 de Febrero de 2024', mensaje: 'Nuestro primer San valentin juntos ♥♥' },
    { src: 'images/array_galeria/image_11.jpeg', fecha: '31 de Mayo de 2024', mensaje: 'Boludeando en hora libre' },
    { src: 'images/array_galeria/image_12.jpeg', fecha: '17 de Junio de 2024', mensaje: 'Yendo a ver Intensamente 2 despues de un Starbucks' },
    { src: 'images/array_galeria/image_13.jpeg', fecha: '3 de Julio de 2024', mensaje: 'Nuestro compromiso ♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥' },
    { src: 'images/array_galeria/image_14.jpeg', fecha: '16 de Julio de 2024', mensaje: 'Salida a un evento de Escobar' },
    { src: 'images/array_galeria/image_15.jpeg', fecha: '4 de Octubre de 2024', mensaje: 'Salida a la fiesta de la flor en Escobar celebrando nuestro mesiversario n°15' },
    { src: 'images/array_galeria/image_16.jpeg', fecha: '5 de Febrero de 2025', mensaje: 'Esperando el colectivo para que me vuelva luego de pasar nuestro mesiversario n°19' },
    { src: 'images/array_galeria/image_17.jpeg', fecha: '14 de Febrero de 2025', mensaje: 'Nuestro segundo San valentin juntos ♥♥♥' },
    { src: 'images/array_galeria/image_18.jpeg', fecha: '27 de Febrero de 2025', mensaje: 'Cafe luego de discusion jeje' },
    { src: 'images/array_galeria/image_19.jpeg', fecha: '24 de Marzo de 2025', mensaje: 'Fotitos luego de una juntada con amigos en la pileta' },
    { src: 'images/array_galeria/image_20.jpeg', fecha: '3 de Julio de 2025', mensaje: 'Festejando nuestro 2do aniversario y preparandonos pa luego ir a la escuela ♥♥♥' },
    { src: 'images/array_galeria/image_21.jpeg', fecha: '26 de Julio de 2025', mensaje: 'Tomando un cafecito en el Mcdonalds luego de pasar el dia en Escobar' },
    { src: 'images/array_galeria/image_22.jpeg', fecha: '31 de Agosto de 2025', mensaje: 'Festejando el cumple de un amigo' },
    { src: 'images/array_galeria/image_23.jpeg', fecha: '15 de Diciembre de 2025', mensaje: 'Terminando una etapa, graduandonos juntos ♥♥♥♥♥♥♥♥♥' },
    { src: 'images/array_galeria/image_24.jpeg', fecha: '11 de Enero de 2026', mensaje: 'Yendo a pescar con tu familia al Parana' },
    { src: 'images/array_galeria/image_25.jpeg', fecha: '25 de Enero de 2026', mensaje: 'Conociendo a toda mi familia en el cumpleaños de un familiar' },
    { src: 'images/array_galeria/image_26.jpeg', fecha: '24 de Mayo de 2026', mensaje: 'Tomando un cafecito en una cafeteria de arte por Escobar' },
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


/* Modal promesa */
const modalPromesa = document.getElementById('modal-promesa');
const promesaTexto = `Prometo dar todo de mi en esta relacion, mi paciencia, mi tiempo, mi esfuerzo, mi amor, mi comprension, mi dulzura, mis miedos, mis inseguridades, mis deseos, mi futuro, mi vida entera en ella, ya que lo que mas deseo es que lo nuestro funcione y sea lo mas bonito del universo, no porque quiera que otras personas lo vean (me vale una mierda la opinion de los otros), si no porque te QUIERO, te AMO, te ADORO, te DESEO, te NECESITO, por si no te quedo claro luego de hacerte una pagina web entera.`;

let intervaloPromesa = null;

function typewriterPromesa(elemento, texto) {
    if (intervaloPromesa) clearInterval(intervaloPromesa);
    elemento.innerHTML = '';
    let i = 0;

    intervaloPromesa = setInterval(() => {
        const progreso = i / texto.length;
        const colorFinal = interpolarColor(progreso);
        const char = texto[i];

        if (char === '\n') {
            elemento.appendChild(document.createElement('br'));
        } else {
            const span = document.createElement('span');
            span.classList.add('letra-typewriter');
            span.textContent = char;
            span.style.color = '#f0a0c0';
            elemento.appendChild(span);
            requestAnimationFrame(() => { span.style.color = colorFinal; });
        }

        i++;
        if (i >= texto.length) clearInterval(intervaloPromesa);
    }, 30);
}

document.getElementById('promesa-trigger').addEventListener('click', () => {
    // resetear estado al abrir
    document.getElementById('promesa-input-contenedor').style.display = 'flex';
    document.getElementById('promesa-texto-contenedor').style.display = 'none';
    document.getElementById('promesa-error').textContent = '';
    document.getElementById('promesa-fecha').value = '';
    modalPromesa.classList.add('activo');
});

document.getElementById('promesa-confirmar').addEventListener('click', () => {
    const fechaIngresada = document.getElementById('promesa-fecha').value;
    // el input date devuelve formato YYYY-MM-DD
    const esAniversario = fechaIngresada === '2023-07-03';

    if (esAniversario) {
        document.getElementById('promesa-input-contenedor').style.display = 'none';
        document.getElementById('promesa-texto-contenedor').style.display = 'block';
        const elemento = document.getElementById('promesa-texto');
        typewriterPromesa(elemento, promesaTexto);
    } else {
        document.getElementById('promesa-error').textContent = 'Esa no es la fecha correcta...';
    }
});

document.getElementById('cerrar-promesa').addEventListener('click', () => {
    modalPromesa.classList.remove('activo');
    if (intervaloPromesa) clearInterval(intervaloPromesa);
});

modalPromesa.addEventListener('click', (e) => {
    if (e.target === modalPromesa) {
        modalPromesa.classList.remove('activo');
        if (intervaloPromesa) clearInterval(intervaloPromesa);
    }
});

/* Lugares importantes */
const lugares = [
    {
        nombre: "Donde nos conocimos",
        descripcion: "Aunque odio este lugar en cierta parte, es donde conoci al amor de mi vida y el caminar por toda la escuela me llena de nostalgia de nuestros momentos juntos, fueron 7 años pero pasaron volando estando junto a esa personita que me acompañaba en todo",
        foto: "images/images_places/escuela.jpg",
        mapa: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3293.848502682597!2d-58.80134562427054!3d-34.35433357304475!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bb61b8df946a1f%3A0xe412a1b571165a31!2sEscuela%20de%20Educaci%C3%B3n%20Secundaria%20T%C3%A9cnica%20N.1!5e0!3m2!1ses-419!2sar!4v1782953564107!5m2!1ses-419!2sar"
    },
    {
        nombre: "Donde comenzo la magia",
        descripcion: "La verdad que esa noche en ese momento fue magica, inolvidable y maravilloso, cada vez que recuerdo como se sentian tus labios con los mios y mi corazon en ese momento es mi porque peleo por nuestra relacion",
        foto: "images/images_places/reloj.jpg",
        mapa: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d205.86372280557723!2d-58.79713274994711!3d-34.35506997294639!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bb61df281acf5b%3A0x3d19b1612e99ca37!2sMonumento%20Reloj%20Torre!5e0!3m2!1ses-419!2sar!4v1782954393533!5m2!1ses-419!2sar"
    },
    {
        nombre: "Nuestro lugar de amor",
        descripcion: "Recuerdo cuando empezamos a salir, siempre nos quedabamos un rato largo comiendonos la boca era jodidamente adictivo y no podiamos parar, se sentia demasiado bien comerte la boca por tanto rato, hasta dejabamos pasar colectivos simplemente para pasar un rato mas juntos",
        foto: "images/images_places/lugar_de_amor.png",
        mapa: "https://www.google.com/maps/embed?pb=!4v1782955056889!6m8!1m7!1s_i-EbUnyQBzZJWVMzpFNog!2m2!1d-34.35484974210521!2d-58.79668907499414!3f309.63512016487607!4f-4.5349701526562!5f2.3381023277647857"
    },
    {
        nombre: "Donde consolidamos nuestro amor",
        descripcion: "Lugar donde tuvimos nuestro compromiso, ficticio en materia pero real en amor, algunos diran que fue rapido, al fin y al cabo fue en nuestro primer aniversario, pero eso me da igual, nunca me arrepentire de eso porque lo nuestro es verdadero y no necesito que pasen años para estar seguro, dado el caso que desde el momento que nos besamos lo supe",
        foto: "images/images_places/casamiento.png",
        mapa: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d411.74260823039367!2d-58.79794252983895!3d-34.35198305163102!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bb61b965278d03%3A0xd69f7c6cf5c51b2c!2sPlaza%20Brigadier%20General%20Juan%20Manuel%20de%20Rosas!5e0!3m2!1ses-419!2sar!4v1782958485786!5m2!1ses-419!2sar"
    },
    {
        nombre: "Simple pero rico y hermoso",
        descripcion: "La verdad es que extraño esas noches que usabamos nuestra poca plata para darnos un gustito de vez en cuando, un sanguche con unas salsitas o un pancho bien rico, talvez no se piense como la gran cosa pero, para mi es un recuerdo hermoso.",
        foto: "images/images_places/comida.png",
        mapa: "https://www.google.com/maps/embed?pb=!4v1782959483474!6m8!1m7!1sDlcXTqFlAfZ_ILffADq2RA!2m2!1d-34.35492849087736!2d-58.79659996332921!3f299.4469602901621!4f-1.1973292339899615!5f3.325193203789971"
    }
    // duplicá este objeto para agregar más lugares
];

const modalLugares = document.getElementById('modal-lugares');
const modalLugarDetalle = document.getElementById('modal-lugar-detalle');

// Abrir grilla
document.getElementById('lugares-trigger').addEventListener('click', () => {
    modalLugares.classList.add('activo');
});

// Cerrar grilla
document.getElementById('cerrar-lugares').addEventListener('click', () => {
    modalLugares.classList.remove('activo');
});

modalLugares.addEventListener('click', (e) => {
    if (e.target === modalLugares) modalLugares.classList.remove('activo');
});

// Abrir detalle al clickear card
document.querySelectorAll('.lugar-card').forEach(card => {
    card.addEventListener('click', () => {
        const lugar = lugares[card.dataset.lugar];

        document.getElementById('lugar-titulo').textContent = lugar.nombre;
        document.getElementById('lugar-descripcion-modal').textContent = lugar.descripcion;
        document.getElementById('lugar-foto-modal').src = lugar.foto;
        document.getElementById('lugar-mapa').src = lugar.mapa;

        modalLugarDetalle.classList.add('activo');
    });
});

// Cerrar detalle
document.getElementById('cerrar-lugar-detalle').addEventListener('click', () => {
    modalLugarDetalle.classList.remove('activo');
    document.getElementById('lugar-mapa').src = '';
});

modalLugarDetalle.addEventListener('click', (e) => {
    if (e.target === modalLugarDetalle) {
        modalLugarDetalle.classList.remove('activo');
        document.getElementById('lugar-mapa').src = '';
    }
});