chrome.extension.onMessage.addListener(function (request) {
  if (request.type === 'getUrlChange') {
    let url = window.location.href;

    if (url.includes('://testaboshop')) {
      drawRectangle('green');
    } else if (url.includes('://previewaboshop')) {
      drawRectangle('orange');
    } else if (url.includes('://aboshop')) {
      drawRectangle('red');
    }
  }
});

function drawRectangle(color) {
  const x = 0;
  const y = 0;
  const width = 3840;
  const height = 10;

  const rectangle = document.createElement('canvas');
  rectangle.style.width = '100%';
  rectangle.style.height = '100%';
  rectangle.width = window.innerWidth;
  rectangle.height = window.innerHeight;
  rectangle.style.position = 'fixed';
  rectangle.style.left = 0;
  rectangle.style.top = 0;
  rectangle.style.zIndex = 100000;
  rectangle.style.pointerEvents = 'none';
  document.body.appendChild(rectangle);
  const context = rectangle.getContext('2d');
  context.rect(x, y, width, height);
  context.fillStyle = color;
  context.fill();
}
