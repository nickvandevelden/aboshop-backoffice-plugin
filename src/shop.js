'use strict';

chrome.extension.onMessage.addListener(function (request) {
  if (request.type === 'getUrlChange' || request.type === 'getTabChange') {
    console.log('executing shop script...');

    const shopUrl = window.location.href.toLowerCase();

    const shopEnvironment = () => {
      if (shopUrl.includes('://testaboshop')) {
        return 'test';
      } else if (shopUrl.includes('://previewaboshop')) {
        return 'preview';
      } else if (shopUrl.includes('://aboshop')) {
        return '';
      }
    };

    const getPaperCode = () => {
      if (shopUrl.includes('nieuwsblad')) {
        return 'nb';
      } else if (shopUrl.includes('standaard')) {
        return 'ds';
      } else if (shopUrl.includes('gva')) {
        return 'gva';
      } else if (shopUrl.includes('hbvl')) {
        return 'hbvl';
      } else if (shopUrl.includes('limburger')) {
        return 'dl';
      } else {
        new Error('shopUrl is undefined');
      }
    };

    const pathName = window.location.pathname;

    const slug = !pathName || pathName.includes('checkout') || pathName === '/' ? null : pathName;

    const paperCode = getPaperCode();

    async function getAllShopData() {
      await fetch(
        shopUrl.includes('limburger')
          ? `https://${shopEnvironment()}offerservice.limburger.nl/api/offers${slug}?brand=${paperCode}`
          : `https://${shopEnvironment()}offerservice.mediahuis.be/api/offers${slug}?brand=${paperCode}`
      )
        .then((response) => response.json())
        .then((data) => {
          const msg = {
            currentShopUrl: shopUrl,
            currentShopOfferId: data.id,
            currentShopOfferFomulaId: getShopOfferFormulaId(),
            currentShopOrderId: getShopOrderId(),
            currentShopEnvironment: shopEnvironment(),
          };
          chrome.runtime.sendMessage(msg);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }

    const getShopOfferFormulaId = () => {
      return sessionStorage.getItem('offerFormulaId');
    };

    const getShopOrderId = () => {
      return sessionStorage.getItem('orderId');
    };

    if (!slug) {
      const msg = {
        currentShopUrl: shopUrl,
        currentShopOfferFomulaId: getShopOfferFormulaId(),
        currentShopOrderId: getShopOrderId(),
        currentShopEnvironment: shopEnvironment(),
      };
      chrome.runtime.sendMessage(msg);
    } else {
      getAllShopData();
    }
  }
});
