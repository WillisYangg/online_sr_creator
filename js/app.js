/*
=====================================
 Application Main Functions
=====================================
*/



// ===================================
// Dynamic Greeting
// ===================================
const hour = new Date().getHours();

let greeting = "Welcome";

if(hour < 12){
    greeting = "Good Morning ☀️";
}
else if(hour < 18){
    greeting = "Good Afternoon 🌤";
}
else{
    greeting = "Good Evening 🌙";
}

document.getElementById("greeting").innerHTML =
greeting;


// ===================================
// Footer Year
// ===================================

document.getElementById("year").innerHTML =
new Date().getFullYear();


// ===================================
// Dark / Bright Mode Toggle
// ===================================

const themeButton =
document.getElementById("themeToggle");

themeButton.addEventListener(
    "click",
    toggleTheme
);

function toggleTheme(){
    document.body.classList.toggle("dark");
    if(
        document.body.classList.contains("dark")
    ){
        themeButton.innerHTML =
        "☀️ Toggle Bright Mode";
    }
    else{
        themeButton.innerHTML =
        "🌙 Toggle Dark Mode";
    }
}