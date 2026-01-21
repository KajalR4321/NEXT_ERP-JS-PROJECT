import Inventory from "./Classes/inventoryClasses.js";
import { InventoryData } from "./storage.js";

console.log(InventoryData);

// Track edit mode
let editId = null;

// DOM references
const addProductBtn = document.getElementById("addProductBtn");
const addProductDialog = document.getElementById("addProductDialog");
const addProductForm = document.getElementById("addProductForm");
const inventory_tableBody = document.getElementById("inventory_tableBody");
const table_template = document.getElementById("table_template");

// Open dialog
addProductBtn.addEventListener("click", () => {
  addProductDialog.showModal();
});

// Close dialog on outside click
addProductDialog.addEventListener("click", (e) => {
  if (e.target === addProductDialog) {
    addProductDialog.close();
  }
});

// ===================== FORM SUBMIT =====================
addProductForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const productName = e.target[0].value;
  const productCategory = e.target[1].value;
  const productPrice = e.target[2].value;
  const productQuantity = Number(e.target[3].value);

  let productStatus = "In Stock";

  if (productQuantity > 10) productStatus = "In Stock";
  else if (productQuantity >= 1) productStatus = "Low Stock";
  else productStatus = "Out of Stock";

  const currentTimeStamp = new Date();

  // ===== EDIT MODE =====
  if (editId) {
    const product = InventoryData.find(p => p.id === editId);

    product.productName = productName;
    product.productCategory = productCategory;
    product.productPrice = productPrice;
    product.productQuantity = productQuantity;
    product.productStatus = productStatus;

    editId = null;
  }
  // ===== ADD MODE =====
  else {
    const id = new Date().getTime();
    const inventory = new Inventory(
      id,
      productName,
      productCategory,
      productPrice,
      productQuantity,
      productStatus,
      currentTimeStamp
    );
    InventoryData.push(inventory);
  }

  localStorage.setItem("InventoryData", JSON.stringify(InventoryData));

  addProductDialog.close();
  render_inventory_data(InventoryData);
  addProductForm.reset();
});

// ===================== RENDER TABLE =====================
function render_inventory_data(data) {
  inventory_tableBody.innerHTML = "";

  data.forEach((Inventory) => {
    const table_row = table_template.content.cloneNode(true);
    const td = table_row.querySelectorAll("td");

    td[0].textContent = Inventory.productName;
    td[1].textContent = Inventory.productCategory;
    td[2].textContent = Inventory.productPrice;
    td[3].textContent = Inventory.productQuantity;
    td[4].textContent = Inventory.productStatus;

    // Actions
    td[5].innerHTML = `
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
    `;

    const editBtn = table_row.querySelector(".edit-btn");
    const deleteBtn = table_row.querySelector(".delete-btn");

    // EDIT
    editBtn.addEventListener("click", () => {
      editId = Inventory.id;

      addProductForm[0].value = Inventory.productName;
      addProductForm[1].value = Inventory.productCategory;
      addProductForm[2].value = Inventory.productPrice;
      addProductForm[3].value = Inventory.productQuantity;

      addProductDialog.showModal();
    });

    // DELETE
    deleteBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to delete this product?")) {
        const index = InventoryData.findIndex(p => p.id === Inventory.id);
        InventoryData.splice(index, 1);

        localStorage.setItem("InventoryData", JSON.stringify(InventoryData));
        render_inventory_data(InventoryData);
      }
    });

    inventory_tableBody.append(table_row);
  });
}

// ===================== INITIAL LOAD =====================
render_inventory_data(InventoryData);

    

