const mainWindowArea = document.querySelector("#windowArea");

export function initializeWindow(windowElement) {
  const titleBar = windowElement.querySelector(".titlebar");
  const minimizeButton = windowElement.querySelector(".windowMinimizeButton");
  const closeButton = windowElement.querySelector(".windowCloseButton");


  if (minimizeButton) {
    minimizeButton.addEventListener("click", () => {
      windowElement.classList.toggle("minimized");
    });
  }

  if (closeButton) {
    closeButton.addEventListener("click", () => {
      windowElement.classList.add("closing");
      setTimeout(() => {
        windowElement.remove();
      }, 200);
    });
  }

  if (titleBar) {
    attachMoveBehaviour(windowElement, titleBar);

    const webview = windowElement.querySelector("webview");
    if (webview) {
      webview.addEventListener("dom-ready", () => {
        setTimeout(() => {
          try {
            const shadowRoot = webview.shadowRoot;
            if (shadowRoot) {
              const iframe = shadowRoot.querySelector('iframe');
              if (iframe) {
                iframe.style.height = '100%';
              }
            }
          } catch (err) {
            // Handle error (optional)
          }
        }, 100);
      });
    }
  }
}




export function attachMoveBehaviour(el, dragHandle) {
  let isMoving = false;
  let isResizing = false;
  let startX, startY;
  let startLeft, startTop;
  let startWidth, startHeight;

  function onMouseDown(e) {
  const isLeftClick = e.button === 0;
  const isRightClick = e.button === 2;

  // Move only when left click + modifier, resize on right click
  if (!isLeftClick && !isRightClick) return;

  e.preventDefault();

    startX = e.clientX;
    startY = e.clientY;

    const rect = el.getBoundingClientRect();
    startLeft = rect.left + window.scrollX;
    startTop = rect.top + window.scrollY;
    startWidth = rect.width;
    startHeight = rect.height;

    isMoving = isLeftClick;
    isResizing = isRightClick;

    el.style.transition = "none";

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  function onMouseMove(e) {
    if (isMoving) {
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      el.style.left = startLeft + dx + 'px';
      el.style.top = startTop + dy + 'px';
      el.style.pointerEvents = 'none';
    }

    if (isResizing) {
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      el.style.width = `${startWidth + dx}px`;
      el.style.height = `${startHeight + dy}px`;
      el.style.pointerEvents = 'none';
    }
  }

  function onMouseUp() {
    el.style.pointerEvents = 'auto';
    el.style.transition = "";
    isMoving = false;
    isResizing = false;

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }

  dragHandle.addEventListener('mousedown', onMouseDown);

  // Prevent default context menu on right-click
  dragHandle.addEventListener('contextmenu', e => e.preventDefault());
}
