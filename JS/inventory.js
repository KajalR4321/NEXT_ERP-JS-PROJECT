// ===================== IMPORTS =====================
import Inventory from "./Classes/inventoryClasses.js";
import { InventoryData } from "./storage.js";

// ===================== GLOBAL VARIABLES =====================
// store id of product being edited
let editId = null;

// ===================== DOM REFERENCES =====================

// ADD PRODUCT
const addProductBtn = document.getElementById("addProductBtn");
const addProductDialog = document.getElementById("addProductDialog");
const addProductForm = document.getElementById("addProductForm");
const closeAddProductDialog = document.getElementById("closeAddProductDialog")
//span


// EDIT PRODUCT
const editProductDialog = document.getElementById("editProductDialog");
const editProductForm = document.getElementById("editProductForm");
const editCategory = document.getElementById("editCategory");
const editCancelBtn = document.getElementById("editCancelBtn");

// TABLE
const inventory_tableBody = document.getElementById("inventory_tableBody");
const table_template = document.getElementById("table_template");

// ===================== OPEN ADD PRODUCT DIALOG =====================
addProductBtn.addEventListener("click", () => {
  addProductDialog.showModal();
});
// Close dialog when clicking outside (optional)
addProductDialog.addEventListener("click", (e) => {
    if (e.target === addProductDialog) {
        addProductDialog.close();
    }
});

// ===================== ADD PRODUCT LOGIC =====================
addProductForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const productName = e.target[0].value;
  const productCategory = e.target[1].value;
  const productPrice = e.target[2].value;
  const productQuantity = Number(e.target[3].value);

  let productStatus = "In Stock";
  if (productQuantity <= 0) productStatus = "Out of Stock";
  else if (productQuantity <= 10) productStatus = "Low Stock";

  const inventory = new Inventory(
    Date.now(),
    productName,
    productCategory,
    productPrice,
    productQuantity,
    productStatus,
    new Date()
  );

  InventoryData.push(inventory);
  localStorage.setItem("InventoryData", JSON.stringify(InventoryData));

  addProductForm.reset();
  addProductDialog.close();
  render_inventory_data(InventoryData);
});

// ===================== EDIT PRODUCT SUBMIT =====================
editProductForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const product = InventoryData.find(item => item.id === editId);

  if (product) {
    product.productCategory = editCategory.value;
  }

  localStorage.setItem("InventoryData", JSON.stringify(InventoryData));

  editId = null;
  editProductDialog.close();
  render_inventory_data(InventoryData);
});

// ===================== CANCEL EDIT =====================
editCancelBtn.addEventListener("click", () => {
  editId = null;
  editProductDialog.close();
});

// ===================== DELETE PRODUCT =====================
function deleteProduct(id) {
  if (!confirm("Are you sure you want to delete this product?")) return;

  const index = InventoryData.findIndex(item => item.id === id);
  if (index === -1) return;

  InventoryData.splice(index, 1);
  localStorage.setItem("InventoryData", JSON.stringify(InventoryData));
  render_inventory_data(InventoryData);
}



// ===================== RENDER INVENTORY TABLE =====================
function render_inventory_data(data) {
  inventory_tableBody.innerHTML = "";

  data.forEach((item) => {
    const row = table_template.content.cloneNode(true);
    const td = row.querySelectorAll("td");

    td[0].textContent = item.productName;
    td[1].textContent = item.productCategory;
    td[2].textContent = item.productPrice;
    td[3].textContent = item.productQuantity;
    td[4].textContent = item.productStatus;

    td[5].innerHTML = `
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
    `;

    // EDIT BUTTON
    row.querySelector(".edit-btn").addEventListener("click", () => {
      editId = item.id;
      editCategory.value = item.productCategory;
      editProductDialog.showModal();
    });

    // DELETE BUTTON
    row.querySelector(".delete-btn").addEventListener("click", () => {
      deleteProduct(item.id);
    });

    inventory_tableBody.append(row);
  });
}


        


// ===================== INITIAL LOAD =====================
render_inventory_data(InventoryData);
