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
            console.log("Successfully registered");
        } else {
            registerError.style.display = 'block';
        }
    } catch (error) {
        console.error('Error registering:', error);
        registerError.style.display = 'block';
    }
});

loginButton.addEventListener('click', async () => {
    const formData = new FormData(loginForm);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const responseData = await response.json();
            if (responseData.username) {
                document.getElementById("loginText").textContent = "Logout";
            }
            loginError.style.display = 'none';
            loginModal.hide();
            console.log("Logged in");
        } else {
            loginError.style.display = 'block';
        }
    } catch (error) {
        console.error('Error logging in:', error);
        loginError.style.display = 'block';
    }
});

document.getElementById("loginText").addEventListener("click", async () => {
    const loginText = document.getElementById("loginText");
    if (loginText.textContent === "Logout") {
      try {
        const response = await fetch("/logout", {
          method: "GET",
        });
  
        if (response.ok) {
          loginText.textContent = "Login";
        }
      } catch (error) {
        console.error("Error logging out:", error);
      }
    }
  });
  