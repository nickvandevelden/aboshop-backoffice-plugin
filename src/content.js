chrome.extension.onMessage.addListener(function (request) {
  if (request.type === 'getUrlChange') {
    let url = window.location.href;

    function getOfferFormulaId() {
      return sessionStorage.getItem('offerFormulaId');
    }

    function getOrderId() {
      return sessionStorage.getItem('orderId');
    }

    console.log(`url is: ${url}`);
    console.log(`offerFormulaId is: ${getOfferFormulaId()}`);
    console.log(`orderId is: ${getOrderId()}`);

    let environment;

    if (url.includes('://testaboshop')) {
      environment = 'test';
      drawRectangle('green');
    } else if (url.includes('://previewaboshop')) {
      environment = 'preview';
      drawRectangle('orange');
    } else if (url.includes('://aboshop')) {
      environment = '';
      drawRectangle('red');
    }

    let msg = {
      currentUrl: url,
      currentOfferFomulaId: getOfferFormulaId(),
      currentOrderId: getOrderId(),
      currentEnvironment: environment,
    };
    chrome.runtime.sendMessage(msg);
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
