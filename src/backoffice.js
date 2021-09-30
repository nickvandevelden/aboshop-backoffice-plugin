'use strict';

chrome.extension.onMessage.addListener(function (request) {
  if (request.type === 'getUrlChange' || request.type === 'getTabChange') {
    console.log('executing backoffice script...');

    const backofficeUrl = window.location.href.toLowerCase();

    const getAccessToken = () => {
      return localStorage.getItem(
        Object.keys(localStorage).filter((s) => s.includes('.accessToken'))
      );
    };

    const getBackofficeOfferFormulaId = () => {
      if (
        backofficeUrl.includes('aboshopadmin.limburger.nl/subscriptionformula/edit') ||
        backofficeUrl.includes('aboshopadmin.mediahuis.be/subscriptionformula/edit')
      ) {
        const splittedBackofficeUrl = backofficeUrl.split('/');
        return splittedBackofficeUrl[splittedBackofficeUrl.length - 1];
      } else {
        return;
      }
    };

    const getBackofficeOfferId = () => {
      if (
        backofficeUrl.includes('aboshopadmin.limburger.nl/offers/edit') ||
        backofficeUrl.includes('aboshopadmin.mediahuis.be/offers/edit')
      ) {
        const splittedBackofficeUrl = backofficeUrl.split('/');
        return splittedBackofficeUrl[splittedBackofficeUrl.length - 1];
      } else {
        return;
      }
    };

    const backofficeEnvironment = () => {
      if (backofficeUrl.includes('://testaboshopadmin')) {
        return 'test';
      } else if (backofficeUrl.includes('://previewaboshopadmin')) {
        return 'preview';
      } else if (backofficeUrl.includes('://aboshopadmin')) {
        return '';
      }
    };

    async function getBackofficeOfferFormulaData() {
      await fetch(
        backofficeUrl.includes('limburger')
          ? `https://${backofficeEnvironment()}offerservice.limburger.nl/api/subscriptionformulas/${getBackofficeOfferFormulaId()}`
          : `https://${backofficeEnvironment()}offerservice.mediahuis.be/api/subscriptionformulas/${getBackofficeOfferFormulaId()}`,
        {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          const msg = {
            currentBackofficeUrl: backofficeUrl,
            currentBackofficeOfferFormulaId: getBackofficeOfferFormulaId(),
            currentBackofficeOfferFormulaPaperCode: data.brand,
            currentBackofficeEnvironment: backofficeEnvironment(),
          };
          chrome.runtime.sendMessage(msg);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }

    async function getBackofficeOfferData() {
      await fetch(
        backofficeUrl.includes('limburger')
          ? `https://${backofficeEnvironment()}offerservice.limburger.nl/api/offers/${getBackofficeOfferId()}`
          : `https://${backofficeEnvironment()}offerservice.mediahuis.be/api/offers/${getBackofficeOfferId()}`
      )
        .then((response) => response.json())
        .then((data) => {
          const msg = {
            currentBackofficeUrl: backofficeUrl,
            currentBackofficeOfferId: getBackofficeOfferId(),
            currentBackofficeOfferSlug: data.slug,
            currentBackofficeOfferPaperCode: data.brand,
            currentBackofficeEnvironment: backofficeEnvironment(),
          };
          chrome.runtime.sendMessage(msg);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }

    if (
      backofficeUrl.includes('aboshopadmin.limburger.nl/subscriptionformula/edit') ||
      backofficeUrl.includes('aboshopadmin.mediahuis.be/subscriptionformula/edit')
    ) {
      getBackofficeOfferFormulaData();
    } else if (
      backofficeUrl.includes('aboshopadmin.limburger.nl/offers/edit') ||
      backofficeUrl.includes('aboshopadmin.mediahuis.be/offers/edit')
    ) {
      getBackofficeOfferData();
    } else {
      const msg = {};
      chrome.runtime.sendMessage(msg);
    }
  }
});
