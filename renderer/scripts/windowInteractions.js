const mainWindowArea = document.querySelector("#windowArea");

mainWindowArea.querySelectorAll(".window").forEach(window => {
  const titleBar = window.querySelector(".titlebar");
  if (titleBar) {
    attachMoveBehaviour(window, titleBar);
  }
});

function attachMoveBehaviour(el, dragHandle) {
  let isMoving = false;
  let startX, startY;
  let startLeft, startTop;

  function onMouseDown(e) {
    e.preventDefault();

    startX = e.clientX;
    startY = e.clientY;

    const rect = el.getBoundingClientRect();
    startLeft = rect.left + window.scrollX;
    startTop = rect.top + window.scrollY;

    isMoving = true;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  function onMouseMove(e) {
    if (!isMoving) return;

    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    el.style.left = startLeft + dx + 'px';
    el.style.pointerEvents = 'none';
    el.style.top = startTop + dy + 'px';
  }

  function onMouseUp(e) {
   
    el.style.pointerEvents = 'auto';
    isMoving = false;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }

  dragHandle.addEventListener('mousedown', onMouseDown);
}
