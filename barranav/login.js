async function login(event) {
    event.preventDefault();

    var correo = document.getElementById("correo").value;
    var password = document.getElementById("password").value;
    var mensaje = document.getElementById("mensaje");

    // 1. Traer los usuarios que se han registrado en el navegador
    var usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // 2. Buscar si coinciden los datos
    var usuarioEncontrado = usuarios.find(u => u.correo === correo && u.password === password);

    if (usuarioEncontrado) {
    mensaje.textContent = "✅ Bienvenido " + usuarioEncontrado.nombre;
    mensaje.style.color = "lightgreen";

    localStorage.setItem("sesionActiva", "true");

    // PARA GUARdar el usuario
    localStorage.setItem("usuarioLogueado", usuarioEncontrado.nombre);

    setTimeout(function () {
        window.location.href = "../inicio.html"; 
    }, 500);

    } else {
        mensaje.textContent = "❌ Correo o contraseña incorrectos";
        mensaje.style.color = "red";
    }

    function cerrarSesion() {
    // 1. Borramos quien estaba logueado
    localStorage.removeItem("usuarioLogueado");
    
    // 2. Borramos el estado de la sesion
    localStorage.removeItem("sesionActiva");

    // 3. Redirigimos al login
    window.location.href = "index.html"; 
    }
}