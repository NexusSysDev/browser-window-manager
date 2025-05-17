const path = require("path");
const fs = require("fs/promises");

const startmenu = document.querySelector("#startmenu-icons");
const tabsmenu = document.querySelector("#tabs");

async function getStartmenuSettings() {
  try {
    const isWindows = process.platform === "win32";
    const filePath = isWindows
      ? path.join(process.env.LOCALAPPDATA, "nsd", "browser-window-manager", "startmenu.json")
      : path.join(process.env.HOME, ".local", "share", "nsd", "browser-window-manager", "startmenu.json");

    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Failed to load startmenu settings:", err);
    return null;
  }
}

function openPage(e) {
  const tabID = e.currentTarget.id;
  startmenu.querySelectorAll(".startmenu-page").forEach(el => el.classList.remove("active"));
  tabsmenu.querySelectorAll(".tabs-shortcut").forEach(el => el.classList.remove("active"));

  document.querySelector(`.startmenu-page#${tabID}`)?.classList.add("active");
  document.querySelector(`.tabs-shortcut#${tabID}`)?.classList.add("active");
}

async function mainFunction() {
  const data = await getStartmenuSettings();
  if (!data) return;

  data.forEach(tab => {
    const startmenuPage = document.createElement("div");
    startmenuPage.id = tab.name;
    startmenuPage.classList.add("startmenu-page");
    startmenu.appendChild(startmenuPage);

    const tabbutton = document.createElement("div");
    tabbutton.classList.add("tabs-shortcut");
    tabbutton.id = tab.name;
    tabbutton.innerText = tab.name;
    tabsmenu.appendChild(tabbutton);

    tabbutton.addEventListener("click", openPage);

    tab.content.forEach(item => {
      const startmenuItem = document.createElement("div");
      startmenuItem.classList.add("startmenu-shortcut");

      const img = document.createElement("img");
      img.src = item.icon;
      startmenuItem.appendChild(img);

      // Use dataset to store the path or a click event
      startmenuItem.dataset.path = item.path;
      startmenuItem.addEventListener("click", () => {
        // Do something with item.path
        console.log("Open:", item.path);
      });

      startmenuPage.appendChild(startmenuItem);
    });
  });
}

document.addEventListener("DOMContentLoaded", mainFunction);
