chrome.extension.onMessage.addListener(function (request) {
  if (request.type === 'getUrlChange') {
    let backofficeUrl = window.location.href;

    function getAccessToken() {
      return localStorage.getItem('access_token');
    }

    function getBackofficeOfferFormulaId() {
      if (backofficeUrl.includes('subscriptionformula/edit/')) {
        backofficeUrl = backofficeUrl.split('/');
        return backofficeUrl[backofficeUrl.length - 1];
      } else {
        return null;
      }
    }

    function getBackofficeOfferId() {
      if (backofficeUrl.includes('offers/edit/')) {
        backofficeUrl = backofficeUrl.split('/');
        return backofficeUrl[backofficeUrl.length - 1];
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

    async function getBackofficeOfferFormulaBrand() {
      if (
        backofficeUrl.includes(
          'aboshopadmin.mediahuis.be/subscriptionformula/edit'
        )
      ) {
        await fetch(
          `https://${backofficeEnvironment}offerservice.mediahuis.be/api/subscriptionformulas/${getBackofficeOfferFormulaId()}`,
          {
            headers: {
              Authorization: `Bearer ${getAccessToken()}`,
            },
          }
        )
          .then((response) => response.json())
          .then((data) => {
            console.log(data.brand);
          });
      } else {
        return;
      }
    }

    async function getBackofficeOfferBrand() {
      if (backofficeUrl.includes('aboshopadmin.mediahuis.be/offers/edit/')) {
        await fetch(
          `https://${backofficeEnvironment}offerservice.mediahuis.be/api/offers/${getBackofficeOfferId()}`
        )
          .then((response) => response.json())
          .then((data) => console.log(data.brand));
      } else {
        return;
      }
    }

    let msg = {
      currentBackofficeUrl: backofficeUrl,
      currentBackofficeOfferFomulaId: getBackofficeOfferFormulaId(),
      currentBackofficeOfferId: getBackofficeOfferId(),
      currentBackofficeEnvironment: backofficeEnvironment,
    };
    chrome.runtime.sendMessage(msg);
  }
});
