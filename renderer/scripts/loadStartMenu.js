const path = require("path");
const fs = require("fs");
const { log } = require("console");
let Data = [
    {
      "name": "Tab1",
      "content": [
        {
          "name": "Google",
          "icon": "https://logos-world.net/wp-content/uploads/2020/09/Google-Logo-700x394.png",
          "path": "https://google.com"
        },
        {
          "name": "ChatGPT",
          "icon": "https://duckduckgo.com/i/24b826883d81f317.png",
          "path": "https://chatgpt.com/"
        },
        {
          "name": "Youtube",
          "icon": "https://logosmarcas.net/wp-content/uploads/2020/04/YouTube-S%C3%ADmbolo.jpg",
          "path": "https://youtube.com"
        }
      ]
    }
  ]
  

let startmenuPage;
const startmenu = document.querySelector("#startmenu-icons");
let startmenuItem;
let img;
const tabsmenu = document.querySelector("#tabs");
let tabbutton;

function getStartmenuSettings() {
    fs.readFile(
        path.join(
            process.env.HOME,
            ".local/share/nsd/browser-window-manager/startmenu.json"
        ),
        "utf-8",
        (err, data) => {
            if (err) {
                console.error("An error occured: ", err);
                return null;
            }
            Data = data;
        }
    );
}

function openPage(e) {
  const tabID = e.currentTarget.id;
  startmenu.querySelectorAll(".startmenu-page").forEach(element => {
    element.classList.remove('active')  
  });
  tabsmenu.querySelectorAll(".tabs-shortcut").forEach(element => {
    element.classList.remove('active')  
  });
  document.querySelector(".startmenu-page#" + tabID).classList.toggle('active')
  document.querySelector(".tabs-shortcut#" + tabID).classList.toggle('active')
}


function mainFunction() {
    getStartmenuSettings();

    Data.forEach((tab) => {
        startmenuPage = document.createElement("div");
        startmenuPage.id = tab.name;
        startmenuPage.classList.add("startmenu-page");
        startmenu.appendChild(startmenuPage);
        tabbutton = document.createElement("div");
        tabbutton.classList.add("tabs-shortcut");
        tabbutton.id = tab.name;
        tabbutton.innerText = tab.name;
        tabsmenu.appendChild(tabbutton);

        tabbutton.addEventListener('click', openPage)


        tab.content.forEach((item) => {
            startmenuItem = document.createElement("div");
            startmenuItem.classList.add("startmenu-shortcut");
            img = document.createElement("img");
            img.src = item.icon;
            startmenuItem.appendChild(img);
            startmenuItem.action = item.path;
            startmenuPage.appendChild(startmenuItem);
        });
    });
}

document.addEventListener("DOMContentLoaded", mainFunction);
