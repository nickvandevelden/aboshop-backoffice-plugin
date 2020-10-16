chrome.extension.onMessage.addListener(function (request) {
  if (request.type === 'getUrlChange') {
    let backofficeUrl = window.location.href;

    function getAccessToken() {
      return localStorage.getItem('access_token');
    }

    function getBackofficeOfferFormulaId() {
      if (backofficeUrl.includes('subscriptionformula/edit/')) {
        splittedBackofficeUrl = backofficeUrl.split('/');
        return splittedBackofficeUrl[splittedBackofficeUrl.length - 1];
      } else {
        return null;
      }
    }

    function getBackofficeOfferId() {
      if (backofficeUrl.includes('offers/edit/')) {
        splittedBackofficeUrl = backofficeUrl.split('/');
        return splittedBackofficeUrl[splittedBackofficeUrl.length - 1];
      } else {
        return null;
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
      await fetch(`https://${backofficeEnvironment}offerservice.mediahuis.be/api/subscriptionformulas/${getBackofficeOfferFormulaId()}`, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          let msg = {
            currentBackofficeUrl: backofficeUrl,
            currentBackofficeOfferFormulaId: getBackofficeOfferFormulaId(),
            currentBackofficeOfferFormulaBrand: data.brand,
            currentBackofficeEnvironment: backofficeEnvironment,
          };
          chrome.runtime.sendMessage(msg);
        });
    }

    async function getBackofficeOfferData() {
      await fetch(`https://${backofficeEnvironment}offerservice.mediahuis.be/api/offers/${getBackofficeOfferId()}`)
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
        });
    }

    if (backofficeUrl.includes('aboshopadmin.mediahuis.be/subscriptionformula/edit')) {
      getBackofficeOfferFormulaData();
    } else if (backofficeUrl.includes('aboshopadmin.mediahuis.be/offers/edit')) {
      getBackofficeOfferData();
    } else {
      return;
    }
  }
});
