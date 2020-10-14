chrome.extension.onMessage.addListener(function (request) {
  if (request.type === 'getUrlChange') {
    let shopUrl = window.location.href;

    function getOfferFormulaId() {
      return sessionStorage.getItem('offerFormulaId');
    }

    function getOrderId() {
      return sessionStorage.getItem('orderId');
    }

    let shopEnvironment;

    if (shopUrl.includes('://testaboshop')) {
      shopEnvironment = 'test';
    } else if (shopUrl.includes('://previewaboshop')) {
      shopEnvironment = 'preview';
    } else if (shopUrl.includes('://aboshop')) {
      shopEnvironment = '';
    }

    let msg = {
      currentShopUrl: shopUrl,
      currentShopOfferFomulaId: getOfferFormulaId(),
      currentShopOrderId: getOrderId(),
      currentShopEnvironment: shopEnvironment,
    };
    chrome.runtime.sendMessage(msg);
  }
});
