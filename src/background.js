chrome.tabs.onUpdated.addListener(function (tabId, changeInfo) {
  if (changeInfo.status === 'complete') {
    chrome.tabs.sendMessage(tabId, { type: 'getUrlChange' });
  }
});

chrome.tabs.onActivated.addListener(function (activeInfo) {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(activeInfo.tabId, { type: 'getTabChange' });
  });
});

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
