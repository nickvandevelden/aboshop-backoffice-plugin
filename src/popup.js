const productButton = document.getElementById('productButton');
const orderButton = document.getElementById('orderButton');

function disableProductButton() {
  productButton.disabled = true;
}

function disableOrderButton() {
  orderButton.disabled = true;
}

document.addEventListener('DOMContentLoaded', function () {
  var background = chrome.extension.getBackgroundPage();
  var currentOfferFormulaId = background.offerFormulaId;
  var currentOrderId = background.orderId;
  var currentEnvironment = background.environment;

  if (currentOfferFormulaId === null) {
    disableProductButton();
  }

  if (currentOrderId === null) {
    disableOrderButton();
  }

  productButton.onclick = function () {
    var win = window.open(
      `https://${currentEnvironment}aboshopadmin.mediahuis.be/subscriptionformula/edit/${currentOfferFormulaId}`,
      '_blank'
    );
    win.focus();
  };

  orderButton.onclick = function () {
    var win = window.open(
      `https://${currentEnvironment}aboshopadmin.mediahuis.be/order/edit/${currentOrderId}`,
      '_blank'
    );
    win.focus();
  };
});
