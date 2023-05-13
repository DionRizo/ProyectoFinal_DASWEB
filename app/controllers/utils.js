//Variables globales
const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');
const loginButton = document.getElementById('loginButton');
const loginModalButton = document.getElementById('loginModalButton');
const logoutButton = document.getElementById('logoutButton');
let isAuth = false;

const checkAuth = () => {
  const user = getUser();
  if(user !== null){
    isAuth = true;
    removeButton(loginModalButton);
    addButton(logoutButton);
  }
  removeButton(logoutButton);
  addButton(loginModalButton);
}

const getUser = () => {
  if(localStorage.getItem('user') !== null){
    const user = JSON.parse(localStorage.getItem('user'));
    return user;
  }
  return null;
}

const setUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
}

const removeUser = () => {
  localStorage.removeItem('user');
}


const removeButton = (button) => {
  button.style.display = 'none';
}

const addButton = (button) => {
  button.style.display = 'block';
}


const closeModal = (id) => {
  const modal = document.getElementById(id);
  const modalInstance = bootstrap.Modal.getInstance(modal);
  modalInstance.hide();
}

checkAuth();