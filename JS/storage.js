//login logic
export const user_logged_in = localStorage.getItem("logIn") 
export let InventoryData= JSON.parse(localStorage.getItem("InventoryData"))||[]