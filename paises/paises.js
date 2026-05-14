/* 1. Detectamos el país de la URL */
const urlParams = new URLSearchParams(window.location.search);
const paisID = urlParams.get('id');

// Detectamos el usuario activo para usar su propia lista de favoritos
const usuarioActivo = localStorage.getItem('usuarioLogueado') || 'invitado';
const claveFavoritos = `favoritos_${usuarioActivo}`;

/* 2. Tu diccionario de nombres */ 
const nombresCiudades = {
    "francia": ["Torre Eiffel", "Museo del Louvre", "Mont Saint-Michel", "Niza", "Valle del Loira"],
    "italia": ["Coliseo Romano", "Canales de Venecia", "Torre de Pisa", "Florencia", "Costa Amalfitana"],
    "alemania": ["Puerta de Brandeburgo", "Castillo Neuschwanstein", "Catedral de Colonia", "Múnich", "Selva Negra"],
    "españa": ["La Sagrada Familia", "La Alhambra", "Madrid", "Sevilla", "Ibiza"],
    "japon": ["Tokio", "Monte Fuji", "Kioto", "Osaka", "Nara"],
    "mexico": ["Chichén Itzá", "Cancún", "Bellas Artes", "Cabo San Lucas", "El callejon del beso"],
    "usa": ["Estatua de la Libertad", "Gran Cañón", "Times Square", "Golden Gate", "Las Vegas"],
    "grecia": ["Partenón", "Santorini", "Mykonos", "Meteora", "Rodas"],
    "reinounido": ["Big Ben", "Stonehenge", "London Eye", "Castillo de Edimburgo", "Tower Bridge"],
    "canada": ["Cataratas del Niágara", "Toronto", "Banff", "Vancouver", "Quebec"],
    "china": ["Gran Muralla", "Ciudad Prohibida", "Guerreros de Terracota", "Shanghái", "Río Li"],
    "dubai": ["Burj Khalifa", "Palm Jumeirah", "Dubai Marina", "Desierto de Safari", "Burj Al Arab"],
    "turquia": ["Santa Sofía", "Capadocia", "Pamukkale", "Efeso", "Gran Bazar"],
    "tailandia": ["Gran Palacio", "Phi Phi Islands", "Chiang Mai", "Phuket", "Ayutthaya"],
    "suiza": ["Los Alpes", "Zúrich", "Ginebra", "Lucerna", "Matterhorn"],
    "portugal": ["Torre de Belém", "Sintra", "Oporto", "Algarve", "Lisboa"],
    "noruega": ["Fiordos", "Oslo", "Bergen", "Tromsø", "Islas Lofoten"],
    "austria": ["Viena", "Salzburgo", "Hallstatt", "Palacio Schönbrunn", "Innsbruck"],
    "islandia": ["Laguna Azul", "Cascada Skógafoss", "Reikiavik", "Auroras Boreales", "Círculo Dorado"],
    "malasia": ["Torres Petronas", "Batu Caves", "Langkawi", "Malaca", "George Town"]
};

