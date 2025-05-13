const trayButton = document.querySelector("#tray-button");
const trayMenu = document.querySelector("tray");
const startMenuButton = document.querySelector("#menubar-startmenu-button");
const startMenu = document.querySelector("startmenu");


trayButton.addEventListener("click", () => {
    trayMenu.classList.toggle("open");
    trayButton.classList.toggle("open")
});

startMenuButton.addEventListener("click", () => {
    startMenuButton.classList.toggle("open");
    startMenu.classList.toggle("open")
});