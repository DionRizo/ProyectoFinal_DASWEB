/* -------------------------------------------------------------------------- */
/*                             Variables globales                             */
/* -------------------------------------------------------------------------- */
const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');
const loginButton = document.getElementById('loginButton');
const loginModalButton = document.getElementById('loginModalButton');
const logoutButton = document.getElementById('logoutButton');
const numberItems = document.getElementById('numberItems');
const moviesContainer = document.getElementById('moviesContainer');
const resumenContainer = document.getElementById('resumenContainer');
let cart = [];
let total = 0;
let isAuth = false;
const totalHTML = document.getElementById('total');
// Variable para guardar la película actual
let currentMovie = null;

/* -------------------------------------------------------------------------- */
/*                              Login y registro                              */
/* -------------------------------------------------------------------------- */
const checkAuth = () => {
  const user = getUser();
  if (user !== null) {
    isAuth = true;
    removeButton(loginModalButton);
    addButton(logoutButton);
  } else {
    removeButton(logoutButton);
    addButton(loginModalButton);
  }
};

const getUser = () => {
  if (localStorage.getItem('user') !== null) {
    const user = JSON.parse(localStorage.getItem('user'));
    return user;
  }
  return null;
};

const setUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

const removeUser = () => {
  localStorage.removeItem('user');
};

const removeButton = (button) => {
  button.style.display = 'none';
};

const addButton = (button) => {
  button.style.display = 'block';
};

const closeModal = (id) => {
  const modal = document.getElementById(id);
  const modalInstance = bootstrap.Modal.getInstance(modal);
  modalInstance.hide();
};

/* -------------------------------------------------------------------------- */
/*                                   Carrito                                  */
/* -------------------------------------------------------------------------- */

const addToCart = (item) => {
  cart = getCart();
  let element = cart.find((element) => {
    return element._id === item._id;
  });
  if (element) {
    element.quantity++;
  } else {
    item.price = 25;
    item.quantity = 1;
    cart.push(item);
  }
  calculateTotal();
  setCart();
};

const addQuantity = (id) => {
  const elementQuantity = document.getElementById(
    `element-quantity-${id}`
  );
  const elementTotal = document.getElementById(`total-element-${id}`);
  const element = cart.find((element) => {
    return element._id === id;
  });
  element.quantity++;
  elementQuantity.innerHTML = element.quantity;
  elementTotal.innerHTML = `$ ${element.price * element.quantity}.00`;
  calculateTotal();
  updateTotalHTML();
  setCart();
};

const removeQuantity = (id) => {
  const elementQuantity = document.getElementById(
    `element-quantity-${id}`
  );
  const elementTotal = document.getElementById(`total-element-${id}`);
  const element = cart.find((element) => {
    return element._id === id;
  });
  if (element.quantity > 1) {
    element.quantity--;
    elementQuantity.innerHTML = element.quantity;
    elementTotal.innerHTML = `$ ${
      element.price * element.quantity
    }.00`;
  } else {
    removeFromCart(id);
    renderItemsCart();
  }
  updateTotalHTML();
  calculateTotal();
  setCart();
};

const removeFromCart = (id) => {
  const index = cart.findIndex((element) => element._id === id);
  cart.splice(index, 1);
  calculateTotal();
  setCart();
  renderItemsCart();
};

const calculateTotal = () => {
  total = 0;
  cart.map((element) => {
    total += element.price * element.quantity;
  });
};

const updateTotalHTML = () => {
  totalHTML.innerHTML = `$ ${total}.00`;
};