const infoDetallada = {
    // ALEMANIA
    "Puerta de Brandeburgo": { pais: "alemania", desc: "El símbolo de la unidad alemana y el monumento más famoso de Berlín.", precio: "Acceso Gratuito" },
    "Castillo Neuschwanstein": { pais: "alemania", desc: "El castillo que inspiró a Disney en medio de los Alpes bávaros.", precio: "$450-$550 MXN" },
    "Catedral de Colonia": { pais: "alemania", desc: "Una obra maestra gótica que sobrevivió a la historia.", precio: "Acceso Gratuito" },
    "Múnich": { pais: "alemania", desc: "Cuna del Oktoberfest, con hermosas plazas y jardines de cerveza.", precio: "$1,500-$3,000 MXN" },
    "Selva Negra": { pais: "alemania", desc: "Bosques densos, cascadas y los famosos relojes de cuco alemanes.", precio: "$1,200-$2,500 MXN" },
    // AUSTRIA
    "Viena": { pais: "austria", desc: "Camina por las calles imperiales de la capital de la música clásica.", precio: "$1,800-$3,200 MXN" },
    "Salzburgo": { pais: "austria", desc: "La ciudad natal de Mozart, rodeada de fortalezas y jardines.", precio: "$1,500-$2,800 MXN" },
    "Hallstatt": { pais: "austria", desc: "El pueblo a la orilla del lago más fotografiado del mundo.", precio: "$1,000-$2,000 MXN" },
    "Palacio Schönbrunn": { pais: "austria", desc: "La antigua residencia de verano de los Habsburgo.", precio: "$450-$750 MXN" },
    "Innsbruck": { pais: "austria", desc: "La capital de los Alpes, ideal para deportes de invierno y vistas.", precio: "$1,600-$3,100 MXN" },
    // CANADÁ
    "Cataratas del Niágara": { pais: "canada", desc: "Siente la fuerza del agua en la frontera entre Canadá y USA.", precio: "$450-$900 MXN" },
    "Toronto": { pais: "canada", desc: "Una metrópolis vibrante conocida por su icónica Torre CN.", precio: "$2,000-$4,500 MXN" },
    "Banff": { pais: "canada", desc: "Naturaleza pura en las Montañas Rocosas con lagos color turquesa.", precio: "$1,500-$3,500 MXN" },
    "Vancouver": { pais: "canada", desc: "La mezcla perfecta entre océano, montañas y vida urbana.", precio: "$2,200-$4,800 MXN" },
    "Quebec": { pais: "canada", desc: "El encanto europeo en América con calles de piedra y castillos.", precio: "$1,400-$2,900 MXN" },
    // CHINA
    "Gran Muralla": { pais: "china", desc: "Recorre una de las mayores hazañas de la ingeniería antigua.", precio: "$200-$450 MXN" },
    "Ciudad Prohibida": { pais: "china", desc: "El palacio imperial mejor conservado de China en Pekín.", precio: "$180-$350 MXN" },
    "Guerreros de Terracota": { pais: "china", desc: "Miles de soldados de arcilla de tamaño real enterrados.", precio: "$350-$500 MXN" },
    "Shanghái": { pais: "china", desc: "El futuro de China con rascacielos iluminados y el Bund.", precio: "$1,800-$4,000 MXN" },
    "Río Li": { pais: "china", desc: "Navega entre montañas kársticas que parecen de otro planeta.", precio: "$1,200-$2,200 MXN" },
    // DUBAI
    "Burj Khalifa": { pais: "dubai", desc: "Toca las nubes en el edificio más alto del mundo.", precio: "$1,200-$2,800 MXN" },
    "Palm Jumeirah": { pais: "dubai", desc: "Una isla artificial en forma de palmera con hoteles de lujo.", precio: "$2,500-$6,000 MXN" },
    "Dubai Marina": { pais: "dubai", desc: "Un distrito canalizado con yates y rascacielos impresionantes.", precio: "$1,500-$3,500 MXN" },
    "Desierto de Safari": { pais: "dubai", desc: "Aventura en dunas con cena tradicional bajo las estrellas.", precio: "$1,800-$3,000 MXN" },
    "Burj Al Arab": { pais: "dubai", desc: "El hotel más lujoso del mundo con su icónica forma de vela.", precio: "$3,500-$8,000 MXN" },
    // ESPAÑA
    "La Sagrada Familia": { pais: "españa", desc: "Admira la obra maestra inacabada de Gaudí en Barcelona.", precio: "$650-$900 MXN" },
    "La Alhambra": { pais: "españa", desc: "Un majestuoso complejo de palacios y jardines árabes en Granada.", precio: "$450-$700 MXN" },
    "Madrid": { pais: "españa", desc: "Capital de la cultura, el arte y la vida nocturna española.", precio: "$1,500-$3,000 MXN" },
    "Sevilla": { pais: "españa", desc: "Donde el flamenco y la historia andaluza cobran vida.", precio: "$1,200-$2,400 MXN" },
    "Ibiza": { pais: "españa", desc: "Playas de cristal y la mejor vida nocturna del Mediterráneo.", precio: "$2,500-$6,000 MXN" },
    // FRANCIA
    "Torre Eiffel": { pais: "francia", desc: "Sube al icono más famoso de París y disfruta de una vista 360°.", precio: "$800-$1,700 MXN" },
    "Museo del Louvre": { pais: "francia", desc: "Explora la colección de arte más grande del mundo.", precio: "$700 MXN" },
    "Mont Saint-Michel": { pais: "francia", desc: "Una abadía medieval construida sobre una isla rocosa.", precio: "$450-$600 MXN" },
    "Niza": { pais: "francia", desc: "Disfruta del sol y el mar en la glamurosa Costa Azul.", precio: "$1,500-$2,800 MXN" },
    "Valle del Loira": { pais: "francia", desc: "Recorre los castillos renacentistas más hermosos de Francia.", precio: "$1,200-$2,500 MXN" },
    // GRECIA
    "Partenón": { pais: "grecia", desc: "El templo antiguo más importante de la civilización griega.", precio: "$450-$600 MXN" },
    "Santorini": { pais: "grecia", desc: "Disfruta de los atardeceres más hermosos del mundo frente al mar.", precio: "$2,500-$5,000 MXN" },
    "Mykonos": { pais: "grecia", desc: "Famosa por sus molinos de viento, playas y fiestas.", precio: "$2,000-$4,500 MXN" },
    "Meteora": { pais: "grecia", desc: "Monasterios construidos sobre pilares de roca natural.", precio: "$150-$300 MXN" },
    "Rodas": { pais: "grecia", desc: "Una ciudad medieval amurallada perfectamente conservada.", precio: "$800-$1,500 MXN" },
    // ISLANDIA
    "Laguna Azul": { pais: "islandia", desc: "Relájate en aguas termales de color turquesa rodeadas de lava.", precio: "$1,800-$2,500 MXN" },
    "Cascada Skógafoss": { pais: "islandia", desc: "Una de las cascadas más grandes y bellas de Islandia.", precio: "Acceso Gratuito" },
    "Reikiavik": { pais: "islandia", desc: "La capital más septentrional, llena de arte y diseño nórdico.", precio: "$2,000-$4,500 MXN" },
    "Auroras Boreales": { pais: "islandia", desc: "Caza el espectáculo de luces más impresionante del cielo.", precio: "$2,500-$4,500 MXN" },
    "Círculo Dorado": { pais: "islandia", desc: "Ruta de geysers, cascadas y fallas tectónicas.", precio: "$1,800-$3,000 MXN" },
    // ITALIA
    "Coliseo Romano": { pais: "italia", desc: "Revive la historia de los gladiadores en el anfiteatro más grande.", precio: "$400-$600 MXN" },
    "Canales de Venecia": { pais: "italia", desc: "Navega en góndola por la ciudad flotante más romántica.", precio: "$1,800-$2,500 MXN" },
    "Torre de Pisa": { pais: "italia", desc: "La famosa torre inclinada del conjunto monumental de Pisa.", precio: "$450-$550 MXN" },
    "Florencia": { pais: "italia", desc: "La cuna del Renacimiento con arte en cada esquina.", precio: "$1,200-$2,200 MXN" },
    "Costa Amalfitana": { pais: "italia", desc: "Pueblos coloridos suspendidos sobre acantilados italianos.", precio: "$2,000-$4,000 MXN" },
    // JAPÓN
    "Tokio": { pais: "japon", desc: "Mezcla de tecnología futurista y tradición milenaria.", precio: "$1,800-$3,500 MXN" },
    "Monte Fuji": { pais: "japon", desc: "Admira la montaña sagrada de Japón desde los cinco lagos.", precio: "$800-$1,500 MXN" },
    "Kioto": { pais: "japon", desc: "Templos dorados y jardines zen en el corazón tradicional.", precio: "$1,200-$2,500 MXN" },
    "Osaka": { pais: "japon", desc: "Explora la capital de la comida callejera y el Castillo de Osaka.", precio: "$1,500-$3,000 MXN" },
    "Nara": { pais: "japon", desc: "Camina entre ciervos sagrados y templos gigantescos.", precio: "$300-$500 MXN" },
    // MALASIA
    "Torres Petronas": { pais: "malasia", desc: "Cruza el puente colgante entre las icónicas torres de Kuala Lumpur.", precio: "$450-$600 MXN" },
    "Batu Caves": { pais: "malasia", desc: "Escaleras coloridas que llevan a templos hindúes dentro de cuevas.", precio: "Acceso Gratuito" },
    "Langkawi": { pais: "malasia", desc: "Un archipiélago de 99 islas con playas y naturaleza exuberante.", precio: "$1,500-$3,200 MXN" },
    "Malaca": { pais: "malasia", desc: "Ciudad histórica con rica herencia colonial portuguesa y holandesa.", precio: "$1,000-$1,800 MXN" },
    "George Town": { pais: "malasia", desc: "Famosa por su arte callejero y su increíble gastronomía fusión.", precio: "$900-$1,600 MXN" },
    // MÉXICO
    "Chichén Itzá": { pais: "mexico", desc: "Visita la pirámide de Kukulcán, maravilla del mundo moderno.", precio: "$300-$650 MXN" },
    "Cancún": { pais: "mexico", desc: "Playas de arena blanca y el mejor ambiente del Caribe Mexicano.", precio: "$1,500-$4,000 MXN" },
    "Bellas Artes": { pais: "mexico", desc: "Joya arquitectónica y centro de las artes en CDMX.", precio: "$90 MXN" },
    "Cabo San Lucas": { pais: "mexico", desc: "Aventuras marinas y descanso en el Arco de Cabo San Lucas.", precio: "$2,500-$5,000 MXN" },
    "El callejon del beso": { pais: "mexico", desc: "Tradición y romance en los callejones de Guanajuato.", precio: "Acceso Gratuito" },
    // NORUEGA
    "Fiordos": { pais: "noruega", desc: "Navega entre montañas gigantescas que emergen del mar.", precio: "$1,800-$3,500 MXN" },
    "Oslo": { pais: "noruega", desc: "Capital moderna con museos vikingos y diseño vanguardista.", precio: "$2,200-$4,500 MXN" },
    "Bergen": { pais: "noruega", desc: "Puerta de entrada a los fiordos con su histórico muelle Bryggen.", precio: "$1,800-$3,200 MXN" },
    "Tromsø": { pais: "noruega", desc: "El mejor lugar en Noruega para ver Auroras y el sol de medianoche.", precio: "$2,500-$5,000 MXN" },
    "Islas Lofoten": { pais: "noruega", desc: "Pueblos pesqueros rojos bajo montañas escarpadas.", precio: "$2,800-$5,500 MXN" },
    // PORTUGAL
    "Torre de Belém": { pais: "portugal", desc: "Icono de la era de los descubrimientos en Lisboa.", precio: "$180-$250 MXN" },
    "Sintra": { pais: "portugal", desc: "Palacios de cuentos de hadas rodeados de colinas brumosas.", precio: "$450-$800 MXN" },
    "Oporto": { pais: "portugal", desc: "Famosa por sus puentes, vino y azulejos azules.", precio: "$1,300-$2,600 MXN" },
    "Algarve": { pais: "portugal", desc: "Las playas y cuevas marinas más espectaculares de Europa.", precio: "$1,500-$3,500 MXN" },
    "Lisboa": { pais: "portugal", desc: "La ciudad de las siete colinas con barrios históricos y tranvías.", precio: "$1,400-$2,800 MXN" },
    // REINO UNIDO
    "Big Ben": { pais: "reinounido", desc: "Escucha las campanadas del reloj más famoso del mundo.", precio: "$600-$800 MXN" },
    "Stonehenge": { pais: "reinounido", desc: "Descubre el misterio de este monumento megalítico antiguo.", precio: "$550-$750 MXN" },
    "London Eye": { pais: "reinounido", desc: "Observa todo Londres desde esta rueda de la fortuna gigante.", precio: "$750-$1,000 MXN" },
    "Castillo de Edimburgo": { pais: "reinounido", desc: "Fortaleza histórica que domina la capital de Escocia.", precio: "$450-$650 MXN" },
    "Tower Bridge": { pais: "reinounido", desc: "El puente levadizo más famoso de Londres sobre el Támesis.", precio: "$300-$450 MXN" },
    // SUIZA
    "Los Alpes": { pais: "suiza", desc: "Sube a las cimas de Europa para una vista inolvidable de nieve.", precio: "$1,500-$3,000 MXN" },
    "Zúrich": { pais: "suiza", desc: "Metrópolis global conocida como el centro financiero de Suiza.", precio: "$2,500-$5,000 MXN" },
    "Ginebra": { pais: "suiza", desc: "Sede de la ONU con su espectacular fuente Jet d'Eau.", precio: "$2,200-$4,800 MXN" },
    "Lucerna": { pais: "suiza", desc: "Ciudad medieval junto al lago con su famoso puente de madera.", precio: "$1,800-$3,600 MXN" },
    "Matterhorn": { pais: "suiza", desc: "La montaña más icónica de Suiza con su forma piramidal.", precio: "$2,000-$4,200 MXN" },
    // TAILANDIA
    "Gran Palacio": { pais: "tailandia", desc: "El complejo de templos más sagrado y bello de Bangkok.", precio: "$350-$500 MXN" },
    "Phi Phi Islands": { pais: "tailandia", desc: "Navega por aguas cristalinas e islas de película.", precio: "$1,200-$2,400 MXN" },
    "Chiang Mai": { pais: "tailandia", desc: "Templos antiguos y santuarios de elefantes en el norte.", precio: "$800-$2,000 MXN" },
    "Phuket": { pais: "tailandia", desc: "La isla más grande con playas exóticas y gran vida nocturna.", precio: "$1,200-$3,000 MXN" },
    "Ayutthaya": { pais: "tailandia", desc: "Explora las impresionantes ruinas del antiguo Reino de Siam.", precio: "$150-$300 MXN" },
    // TURQUÍA
    "Santa Sofía": { pais: "turquia", desc: "Maravíllate con la arquitectura bizantina en Estambul.", precio: "$650-$900 MXN" },
    "Capadocia": { pais: "turquia", desc: "Vuelo en globo sobre paisajes lunares y ciudades subterráneas.", precio: "$3,500-$6,000 MXN" },
    "Pamukkale": { pais: "turquia", desc: "Piscinas termales de travertino blanco que parecen de algodón.", precio: "$450-$650 MXN" },
    "Efeso": { pais: "turquia", desc: "Una de las ciudades antiguas mejor conservadas del Mediterráneo.", precio: "$550-$800 MXN" },
    "Gran Bazar": { pais: "turquia", desc: "Uno de los mercados cubiertos más grandes y antiguos del mundo.", precio: "Acceso Gratuito" },
    // USA
    "Estatua de la Libertad": { pais: "usa", desc: "El símbolo de la libertad en el puerto de Nueva York.", precio: "$550-$850 MXN" },
    "Gran Cañón": { pais: "usa", desc: "Explora la inmensidad de una de las maravillas naturales.", precio: "$700-$1,200 MXN" },
    "Times Square": { pais: "usa", desc: "El corazón brillante y lleno de energía de Nueva York.", precio: "Acceso Gratuito" },
    "Golden Gate": { pais: "usa", desc: "El puente colgante más fotografiado de San Francisco.", precio: "Acceso Gratuito" },
    "Las Vegas": { pais: "usa", desc: "La capital mundial del juego y el entretenimiento.", precio: "$3,000-$7,500 MXN" }
};

