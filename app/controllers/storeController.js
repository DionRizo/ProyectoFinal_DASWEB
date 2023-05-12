async function renderLocations() {
    const response = await fetch("/stores/locations");
    const locations = await response.json();

    const locationsContainer = document.getElementById("locations-container");
    locationsContainer.innerHTML = "";

    for (const location of locations) {
        const col = addLocationCol(location);
        locationsContainer.appendChild(col);
    }
    console.log("storeController.js: Se han cargado las sucursales satisfactoriamente")
}

function createElement(tag, attributes = {}, innerHTML = "") {
    const element = document.createElement(tag);
    for (const [key, value] of Object.entries(attributes)) {
        element.setAttribute(key, value);
    }
    element.innerHTML = innerHTML;
    return element;
}

function addLocationCol(location) {
    const col = createElement("div", { class: "col" });
    const card = createElement("div", { class: "card" });
    const img = createElement("img", { src: location.pictureUrl, class: "card-img-top" });
    const cardBody = createElement("div", { class: "card-body bg-light" });
    const title = createElement("h5", { class: "card-title bg-light" }, location.name);
    const address = createElement("p", { class: "card-text bg-light" }, location.street + "<br>" + location.postalCode + "<br>" +location.city + ", " + location.state);
    const info = createElement("p", { class: "card-text bg-light" }, "Tel. " + location.telephone + "<br>" + location.daysOpen + "<br>" + location.openingTime + " - " + location.closingTime);
    const mapsLink = createElement("a", { href: location.googleMapsUrl, class: "btn btn-primary" }, "Abrir en Maps");

    cardBody.appendChild(title);
    cardBody.appendChild(address);
    cardBody.appendChild(info);
    cardBody.appendChild(mapsLink);
    card.appendChild(img);
    card.appendChild(cardBody);
    col.appendChild(card);

    return col;
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("storeController.js: La página se ha cargado satisfactoriamente");
    console.log("storeController.js: Cargando sucursales...");
    renderLocations();
});
