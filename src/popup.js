const productButtonShop = document.getElementById('productButtonShop');
const orderButtonShop = document.getElementById('orderButtonShop');
const productButtonBackoffice = document.getElementById('productButtonBackoffice');
const offerButtonBackoffice = document.getElementById('offerButtonBackoffice');

function disableProductButton() {
  productButtonShop.disabled = true;
}

function disableOrderButton() {
  orderButtonShop.disabled = true;
}

document.addEventListener('DOMContentLoaded', function () {
  var background = chrome.extension.getBackgroundPage();
  var currentShopOfferFormulaId = background.shopOfferFormulaId;
  var currentShopOrderId = background.shopOrderId;
  var currentShopEnvironment = background.shopEnvironment;

  if (currentShopOfferFormulaId === null || typeof currentShopOfferFormulaId === 'undefined') {
    disableProductButton();
  }

  if (currentShopOrderId === null || typeof currentShopOrderId === 'undefined') {
    disableOrderButton();
  }

  productButtonShop.onclick = function () {
    var win = window.open(
      `https://${currentShopEnvironment}aboshopadmin.mediahuis.be/subscriptionformula/edit/${currentShopOfferFormulaId}`,
      '_blank'
    );
    win.focus();
  };

  orderButtonShop.onclick = function () {
    var win = window.open(
      `https://${currentShopEnvironment}aboshopadmin.mediahuis.be/orders/edit/${currentShopOrderId}`,
      '_blank'
    );
    win.focus();
  };
});
