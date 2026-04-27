/* Detectamos el país de la URL */
const urlParams = new URLSearchParams(window.location.search);
const paisID = urlParams.get('id');

/* Diccionario de nombres por país */
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

if (paisID && nombresCiudades[paisID]) {
    document.getElementById('nombre-pais').innerText = "Explora " + paisID.toUpperCase();
    const contenedor = document.getElementById('collage-destinos');
    const ciudades = nombresCiudades[paisID];

    /* Generamos las 5 fotos con sus nombres reales */
    for (let i = 0; i < 5; i++) {
        const esGrande = (i === 0) ? 'grande' : '';
        const numeroFoto = i + 1; /* Esto busca 1.jpg, 2.jpg, etc. */
        
        contenedor.innerHTML += `
            <div class="item-collage ${esGrande}">
                <img src="../Imagenes/${paisID}/${numeroFoto}.jpg" alt="${ciudades[i]}">
                <div class="etiqueta">${ciudades[i]}</div>
            </div>
        `;
    }
}