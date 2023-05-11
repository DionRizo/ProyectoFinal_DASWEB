const loginForm = document.getElementById('loginForm');
const loginButton = document.getElementById('loginButton');
const loginError = document.getElementById('loginError');
const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));

const registerForm = document.getElementById('registerForm');
const registerButton = document.getElementById('registerButton');
const registerError = document.getElementById('registerError');
const registerModal = new bootstrap.Modal(document.getElementById('registerModal'));

const loginText = document.getElementById('loginText');

registerButton.addEventListener('click', async () => {
    const formData = new FormData(registerForm);
    const data = Object.fromEntries(formData.entries());
    try {
        console.log("userController.js: enviando response para registrar a usuario");
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            registerError.style.display = 'none';
            registerModal.hide();
            console.log("userController.js: Se registró al usuario satisfactoriamente");
        } else {
            registerError.style.display = 'block';
        }
    } catch (error) {
        console.error('userController.js - Hubo un error registrando al usuario:', error);
        registerError.style.display = 'block';
    }
});

loginButton.addEventListener('click', async () => {
    const formData = new FormData(loginForm);
    const data = Object.fromEntries(formData.entries());
    try {
        console.log("userController.js: Enviando response para loguear a usuario");
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (response.ok) {
            console.log("userController.js: response.ok");
            const responseData = await response.json();
            if (responseData.username) {
                console.log("userController.js: Se logueó al usuario satisfactoriamente");
                document.getElementById("loginText").textContent = "Logout";
            }
            loginError.style.display = 'none';
            loginModal.hide();
            console.log("Logged in");
        } else {
            console.log("userController.js: No se pudo loguear al usuario");
            loginError.style.display = 'block';
        }
    } catch (error) {
        console.error('userController.js - Hubo un error logueando al usuario:', error);
        loginError.style.display = 'block';
    }
});

document.getElementById("loginText").addEventListener("click", async () => {
    const loginText = document.getElementById("loginText");
    if (loginText.textContent === "Logout") {
        try {
            console.log("userController.js: Enviando response para desloguear a usuario");
            const response = await fetch("/logout", {
                method: "GET",
            });
            if (response.ok) {
                console.log("userController.js: Se deslogueó al usuario satisfactoriamente");
                loginText.textContent = "Login";
            }
        } catch (error) {
            console.error("userController.js - Hubo un error deslogueando al usuario:", error);
        }
    }
});