const clearCart = () => {
  cart.splice(0, cart.length);
  removeCart();
  total = 0;
  updateTotalHTML();
  numberItems.innerHTML = `${cart.length} items`;
  moviesContainer.innerHTML = `
    <div class="d-flex justify-content-between align-items-center mb-5">
      <h1 class="fw-bold mb-0 text-black">Shopping Cart</h1>
      <h6 id="numberItems" class="mb-0 text-muted">0 items</h6>
    </div>
    <h4 class="text-black text-center">No hay elementos en el carrito</h4>
    <div class="pt-5">
      <h6 class="mb-0"><a href="/" class="text-body"><i class="bi bi-arrow-left"></i>Seguir
          comprando</a></h6>
    </div>`;
  resumenContainer.innerHTML = '';
};

const getCart = () => {
  if (localStorage.getItem('cart') !== null) {
    return JSON.parse(localStorage.getItem('cart'));
  } else {
    return [];
  }
};

const setCart = () => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

const removeCart = () => {
  localStorage.removeItem('cart');
};

const initCart = () => {
  cart = getCart();
};

const renderItemsCart = () => {
  calculateTotal();
  updateTotalHTML();
  moviesContainer.innerHTML = '';
  resumenContainer.innerHTML = '';
  let elements = `
  <div class="d-flex justify-content-between align-items-center mb-5">
      <h1 class="fw-bold mb-0 text-black">Shopping Cart</h1>
      <h6 id="numberItems" class="mb-0 text-muted">0 items</h6>
    </div>`;
  moviesContainer.innerHTML += elements;
  numberItems.innerHTML = `${cart.length} items`;
  if (cart.length === 0) {
    moviesContainer.innerHTML += `
    <h4 class="text-black text-center">No hay elementos en el carrito</h4>
    <div class="pt-5">
        <h6 class="mb-0"><a href="/" class="text-body"><i class="bi bi-arrow-left"></i>Seguir
            comprando</a></h6>
    </div>`;
    return;
  }

  cart.map((element) => {
    elements = `
    
                          <div  class="row mb-4 d-flex justify-content-between align-items-center">
                            <div class="col-md-2 col-lg-2 col-xl-2">
                              <img src=${
                                element.posterUrl
                              } class="img-fluid rounded-3" alt="${
      element.title
    }">
                            </div>
                            <div class="col-md-3 col-lg-3 col-xl-3">
                              <h6 class="text-black mb-0">${
                                element.title
                              }</h6>
                              <h6 class="text-muted">${
                                element.genres.split(',')[0]
                              } - ${element.year}</h6>
                            </div>
                            <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                              <button class="btn btn-link px-2"
                                onclick="removeQuantity('${
                                  element._id
                                }')">
                                <i class="bi bi-dash"></i>
                              </button>
                              <div class="d-flex justify-content-center align-items-center">
                                <p id="element-quantity-${
                                  element._id
                                }" class="text-black">${
      element.quantity
    }</p>
                              </div>
                              <button class="btn btn-link px-2"
                              onclick="addQuantity('${element._id}')">
                                <i class="bi bi-plus"></i>
                              </button>
                            </div>
                            <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                              <h6 id="total-element-${
                                element._id
                              }" class="mb-0 text-black">$ ${
      element.price * element.quantity
    }.00</h6>
                            </div>
                            <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                              <button onclick="removeFromCart('${
                                element._id
                              }')" class="border-0 bg-transparent text-muted"><i class="bi bi-x-lg"></i></button>
                            </div>
                          </div>
    
                          <hr class="my-4" style="color: black;">
    `;
    moviesContainer.innerHTML += elements;
    let elementsResumen = `<div class="d-flex justify-content-between mb-4">
    <h5 class="text-uppercase text-black">${element.title} (${
      element.year
    })</h5>
    <h5 id="total-resumen-${element._id}" class="text-black">$ ${
      element.price * element.quantity
    }.00</h5>
  </div>`;
    resumenContainer.innerHTML += elementsResumen;
  });
  moviesContainer.innerHTML += `<div class="pt-5">
  <h6 class="mb-0"><a href="/" class="text-body"><i class="bi bi-arrow-left"></i>Seguir
      comprando</a></h6>
</div>`;
};

checkAuth();
initCart();