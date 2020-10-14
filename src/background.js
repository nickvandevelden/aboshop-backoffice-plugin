chrome.tabs.onUpdated.addListener(function (tabId, changeInfo) {
  if (changeInfo.status === 'complete') {
    chrome.tabs.sendMessage(tabId, { type: 'getUrlChange' });
  }
});

var shopUrl;
var shopOfferFormulaId;
var shopOrderId;
var shopEnvironment;

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  shopUrl = message.currentShopUrl;
  shopOfferFormulaId = message.currentShopOfferFomulaId;
  shopOrderId = message.currentShopOrderId;
  shopEnvironment = message.currentShopEnvironment;
});
