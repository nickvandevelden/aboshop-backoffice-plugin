chrome.tabs.onUpdated.addListener(function (tabId, changeInfo) {
  if (changeInfo.status === 'complete') {
    chrome.tabs.sendMessage(tabId, { type: 'getUrlChange' });
  }
});

chrome.tabs.onActivated.addListener(function (activeInfo) {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    let url = tabs[0].url;
    console.log(url);
    if (url.includes('aboshop.')) {
      chrome.tabs.executeScript(null, {
        file: 'src/shop.js',
      });
    } else if (url.includes('aboshopadmin.')) {
      chrome.tabs.executeScript(null, {
        file: 'src/backoffice.js',
      });
    } else {
      return;
    }
  });
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
