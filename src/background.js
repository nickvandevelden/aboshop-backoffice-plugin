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

chrome.runtime.onMessage.addListener(function (message) {
  shopUrl = message.currentShopUrl;
  shopOfferId = message.currentShopOfferId;
  shopOfferFormulaId = message.currentShopOfferFomulaId;
  shopOrderId = message.currentShopOrderId;
  shopEnvironment = message.currentShopEnvironment;
  backofficeUrl = message.currentBackofficeUrl;
  backofficeOfferFormulaId = message.currentBackofficeOfferFormulaId;
  backofficeOfferFormulaPaperCode = message.currentBackofficeOfferFormulaPaperCode;
  backofficeOfferId = message.currentBackofficeOfferId;
  backofficeOfferSlug = message.currentBackofficeOfferSlug;
  backofficeOfferPaperCode = message.currentBackofficeOfferPaperCode;
  backofficeEnvironment = message.currentBackofficeEnvironment;
});
