const path = require("path");
const fs = require("fs");
let Data = [
    {
      "name": "Tab1",
      "content": [
        {
          "name": "https://logos-world.net/wp-content/uploads/2020/09/Google-Logo-700x394.png",
          "path": "https://google.com"
        },
        {
          "name": "https://logos-world.net/wp-content/uploads/2020/09/Google-Logo-700x394.png",
          "path": "https://google.com"
        },
        {
          "name": "https://logos-world.net/wp-content/uploads/2020/09/Google-Logo-700x394.png",
          "path": "https://google.com"
        },
        {
          "name": "https://logos-world.net/wp-content/uploads/2020/09/Google-Logo-700x394.png",
          "path": "https://google.com"
        },
        {
          "name": "https://logos-world.net/wp-content/uploads/2020/09/Google-Logo-700x394.png",
          "path": "https://google.com"
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
            console.log(Data);
        }
    );
}

function openPage(e) {
  const tabID = e.currentTarget.id;
  document.querySelector(".startmenu-page#" + tabID).classList.toggle('active')
  document.querySelector(".tabs-shortcut#" + tabID).classList.toggle('active')
}


function mainFunction() {
    Data.forEach((tab) => {
        let pageName = tab.name;
        console.log("Tab name:", pageName);
        startmenuPage = document.createElement("div");
        startmenuPage.id = tab.name;
        startmenuPage.classList.add("startmenu-page");
        startmenu.appendChild(startmenuPage);
        tabbutton = document.createElement("div");
        tabbutton.classList.add("tabs-shortcut");
        tabbutton.id = tab.name;
        tabsmenu.appendChild(tabbutton);

        tabbutton.addEventListener('click', openPage)


        tab.content.forEach((item) => {
            console.log("Item icon:", item.name);
            console.log("Item path:", item.path);
            startmenuItem = document.createElement("div");
            startmenuItem.classList.add("startmenu-shortcut");
            img = document.createElement("img");
            img.src = item.name;
            startmenuItem.appendChild(img);
            startmenuItem.action = item.path;
            startmenuPage.appendChild(startmenuItem);
        });
    });
}

document.addEventListener("DOMContentLoaded", mainFunction);
