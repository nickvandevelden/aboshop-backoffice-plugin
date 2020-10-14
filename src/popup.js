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
  var currentOfferFormulaId = background.offerFormulaId;
  var currentOrderId = background.orderId;
  var currentEnvironment = background.environment;

  if (currentOfferFormulaId === null || typeof currentOfferFormulaId === 'undefined') {
    disableProductButton();
  }

  if (currentOrderId === null || typeof currentOrderId === 'undefined') {
    disableOrderButton();
  }

  productButtonShop.onclick = function () {
    var win = window.open(
      `https://${currentEnvironment}aboshopadmin.mediahuis.be/subscriptionformula/edit/${currentOfferFormulaId}`,
      '_blank'
    );
    win.focus();
  };

  orderButtonShop.onclick = function () {
    var win = window.open(
      `https://${currentEnvironment}aboshopadmin.mediahuis.be/orders/edit/${currentOrderId}`,
      '_blank'
    );
    win.focus();
  };
});
