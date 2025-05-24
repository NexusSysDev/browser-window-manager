const mainWindowArea = document.querySelector("#windowArea");
import { attachMoveBehaviour, initializeWindow } from "./windowInteractions.js";

export function openWindow(name, icon, path) {
    const windowDiv = document.createElement("div");
    windowDiv.classList.add("window");

    const titleBar = document.createElement("div");
    titleBar.classList.add("titlebar");

    const rightTitlebar = document.createElement("div");
    const leftTitlebar = document.createElement("div");

    rightTitlebar.classList.add("titlebar-right");
    leftTitlebar.classList.add("titlebar-left");

    const logo = document.createElement("img");
    logo.classList.add("windowIcon");
    logo.src = icon;

    const title = document.createElement("p");
    title.classList.add("windowTittle");
    title.innerText = name;

    leftTitlebar.appendChild(logo);
    leftTitlebar.appendChild(title);

    const webview = document.createElement("webview");
    webview.src = path;
    windowDiv.appendChild(webview);

    const minimizeButton = document.createElement("div");
    minimizeButton.classList.add("windowMinizeButton");
    minimizeButton.innerText = "_";

    const maximizeButton = document.createElement("div");
    maximizeButton.classList.add("windowMaximizeButton");
    maximizeButton.innerText = "□";

    const closeButton = document.createElement("div");
    closeButton.classList.add("windowCloseButton");
    closeButton.innerText = "X";

    rightTitlebar.appendChild(minimizeButton);
    rightTitlebar.appendChild(maximizeButton);
    rightTitlebar.appendChild(closeButton);

    titleBar.appendChild(leftTitlebar);
    titleBar.appendChild(rightTitlebar);
    windowDiv.appendChild(titleBar);
    windowDiv.appendChild(webview);

    mainWindowArea.appendChild(windowDiv);
    attachMoveBehaviour(windowDiv, titleBar);
    initializeWindow(windowDiv);
}
