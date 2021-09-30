'use strict';

const offerButtonShop = document.getElementById('offerButtonShop');
const productButtonShop = document.getElementById('productButtonShop');
const orderButtonShop = document.getElementById('orderButtonShop');
const productButtonBackoffice = document.getElementById('productButtonBackoffice');
const offerButtonBackoffice = document.getElementById('offerButtonBackoffice');

const disableShopOfferButton = () => {
  offerButtonShop.disabled = true;
};

const disableShopProductButton = () => {
  productButtonShop.disabled = true;
};

const disableShopOrderButton = () => {
  orderButtonShop.disabled = true;
};

const disableBackofficeProductButton = () => {
  productButtonBackoffice.disabled = true;
};

const disableBackofficeOfferButton = () => {
  offerButtonBackoffice.disabled = true;
};

document.addEventListener('DOMContentLoaded', function () {
  const background = chrome.extension.getBackgroundPage();
  const currentShopUrl = background.shopUrl;
  const currentShopOfferId = background.shopOfferId;
  const currentShopOfferFormulaId = background.shopOfferFormulaId;
  const currentShopOrderId = background.shopOrderId;
  const currentShopEnvironment = background.shopEnvironment;
  const currentBackofficeOfferFormulaId = background.backofficeOfferFormulaId;
  const currentBackofficeOfferFormulaPaperCode = background.backofficeOfferFormulaPaperCode;
  const currentBackofficeOfferId = background.backofficeOfferId;
  const currentBackofficeOfferSlug = background.backofficeOfferSlug;
  const currentBackofficeOfferPaperCode = background.backofficeOfferPaperCode;
  const currentBackofficeEnvironment = background.backofficeEnvironment;

  if (!currentShopOfferId) {
    disableShopOfferButton();
  }

  if (!currentShopOfferFormulaId) {
    disableShopProductButton();
  }

  if (!currentShopOrderId) {
    disableShopOrderButton();
  }

  if (!currentBackofficeOfferFormulaId) {
    disableBackofficeProductButton();
  }

  if (!currentBackofficeOfferId) {
    disableBackofficeOfferButton();
  }

  offerButtonShop.addEventListener('click', function () {
    const win = window.open(
      currentShopUrl.includes('limburger')
        ? `https://${currentShopEnvironment}aboshopadmin.limburger.nl/offers/edit/${currentShopOfferId}`
        : `https://${currentShopEnvironment}aboshopadmin.mediahuis.be/offers/edit/${currentShopOfferId}`,
      '_blank'
    );
    win.focus();
  });

  productButtonShop.addEventListener('click', function () {
    const win = window.open(
      currentShopUrl.includes('limburger')
        ? `https://${currentShopEnvironment}aboshopadmin.limburger.nl/subscriptionformula/edit/${currentShopOfferFormulaId}`
        : `https://${currentShopEnvironment}aboshopadmin.mediahuis.be/subscriptionformula/edit/${currentShopOfferFormulaId}`,
      '_blank'
    );
    win.focus();
  });

  orderButtonShop.addEventListener('click', function () {
    const win = window.open(
      currentShopUrl.includes('limburger')
        ? `https://${currentShopEnvironment}aboshopadmin.limburger.nl/orders/edit/${currentShopOrderId}`
        : `https://${currentShopEnvironment}aboshopadmin.mediahuis.be/orders/edit/${currentShopOrderId}`,
      '_blank'
    );
    win.focus();
  });

  const offerFormulaTenant = getTenant(currentBackofficeOfferFormulaPaperCode);
  const offerTenant = getTenant(currentBackofficeOfferPaperCode);

  const offerFormulaCountryCode = getCountryCode(currentBackofficeOfferFormulaPaperCode);
  const offerCountryCode = getCountryCode(currentBackofficeOfferPaperCode);

  productButtonBackoffice.addEventListener('click', function () {
    const win = window.open(
      `https://${currentBackofficeEnvironment}aboshop.${offerFormulaTenant}.${offerFormulaCountryCode}/checkout?formula_id=${currentBackofficeOfferFormulaId}`,
      '_blank'
    );
    win.focus();
  });

  offerButtonBackoffice.addEventListener('click', function () {
    const win = window.open(
      `https://${currentBackofficeEnvironment}aboshop.${offerTenant}.${offerCountryCode}/${currentBackofficeOfferSlug}`,
      '_blank'
    );
    win.focus();
  });
});

function getTenant(paperCode) {
  switch (paperCode) {
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
      new Error('paperCode is undefined');
  }
}

function getCountryCode(paperCode) {
  switch (paperCode) {
    case 'dl':
      return 'nl';
    default:
      return 'be';
  }
}
