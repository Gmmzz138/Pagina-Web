const usuarioActivo = localStorage.getItem('usuarioLogueado') || 'invitado';
const claveFavoritos = `favoritos_${usuarioActivo}`;
const contenedorFav = document.getElementById('contenedor-favoritos');
const listaFav = JSON.parse(localStorage.getItem(claveFavoritos)) || [];

if (listaFav.length === 0) {
    contenedorFav.innerHTML = "<h2 style='width:100%; text-align:center; margin-top:50px; color:white;'>Aún no tienes destinos favoritos.</h2>";
} else {
    listaFav.forEach(nombre => {
        const div = document.createElement('div');
        div.className = "diseñtarjet-paises"; 
        
        // NUEVA RUTA: Entra a la carpeta con el nombre del país y busca el archivo 1.jpg
        // Ejemplo: ../Imagenes/Japon/1.jpg
        div.style.backgroundImage = `url('../Imagenes/${nombre}/1.jpg')`;
        div.style.flexShrink = "0"; 
        
        div.innerHTML = `
            <div class="capa-sombra"></div>
            <div class="texto-tarjeta">
                <h1 style="font-size: 1.4rem; color: white; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">${nombre}</h1>
                <button class="verdestinos" onclick="eliminarFavorito('${nombre}')" 
                    style="background: #ff4d4d; color: white; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer; margin-top: 10px;">
                    Eliminar
                </button>
            </div>
        `;
        contenedorFav.appendChild(div);
    });
}

function eliminarFavorito(nombre) {
    // Se corrigió para que use la clave dinámica del usuario activo
    let favoritos = JSON.parse(localStorage.getItem(claveFavoritos)) || [];
    favoritos = favoritos.filter(fav => fav !== nombre);
    localStorage.setItem(claveFavoritos, JSON.stringify(favoritos));
    location.reload();
}