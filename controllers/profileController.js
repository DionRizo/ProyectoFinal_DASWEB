async function renderPastOrders(user) {
    const response = await fetch("/users/" + user + "/pastOrders");
    const orders = await response.json();

    const ordersContainer = document.getElementById("orders-container");
    ordersContainer.innerHTML = "";

    for (const order of orders) {
        const row = addOrder(order);
        ordersContainer.appendChild(row);
    }
}

function createElement(tag, attributes = {}, innerHTML = "") {
    const element = document.createElement(tag);
    for (const [key, value] of Object.entries(attributes)) {
        element.setAttribute(key, value);
    }
    element.innerHTML = innerHTML;
    return element;
}

function addOrder(order) {
    const tr = createElement("tr", { "id": order.name });

    const tdPoster = createElement("td");
    const imgPoster = createElement("img", { src: order.posterUrl, style: "width: 120px;" });
    tdPoster.appendChild(imgPoster);

    const tdTitle = createElement("td", {}, order.name);
    const tdYear = createElement("td", {}, order.year);
    const tdOrderType = createElement("td", {}, order.orderType);
    const tdDateOfPurchase = createElement("td", {}, order.dateOfPurchase);
    const tdPrice = createElement("td", {}, order.price);

    const elements = [tdPoster, tdTitle, tdYear, tdOrderType, tdDateOfPurchase, tdPrice];
    elements.forEach((element) => {
        tr.appendChild(element);
    });

    return tr;
}

document.addEventListener("DOMContentLoaded", () => {
    const user = document.getElementById("currentUser").textContent;
    console.log("Currently logged in user: " + user);
    renderPastOrders(user);
});