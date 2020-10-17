const productButtonShop = document.getElementById('productButtonShop');
const orderButtonShop = document.getElementById('orderButtonShop');
const productButtonBackoffice = document.getElementById('productButtonBackoffice');
const offerButtonBackoffice = document.getElementById('offerButtonBackoffice');

function disableShopProductButton() {
  productButtonShop.disabled = true;
}

function disableShopOrderButton() {
  orderButtonShop.disabled = true;
}

function disableBackofficeProductButton() {
  productButtonBackoffice.disabled = true;
}

function disableBackofficeOfferButton() {
  offerButtonBackoffice.disabled = true;
}

document.addEventListener('DOMContentLoaded', function () {
  var background = chrome.extension.getBackgroundPage();
  var currentShopOfferFormulaId = background.shopOfferFormulaId;
  var currentShopOrderId = background.shopOrderId;
  var currentShopEnvironment = background.shopEnvironment;
  var currentBackofficeOfferFormulaId = background.backofficeOfferFormulaId;
  var currentBackofficeOfferFormulaBrand = background.backofficeOfferFormulaBrand;
  var currentBackofficeOfferId = background.backofficeOfferId;
  var currentBackofficeOfferSlug = background.backofficeOfferSlug;
  var currentBackofficeOfferBrand = background.backofficeOfferBrand;
  var currentBackofficeEnvironment = background.backofficeEnvironment;

  if (currentShopOfferFormulaId === null || typeof currentShopOfferFormulaId === 'undefined') {
    disableShopProductButton();
  }

  if (currentShopOrderId === null || typeof currentShopOrderId === 'undefined') {
    disableShopOrderButton();
  }

  if (currentBackofficeOfferFormulaId === null || typeof currentBackofficeOfferFormulaId === 'undefined') {
    disableBackofficeProductButton();
  }

  if (currentBackofficeOfferId === null || typeof currentBackofficeOfferId === 'undefined') {
    disableBackofficeOfferButton();
  }

  productButtonShop.onclick = function () {
    var win = window.open(
      `https://${currentShopEnvironment}aboshopadmin.mediahuis.be/subscriptionformula/edit/${currentShopOfferFormulaId}`,
      '_blank'
    );
    win.focus();
  };

  orderButtonShop.onclick = function () {
    var win = window.open(`https://${currentShopEnvironment}aboshopadmin.mediahuis.be/orders/edit/${currentShopOrderId}`, '_blank');
    win.focus();
  };

  function paperMapper(brand) {
    switch (brand) {
      case 'nb':
        return 'nieuwsblad';
      case 'ds':
        return 'standaard';
      case 'hbvl':
        return 'hbvl';
      case 'gva':
        return 'gva';
      case 'dl':
        return 'limburger';
      default:
        return;
    }
  }

  function countryCodeMapper() {
    if (currentBackofficeOfferFormulaBrand === 'dl' || currentBackofficeOfferBrand === 'dl') {
      return 'nl';
    } else {
      return 'be';
    }
  }

  let countryCode = countryCodeMapper();

  let offerFormulaPaper = paperMapper(currentBackofficeOfferFormulaBrand);

  productButtonBackoffice.onclick = function () {
    var win = window.open(
      `https://${currentBackofficeEnvironment}aboshop.${offerFormulaPaper}.${countryCode}/checkout?formula_id=${currentBackofficeOfferFormulaId}`,
      '_blank'
    );
    win.focus();
  };

  let offerPaper = paperMapper(currentBackofficeOfferBrand);

  offerButtonBackoffice.onclick = function () {
    var win = window.open(`https://${currentBackofficeEnvironment}aboshop.${offerPaper}.${countryCode}/${currentBackofficeOfferSlug}`, '_blank');
    win.focus();
  };
});
