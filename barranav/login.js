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

    setTimeout(function () {
        // CORRECCIÓN AQUÍ: 
        // Asegúrate de que NO tenga puntos (../) si están en la misma carpeta
        window.location.href = "../inicio.html"; 
    }, 1000);

    } else {
        mensaje.textContent = "❌ Correo o contraseña incorrectos";
        mensaje.style.color = "red";
    }
}