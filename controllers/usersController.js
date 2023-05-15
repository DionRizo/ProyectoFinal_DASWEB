async function renderUsers() {
    const response = await fetch("/users");
    const users = await response.json();

    const usersContainer = document.getElementById("users-container");
    usersContainer.innerHTML = "";

    for (const user of users) {
        const row = addUserRow(user);
        usersContainer.appendChild(row);
    }
    console.log("usersController.js: Se han cargado los usuarios satisfactoriamente")
}

function createElement(tag, attributes = {}, innerHTML = "") {
    const element = document.createElement(tag);
    for (const [key, value] of Object.entries(attributes)) {
        element.setAttribute(key, value);
    }
    element.innerHTML = innerHTML;
    return element;
}

function addUserRow(user) {
    const tr = createElement("tr", { "id": user._id });
    const tdName = createElement("td", {}, user.name);
    const tdEmail = createElement("td", {}, user.email);
    const tdPassword = createElement("td", {}, user.password);
    const tdRegisterDate = createElement("td", {}, user.date);
    const tdAdministrator = createElement("td", {}, user.administrator);

    const btnEdit = createElement("button", { type: "button", class: "btn btn-primary" });
    const iconEdit = createElement("i", { class: "bi bi-pencil-fill" });
    btnEdit.appendChild(iconEdit);

    const btnDelete = createElement("button", { type: "button", class: "btn btn-danger" });
    const iconDelete = createElement("i", { class: "bi bi-x-lg" });
    btnDelete.appendChild(iconDelete);

    const tdButtons = createElement("td");
    tdButtons.appendChild(btnDelete);

    btnDelete.addEventListener('click', () => {
        deleteUser(user);
    });

    const elements = [tdName, tdEmail, tdPassword, tdRegisterDate, tdAdministrator, tdButtons];
    elements.forEach((element) => {
        tr.appendChild(element);
    });

    return tr;
}

async function deleteUserFromDB(userId) {
    console.log("User id received:", userId);
    const deleteApiUrl = `/users/delete/${userId}`;

    try {
        const response = await fetch(deleteApiUrl, {
            method: 'DELETE',
        });

        // Check if the response is ok (status in the range 200-299)
        if (response.ok) {
            console.log('userController.js: Usuario eliminada satisfactoriamente');
            renderUsers();
        } else {
            // If the server returned a status outside of the 200 range, handle it
            switch (response.status) {
                case 404:
                    console.error('userController.js: User not found');
                    break;
                case 500:
                    console.error('userController.js: Server error');
                    break;
                default:
                    console.error('userController.js: Unexpected error');
            }

            // Get additional error information from the body, if available
            const errorData = await response.json();
            console.error('userController.js: Error data', errorData);
        }
    } catch (error) {
        console.error('usersAdminController.js: Error trying to delete the user');
        console.error(error);
    }
}


function deleteUser(user) {
    console.log("Usuario a eliminar:", user);
    const confirmationModal = new bootstrap.Modal(document.getElementById('userDeletionModal'));
    const confirmDeleteButton = document.getElementById('confirmUserDeletion');

    function onConfirm() {
        console.log('usersController.js: Eliminando usuario...');
        deleteUserFromDB(user._id);
        confirmDeleteButton.removeEventListener('click', onConfirm);
        confirmationModal.hide();
    }

    confirmDeleteButton.addEventListener('click', onConfirm);
    confirmationModal.show();
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("usersController.js: La página está cargada");
    console.log("usersController.js: Cargando usuarios...");
    renderUsers();
});
