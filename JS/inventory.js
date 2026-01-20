import Inventory from "./Classes/inventoryClasses.js";
import {InventoryData} from "./storage.js";

console.log(InventoryData)
// Get reference to the "Add Product" button that opens the dialog
const addProductBtn = document.getElementById("addProductBtn");
//use for diaglog
const addProductDialog = document.getElementById("addProductDialog")
//this is third step to target form so we can see in local storage
const addProductForm = document.getElementById("addProductForm")
//now adding table in table inside the table body
const inventory_tableBody= document.getElementById("inventory_tableBody")
const table_template = document.getElementById("table_template")

// Add click event 1part listener to the "Add Product" button
addProductBtn.addEventListener("click", () => {
    // Open the dialog as a modal (blocking the rest of the page)
    addProductDialog.showModal();
});
//line no.8 functionilty 2part exceute here for close
addProductDialog.addEventListener("click",(e)=>{
    //this will use if because when i am not use this where ic click it close 
     if (e.target === addProductDialog){
    addProductDialog.close();
     }
}) ;
//line 10 addProductForm access from here 3part
addProductForm.addEventListener("submit",(e)=>{
    e.preventDefault();
      // Generate a unique ID using current timestamp in milliseconds
      const id= new Date().getTime();
      //now target form section like start with 0
      const  productName= e.target[0].value;
     // Get product category from the second form input (dropdown/select)
    const productCategory = e.target[1].value;
    // Get product quantity from the fourth form input
    const productPrice = e.target[2].value;
    // ISSUE: This is stored as a STRING, not a NUMBER - should use parseInt() or Number()
    const productQuantity = e.target[3].value;

    // Initialize product status with default value
    let productStatus = "In Stock";
    //NOW I USE IF ELSE STOCK IS AVILABLE OR NOT
    if(productQuantity>10){
        productStatus="In Stock;"
    } else if(productQuantity>=1 && productQuantity<10){
        productStatus="Low Stock"
    }
    else{
         productStatus="Out of Stock"

    }
// Create a new Date object to store when this product was added
//dought hai
  

    const currentTimeStamp = new Date();
 
    // Create a new Inventory object using the collected data dought hai
    const inventroy = new Inventory(id,productName, productCategory,productPrice, productQuantity,productStatus)
    //it taje from storage dta name
    InventoryData.push(inventroy)
    //now to store whole data in local storage
    localStorage.setItem("InventoryData",JSON.stringify(InventoryData))
    //after adding the data it will close
    addProductDialog.close();
    // Re-render the entire inventory table to show the new product
    // NOTE: Function name has typo "rendenter" instead of "render"
    //dought hai
    render_inventory_data(InventoryData);
        // Reset the form fields to empty values for next use
    addProductForm.reset();
 
})
//use to show on ui it will render it will acces line no 12
//dought hai
function render_inventory_data(data){
    inventory_tableBody.innerText=" ";
    data.forEach((Inventory)=>{
         // Clone the template content (creates a deep copy of the template structure)
        // The 'true' parameter means deep clone (includes all child nodes)

        const table_row= table_template.content.cloneNode(true)
        const td =table_row.querySelectorAll("td")
         // Set the text content of each table cell with inventory data it will show on ui
        td[0].textContent = Inventory.productName;        // First column: Product Name
        td[1].textContent = Inventory.productCategory;    // Second column: Category
        td[2].textContent = Inventory.productPrice;       // Third column: Price
        td[3].textContent = Inventory.productQuantity;    // Fourth column: Quantity
        td[4].textContent = Inventory.productStatus;      // Fifth column: Status
        // Set the HTML content for the actions column with Edit and Delete buttons

        inventory_tableBody.append(table_row)
    })  
}

render_inventory_data(InventoryData)

    
   


     