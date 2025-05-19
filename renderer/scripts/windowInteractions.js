const mainWindowArea = document.querySelector("#windowArea");

mainWindowArea.querySelectorAll(".window").forEach(window => {
  const titleBar = window.querySelector(".titlebar");
  if (titleBar) {
    attachMoveBehaviour(window, titleBar);
    window.querySelector("webview").insertCSS(`
      html, body {
      width: 100% !important;
      height: 100% !important;
      margin: 0 !important;
      padding: 0 !important;
      overflow: hidden !important;
    }
    iframe {
      width: 100% !important;
      height: 100% !important;
      border: none !important;
    }
      `)
  }
});

function attachMoveBehaviour(el, dragHandle) {
  let isMoving = false;
  let isResizing = false;
  let startX, startY;
  let startLeft, startTop;
  let startWidth, startHeight;

  function onMouseDown(e) {
    e.preventDefault();
    
    startX = e.clientX;
    startY = e.clientY;

    const rect = el.getBoundingClientRect();
    startLeft = rect.left + window.scrollX;
    startTop = rect.top + window.scrollY;
    startWidth = rect.width;
    startHeight = rect.height;

    // Detect if Ctrl is pressed for resizing
    isMoving = !e.ctrlKey;
    isResizing = e.ctrlKey;

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

      // Apply the new dimensions
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
}
