
registerForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const username = document.getElementById('usernameRegister').value;
    const password = document.getElementById('passwordRegister').value;
    const res = await fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password})
    })
    if(res.status === 200){
        const data = await res.json();
        setUser(data.user);
        isAuth = true;
        closeModal('registerModal');
        removeButton(loginModalButton);
        addButton(logoutButton);
    }else{
        console.log(res);
        const data = await res.json();
        console.log(data);
        console.log(res.status);
        alert('No se pudo registrar el usuario');
    }
});

loginForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    console.log("Submit event");
    const username = document.getElementById('usernameLogin').value;
    const password = document.getElementById('passwordLogin').value;
    const res = await fetch('/authenticate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password})
    });
    if(res.status === 200){

        const data = await res.json();
        setUser(data.user);
        isAuth = true;
        closeModal('loginModal');
        removeButton(loginModalButton);
        addButton(logoutButton);
    }else{
        console.log(res);
        console.log(res.status);
        alert('No se pudo iniciar sesión');
    }
});

logoutButton.addEventListener('click', async function(e) {
    e.preventDefault();
    logout();
});


const logout = () =>{
    removeUser();
    isAuth = false;
    removeButton(logoutButton);
    addButton(loginModalButton);
}