const mainWindowArea = document.querySelector("#windowArea");

mainWindowArea.querySelectorAll(".window").forEach(window => {
  const titleBar = window.querySelector(".titlebar");
  const maximizeButton = window.querySelector(".windowMaximizeButton");
  const minimizeButton = window.querySelector(".windowMinizeButton");
  const closeButton = window.querySelector(".windowCloseButton");

  maximizeButton.addEventListener("onclick", () => {
    window.classList.toggle("maximized");
  });

  minimizeButton.addEventListener("onclick", () => {
    window.classList.toggle("minimized");
  });

  closeButton.addEventListener("onclick", () => {
    window.classList.add("closing");
    setTimeout(() => {
      window.remove();
    }, 200);
  });

  if (titleBar) {
    attachMoveBehaviour(window, titleBar); // Ensure this is defined

    const webview = window.querySelector("webview");
    if (webview) {
      // Wait for the webview to finish loading before injecting CSS
      webview.addEventListener("dom-ready", () => {
        // Inject styles into the content of the webview
        webview.insertCSS(`
          html, body {
            height: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            overflow: hidden !important;
          }

          iframe {
            width: 100% !important;
            height: 100% !important;
            border: none !important;
            display: block;
          }
        `);

        // Wait a short moment to allow shadow DOM to attach
        setTimeout(() => {
          try {
            const shadowRoot = webview.shadowRoot;
            if (shadowRoot) {
              const iframe = shadowRoot.querySelector('iframe');
              if (iframe) {
                iframe.style.height = '100%';
                console.log('✅ Styled internal iframe inside webview');
              } else {
                console.warn('⚠️ No iframe found in webview shadowRoot');
              }
            } else {
              console.warn('⚠️ No shadowRoot found on webview');
            }
          } catch (err) {
            console.error('❌ Error accessing webview shadow DOM:', err);
          }
        }, 100);
      });
    }
  }
});



function attachMoveBehaviour(el, dragHandle) {
  let isMoving = false;
  let isResizing = false;
  let startX, startY;
  let startLeft, startTop;
  let startWidth, startHeight;

  function onMouseDown(e) {
    // 0 = Left click for move (with modifier), 2 = Right click for resize
    const isLeftClick = e.button === 0;
    const isRightClick = e.button === 2;

    const isMainModifierPressed = e.ctrlKey; // Replace with custom logic if needed

    // Move only when left click + modifier, resize on right click
    if (!(isLeftClick && isMainModifierPressed) && !isRightClick) return;

    e.preventDefault();

    startX = e.clientX;
    startY = e.clientY;

    const rect = el.getBoundingClientRect();
    startLeft = rect.left + window.scrollX;
    startTop = rect.top + window.scrollY;
    startWidth = rect.width;
    startHeight = rect.height;

    isMoving = isLeftClick && isMainModifierPressed;
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
