async function login(event) {
    event.preventDefault(); // 🔥 evita recarga

    var correo = document.getElementById("correo").value;
    var password = document.getElementById("password").value;
    var mensaje = document.getElementById("mensaje");

    try {
        var response = await fetch("../data/usuarios.json");
        var usuarios = await response.json();

        var valido = false;

        for (var i = 0; i < usuarios.length; i++) {
            if (
                usuarios[i].correo === correo &&
                usuarios[i].password === password
            ) {
                valido = true;
            }
        }

        if (valido) {
            mensaje.textContent = "✅ Bienvenido";
            mensaje.style.color = "green";

            localStorage.setItem("usuario", correo);

            setTimeout(function () {
                window.location.href = "../index.html";
            }, 1000);

        } else {
            mensaje.textContent = "❌ Datos incorrectos";
            mensaje.style.color = "red";
        }

    } catch (error) {
        mensaje.textContent = "Error al cargar usuarios";
        mensaje.style.color = "orange";
    }
}