/* 4. Logica de generacion del collage e interaccion */
if (paisID && nombresCiudades[paisID]) {
    document.getElementById('nombre-pais').innerText = "Explora " + paisID.toUpperCase();
    const contenedor = document.getElementById('collage-destinos');
    const ciudades = nombresCiudades[paisID];

    // Recuperamos favoritos actualizados con la clave del usuario
    let misFavoritos = JSON.parse(localStorage.getItem(claveFavoritos)) || [];

    for (let i = 0; i < 5; i++) {
        const esGrande = (i === 0) ? 'grande' : '';
        const numeroFoto = i + 1;
        const nombreCiudad = ciudades[i];
        
        // Verificamos si es favorito
        const esFavorito = misFavoritos.includes(nombreCiudad);
        
        // ESTRELLA BLANCA
        const estrellaHTML = esFavorito ? `
            <div class="indicador-favorito" 
                 onclick="quitarFavoritoDirecto(event, '${nombreCiudad}')"
                 style="position: absolute; top: 15px; right: 15px; background: rgba(0,0,0,0.6); width: 35px; height: 35px; border-radius: 50%; display: flex; justify-content: center; align-items: center; z-index: 20; border: 1.5px solid white; cursor: pointer;">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
            </div>` : '';

        const nuevoItem = document.createElement('div');
        nuevoItem.className = `item-collage ${esGrande}`;
        nuevoItem.style.position = "relative"; 
        
        nuevoItem.innerHTML = `
            <img src="../Imagenes/${paisID}/${numeroFoto}.jpg" alt="${nombreCiudad}">
            ${estrellaHTML}
            <div class="etiqueta">${nombreCiudad}</div>
        `;

        nuevoItem.onclick = function() {
            abrirModal(nombreCiudad);
        };

        contenedor.appendChild(nuevoItem);
    }
}

