async function renderCart(user) {
    const response = await fetch("/users/" + user + "/cart");
    const cart = await response.json();
    console.log("User's cart: ", cart);
    let cartCount = 0;
    for (const item of cart) {
        cartCount++;
    }
    console.log("Item count: ", cartCount);
    let itemCount = document.getElementById("itemCount");
    itemCount.innerText = cartCount + " item(s)";

    console.log("Purchase total: ", cart.reduce((total, item) => total + item.price * item.amount, 0));
    let purchaseTotal = document.getElementById("purchaseTotal");
    purchaseTotal.innerText = "$ " + cart.reduce((total, item) => total + item.price * item.amount, 0);

    const productsContainer = document.getElementById("products-container");
    productsContainer.innerHTML = "";
    const orderSummaryContainer = document.getElementById("order-summary-container");
    orderSummaryContainer.innerHTML = "";
    for (const item of cart) {
        const row = addProductRow(item);
        productsContainer.appendChild(row);
        const separator = createElement("hr", { class: "mb-4" });
        productsContainer.appendChild(separator);

        const orderItem = addOrderItem(item);
        orderSummaryContainer.appendChild(orderItem);
    }

    console.log("cartController.js: Cart rendered successfully");
}

function createElement(tag, attributes = {}, innerHTML = "") {
    const element = document.createElement(tag);
    for (const [key, value] of Object.entries(attributes)) {
        element.setAttribute(key, value);
    }
    element.innerHTML = innerHTML;
    return element;
}

function addOrderItem(item) {
    const row = createElement("div", { class: "d-flex justify-content-between mb-4" });
    const title = createElement("h5", { class: "text-uppercase text-black" }, item.name + " (" + item.year + ")");
    const price = createElement("h5", { class: "text-black" }, "$ " + item.price);
    row.appendChild(title);
    row.appendChild(price);
    return row;
}

function addProductRow(item) {
    const row = createElement("div", { class: "row mb-4 d-flex justify-content-between align-items-center" });
    const col1 = createElement("div", { class: "col-md-2 col-lg-2 col-xl-2" });
    const img = createElement("img", { src: item.posterUrl, class: "img-fluid rounded-3" });
    const col2 = createElement("div", { class: "col-md-3 col-lg-3 col-xl-3" });
    const title = createElement("h6", { class: "text-black mb-0" }, item.name);
    const subtitle = createElement("h6", { class: "text-muted" }, item.genres + " - " + item.year);
    const col3 = createElement("div", { class: "col-md-3 col-lg-3 col-xl-2 d-flex" });
    const quantity = createElement("input", { id: "form1", min: "1", max: "1", name: "quantity", value: item.amount, type: "number", class: "form-control form-control-sm", readonly: "readonly", disabled: "disabled" });
    const col4 = createElement("div", { class: "col-md-2 col-lg-2 col-xl-2 text-center" });
    const price = createElement("h6", { class: "text-black" }, "$" + item.price);
    const col5 = createElement("div", { class: "col-md-1 col-lg-1 col-xl-1 text-center" });
    const removeButton = createElement("a", { href: "#!", class: "text-muted", onclick: "removeFromCart(" + item.id + ")" });
    const removeIcon = createElement("i", { class: "bi bi-x-lg" });

    removeButton.appendChild(removeIcon);

    col1.appendChild(img);
    col2.appendChild(title);
    col2.appendChild(subtitle);
    col3.appendChild(quantity);
    col4.appendChild(price);
    col5.appendChild(removeButton);

    row.appendChild(col1);
    row.appendChild(col2);
    row.appendChild(col3);
    row.appendChild(col4);
    row.appendChild(col5);

    return row;
}

async function purchaseItems() {
    const user = document.getElementById("currentUser").textContent;
    const response = await fetch("/users/" + user + "/cart");
    const cart = await response.json();
    for (const item of cart) {
        const order = {
            posterUrl: item.posterUrl,
            name: item.name,
            year: item.year,
            orderType: item.orderType,
            dateOfPurchase: item.dateOfPurchase,
            returnDate: item.returnDate,
            price: item.price,
        };
        await fetch("/users/" + user + "/pastOrders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(order)
        }).then(() => {
            console.log("Order added successfully");
        });
    }
    emptyCart();
}

function emptyCart() {
    const user = document.getElementById("currentUser").textContent;
    fetch("/users/" + user + "/cart", {
        method: "DELETE"
    }).then(() => {
        console.log("Cart emptied successfully");
        renderCart(user);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const user = document.getElementById("currentUser").textContent;
    console.log("Currently logged in user: " + user);
    renderCart(user);
});