chrome.extension.onMessage.addListener(function (request) {
  if (request.type === 'getUrlChange' || request.type === 'getTabChange') {
    console.log('executing backoffice script...');

    let backofficeUrl = window.location.href.toLowerCase();

    function getAccessToken() {
      return localStorage.getItem(
        Object.keys(localStorage).filter((s) => s.includes('.accessToken'))
      );
    }

    function getBackofficeOfferFormulaId() {
      if (
        backofficeUrl.includes('aboshopadmin.limburger.nl/subscriptionformula/edit') ||
        backofficeUrl.includes('aboshopadmin.mediahuis.be/subscriptionformula/edit')
      ) {
        splittedBackofficeUrl = backofficeUrl.split('/');
        return splittedBackofficeUrl[splittedBackofficeUrl.length - 1];
      } else {
        return;
      }
    }

    function getBackofficeOfferId() {
      if (
        backofficeUrl.includes('aboshopadmin.limburger.nl/offers/edit') ||
        backofficeUrl.includes('aboshopadmin.mediahuis.be/offers/edit')
      ) {
        splittedBackofficeUrl = backofficeUrl.split('/');
        return splittedBackofficeUrl[splittedBackofficeUrl.length - 1];
      } else {
        return;
      }
    }

    let backofficeEnvironment;

    if (backofficeUrl.includes('://testaboshopadmin')) {
      backofficeEnvironment = 'test';
    } else if (backofficeUrl.includes('://previewaboshopadmin')) {
      backofficeEnvironment = 'preview';
    } else if (backofficeUrl.includes('://aboshopadmin')) {
      backofficeEnvironment = '';
    }

    async function getBackofficeOfferFormulaData() {
      await fetch(
        backofficeUrl.includes('limburger')
          ? `https://${backofficeEnvironment}offerservice.limburger.nl/api/subscriptionformulas/${getBackofficeOfferFormulaId()}`
          : `https://${backofficeEnvironment}offerservice.mediahuis.be/api/subscriptionformulas/${getBackofficeOfferFormulaId()}`,
        {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          let msg = {
            currentBackofficeUrl: backofficeUrl,
            currentBackofficeOfferFormulaId: getBackofficeOfferFormulaId(),
            currentBackofficeOfferFormulaBrand: data.brand,
            currentBackofficeEnvironment: backofficeEnvironment,
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
          ? `https://${backofficeEnvironment}offerservice.limburger.nl/api/offers/${getBackofficeOfferId()}`
          : `https://${backofficeEnvironment}offerservice.mediahuis.be/api/offers/${getBackofficeOfferId()}`
      )
        .then((response) => response.json())
        .then((data) => {
          let msg = {
            currentBackofficeUrl: backofficeUrl,
            currentBackofficeOfferId: getBackofficeOfferId(),
            currentBackofficeOfferSlug: data.slug,
            currentBackofficeOfferBrand: data.brand,
            currentBackofficeEnvironment: backofficeEnvironment,
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
      let msg = {};
      chrome.runtime.sendMessage(msg);
    }
  }
});