// Para quitar favorito desde la estrella blanca
function quitarFavoritoDirecto(event, nombre) {
    event.stopPropagation(); // Evita abrir el modal
    
    let favoritos = JSON.parse(localStorage.getItem(claveFavoritos)) || [];
    const index = favoritos.indexOf(nombre);
    
    if (index > -1) {
        favoritos.splice(index, 1);
        localStorage.setItem(claveFavoritos, JSON.stringify(favoritos));
        
        // Mostramos el mensaje antes de recargar
        mostrarToast(`❌ ${nombre} eliminado`, true);

        // Recargamos despues de un breve momento para que se vea el mensaje
        setTimeout(() => {
            location.reload();
        }, 2000);
    }
}

/* 5. Funciones del Modal y Favoritos */
// 6. Recuperar la lista de favoritos globalmente con la clave del usuario
let misFavoritosGlobal = JSON.parse(localStorage.getItem(claveFavoritos)) || [];

function abrirModal(nombre) {
    const modal = document.getElementById('modalDetalle');
    const datos = infoDetallada[nombre] || { desc: "...", precio: "..." };

    document.getElementById('modal-titulo').innerText = nombre;
    document.getElementById('modal-desc').innerText = datos.desc;
    document.getElementById('modal-precio').innerText = datos.precio;

    // Configurar el boton de favoritos
    const btnFav = document.getElementById('btn-favorito');
    
    // Cambiar el texto si ya es favorito
    if (misFavoritosGlobal.includes(nombre)) {
        btnFav.innerText = "⭐ Quitar de Favoritos";
        btnFav.style.backgroundColor = "#ff4d4d"; // Rojo si ya esta
        btnFav.style.color = "white";
    } else {
        btnFav.innerText = "⭐ Agregar a Favoritos";
        btnFav.style.backgroundColor = "white"; // Blanco normal
        btnFav.style.color = "black";
    }

    // Evento al hacer clic en "Agregar a Favoritos"
    btnFav.onclick = function() {
        gestionarFavorito(nombre);
    };

    modal.style.display = "flex";
}

