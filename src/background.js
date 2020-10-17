chrome.tabs.onUpdated.addListener(function (tabId, changeInfo) {
  if (changeInfo.status === 'complete') {
    chrome.tabs.sendMessage(tabId, { type: 'getUrlChange' });
  }
});

var shopUrl;
var shopOfferFormulaId;
var shopOrderId;
var shopEnvironment;
var backofficeUrl;
var backofficeOfferFormulaId;
var backofficeOfferId;
var backofficeEnvironment;

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  shopUrl = message.currentShopUrl;
  shopOfferFormulaId = message.currentShopOfferFomulaId;
  shopOrderId = message.currentShopOrderId;
  shopEnvironment = message.currentShopEnvironment;
  backofficeUrl = message.currentBackofficeUrl;
  backofficeOfferFormulaId = message.currentBackofficeOfferFormulaId;
  backofficeOfferFormulaBrand = message.currentBackofficeOfferFormulaBrand;
  backofficeOfferId = message.currentBackofficeOfferId;
  backofficeOfferSlug = message.currentBackofficeOfferSlug;
  backofficeOfferBrand = message.currentBackofficeOfferBrand;
  backofficeEnvironment = message.currentBackofficeEnvironment;
});
