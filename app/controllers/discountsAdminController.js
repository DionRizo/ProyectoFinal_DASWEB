async function renderCodes() {
    const response = await fetch("/admin/codes");
    const codes = await response.json();

    const codesContainer = document.getElementById("codes-container");
    codesContainer.innerHTML = "";

    for (const code of codes) {
        const row = addCodeRow(code);
        codesContainer.appendChild(row);
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

function addCodeRow(code) {
    const tr = createElement("tr", { "id": code._id });
    const tdCode = createElement("td", {}, code.code);
    const tdDiscountPercentage = createElement("td", {}, code.discountPercentage);
    const tdCreationDate = createElement("td", {}, code.creationDate);
    const tdValidIn = createElement("td", {}, code.validIn);
    const tdValidFrom = createElement("td", {}, code.validFrom);
    const tdValidUntil = createElement("td", {}, code.validUntil);

    const btnEdit = createElement("button", { type: "button", class: "btn btn-primary" });
    const iconEdit = createElement("i", { class: "bi bi-pencil-fill" });
    btnEdit.appendChild(iconEdit);

    const btnDelete = createElement("button", { type: "button", class: "btn btn-danger" });
    const iconDelete = createElement("i", { class: "bi bi-x-lg" });
    btnDelete.appendChild(iconDelete);

    const tdButtons = createElement("td");
    tdButtons.appendChild(btnEdit);
    tdButtons.appendChild(btnDelete);

    btnEdit.addEventListener('click', () => {
        editCode(code);
    });

    btnDelete.addEventListener('click', () => {
        deleteCode(code);
    });

    const elements = [tdCode, tdDiscountPercentage, tdCreationDate, tdValidIn, tdValidFrom, tdValidUntil, tdButtons];
    elements.forEach((element) => {
        tr.appendChild(element);
    });

    return tr;
}

async function updateCodeInDB(code) {
    const updateApiUrl = `/admin/codes/${code._id}`;

    try {
        const response = await fetch(updateApiUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(code),
        });

        if (response.ok) {
            console.log('Discount code updated successfully');
            renderCodes();
        } else {
            console.error('Failed to update discount code');
        }
    } catch (error) {
        console.error('Error updating discount code:', error);
    }
}

function editCode(code) {
    const editCodeModal = new bootstrap.Modal(document.getElementById('codeEditionModal'));
    const saveEditCodeButton = document.getElementById('confirmCodeEdit');
    document.getElementById('editCodeId').value = code._id;
    document.getElementById('editDiscountCode').value = code.code;
    document.getElementById('editCodePercentage').value = code.discountPercentage;
    document.getElementById('editCodeCreationDate').value = code.creationDate;
    document.getElementById('editCodeValidIn').value = code.validIn;
    document.getElementById('editCodeValidFrom').value = code.validFrom;
    document.getElementById('editCodeValidUntil').value = code.validUntil;

    function onSave() {
        const updatedCode = {
            _id: document.getElementById('editCodeId').value,
            code: document.getElementById('editDiscountCode').value,
            discountPercentage: document.getElementById('editCodePercentage').value,
            creationDate: document.getElementById('editCodeCreationDate').value,
            validIn: document.getElementById('editCodeValidIn').value,
            validFrom: document.getElementById('editCodeValidFrom').value,
            validUntil: document.getElementById('editCodeValidUntil').value,
        };

        updateCodeInDB(updatedCode);
        saveEditCodeButton.removeEventListener('click', onSave);
        editCodeModal.hide();
    }

    saveEditCodeButton.addEventListener('click', onSave);
    editCodeModal.show();
}

async function deleteCodeFromDB(codeId) {
    const deleteApiUrl = `/admin/codes/${codeId}`;

    try {
        const response = await fetch(deleteApiUrl, {
            method: 'DELETE',
        });

        if (response.ok) {
            console.log('Discount code deleted successfully');
            renderCodes();
        } else {
            console.error('Failed to delete discount code');
        }
    } catch (error) {
        console.error('Error deleting discount code:', error);
    }
}

function deleteCode(code) {
    const confirmationModal = new bootstrap.Modal(document.getElementById('codeDeletionModal'));
    const confirmDeleteButton = document.getElementById('confirmCodeDeletion');

    function onConfirm() {
        deleteCodeFromDB(code._id);
        confirmDeleteButton.removeEventListener('click', onConfirm);
        confirmationModal.hide();
    }

    confirmDeleteButton.addEventListener('click', onConfirm);
    confirmationModal.show();
}


document.addEventListener("DOMContentLoaded", () => {
    renderCodes();
});