function gestionarFavorito(nombre) {
    const index = misFavoritosGlobal.indexOf(nombre);
    let mensajeTexto = "";
    let esEliminado = false;

    if (index > -1) {
        misFavoritosGlobal.splice(index, 1);
        mensajeTexto = `❌ ${nombre} Eliminado de Favoritos`;
        esEliminado = true;
    } else {
        misFavoritosGlobal.push(nombre);
        mensajeTexto = `⭐ ${nombre} Guardado en Favoritos`;
        esEliminado = false;
    }

    // 1. Guardar en localStorage con la clave del usuario
    localStorage.setItem(claveFavoritos, JSON.stringify(misFavoritosGlobal));
    
    // 2. Cerrar el modal para que se vea el Toast
    document.getElementById('modalDetalle').style.display = "none";

    // 3. MOSTRAR LA NOTIFICACIÓN
    mostrarToast(mensajeTexto, esEliminado);

    setTimeout(() => {
        location.reload();
    }, 2000);
}

// Cerrar modal al hacer clic en la X o fuera de la caja
document.querySelector('.cerrar-modal').onclick = () => document.getElementById('modalDetalle').style.display = "none";
window.onclick = (e) => { if(e.target.id == "modalDetalle") e.target.style.display = "none"; };

function mostrarToast(texto, eliminar) {
    const container = document.getElementById('notificacion-container');
    const toast = document.createElement('div');
    
    toast.className = 'toast-personalizado';
    if (eliminar) toast.classList.add('toast-eliminar');
    
    toast.innerHTML = texto;
    container.appendChild(toast);

    // Eliminar el elemento del DOM despues de 3 segundos
    setTimeout(() => {
        toast.remove();
    }, 2000);
}