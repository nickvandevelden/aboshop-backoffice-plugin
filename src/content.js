chrome.extension.onMessage.addListener(function (request) {
  if (request.type === 'getUrlChange') {
    let url = window.location.href;

    function getOfferFormulaId() {
      return sessionStorage.getItem('offerFormulaId');
    }

    function getOrderId() {
      return sessionStorage.getItem('orderId');
    }

    let environment;

    if (url.includes('://testaboshop')) {
      environment = 'test';
    } else if (url.includes('://previewaboshop')) {
      environment = 'preview';
    } else if (url.includes('://aboshop')) {
      environment = '';
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
