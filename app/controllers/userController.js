document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerButton');
    const loginForm = document.getElementById('loginButton');

    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('usernameRegister').value;
        const password = document.getElementById('passwordRegister').value;

        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
        })
        .then(response => response.text())
        .then(data => {
            // Aquí puedes manejar una respuesta exitosa
            console.log(data);
        })
        .catch(err => {
            // Aquí puedes manejar una respuesta fallida
            console.log(err);
        });
    });

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('usernameLogin').value;
        const password = document.getElementById('passwordLogin').value;

        fetch('/authenticate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
        })
        .then(response => response.text())
        .then(data => {
            // Aquí puedes manejar una respuesta exitosa
            console.log(data);
        })
        .catch(err => {
            // Aquí puedes manejar una respuesta fallida
            console.log(err);
        });
    });
});
