chrome.tabs.onUpdated.addListener(function (tabId, changeInfo) {
  if (changeInfo.status === 'complete') {
    chrome.tabs.sendMessage(tabId, { type: 'getUrlChange' });
  }
});

var url;
var offerFormulaId;
var orderId;
var environment;

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  url = message.currentUrl;
  offerFormulaId = message.currentOfferFomulaId;
  orderId = message.currentOrderId;
  environment = message.currentEnvironment;

  console.log(url);
  console.log(offerFormulaId);
  console.log(orderId);
});
