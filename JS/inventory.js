import Inventory from "./Classes/inventoryClasses.js";
import { InventoryData } from "./storage.js";


// Get reference to the "Add Product" button that opens the dialog
const addProductBtn = document.getElementById("addProductBtn");
//use for diaglog
const addProductDialog = document.getElementById("addProductDialog")

// Add click event listener to the "Add Product" button
addProductBtn.addEventListener("click", () => {
    // Open the dialog as a modal (blocking the rest of the page)
    addProductDialog.showModal();
});
//line no.8 functionilty  exceute here for close
addProductDialog.addEventListener("click",()=>{
    addProductDialog.close();
}) 