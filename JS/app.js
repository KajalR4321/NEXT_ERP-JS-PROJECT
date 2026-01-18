
import { user_logged_in } from "./storage.js";


if (!user_logged_in) {
    window.location.href = 'login.html'
}
//log out concept when logout iit goes to login window
const logOutBtn=document.getElementById("logOutBtn");
logOutBtn.addEventListener("click", ()=>{
      // Remove the "logIn" item from localStorage
  // This clears the user's login state, effectively logging them out
  localStorage.removeItem("logIn")
})
