import { Slideshow } from "./slideshow";

export const updateBodyTitleHeight = function (root = document) {
  root
    .querySelectorAll(".en__component--advrow > .body-title")
    .forEach((bodyTitle) => {
      const advancedRow = bodyTitle.parentElement;
      if (!advancedRow) return;

      advancedRow.style.setProperty(
        "--body-title-height",
        `${bodyTitle.getBoundingClientRect().height}px`
      );
    });
};

export const customScript = function (App) {
  console.log("ENGrid client scripts are executing");
  // Add your client scripts here
  document.querySelectorAll(".engrid-slideshow").forEach((slideshow) => {
    new Slideshow(slideshow);
  });
  const giveBySelectWrapper = document.querySelector(".give-by-select-wrapper");
  if (giveBySelectWrapper) {
    // Find apple-pay class, set data-src to the apple pay image, and add the class "apple-pay-image"
    const applePayElement = giveBySelectWrapper.querySelector("img.apple-pay");
    if (applePayElement) {
      applePayElement.setAttribute(
        "src",
        "https://bd6ca9cefa6fb6e0adf1-c2f9aa1adb9f60a775f60074e4c86031.ssl.cf5.rackcdn.com/20014/payment-type-applepay.svg?v=1794326459000"
      );
    }
    const gPayElement = giveBySelectWrapper.querySelector("img.google-pay");
    if (gPayElement) {
      gPayElement.setAttribute(
        "src",
        "https://bd6ca9cefa6fb6e0adf1-c2f9aa1adb9f60a775f60074e4c86031.ssl.cf5.rackcdn.com/20014/payment-type-gpay.svg?v=1794326459000"
      );
    }
    const payPalWhiteElement =
      giveBySelectWrapper.querySelectorAll("img.paypal-w");
    for (const element of payPalWhiteElement) {
      element.setAttribute(
        "src",
        "https://bd6ca9cefa6fb6e0adf1-c2f9aa1adb9f60a775f60074e4c86031.ssl.cf5.rackcdn.com/20014/payment-type-paypal-w.svg?v=1794326459000"
      );
    }
    const payPalBlackElement =
      giveBySelectWrapper.querySelectorAll("img.paypal-b");
    for (const element of payPalBlackElement) {
      element.setAttribute(
        "src",
        "https://bd6ca9cefa6fb6e0adf1-c2f9aa1adb9f60a775f60074e4c86031.ssl.cf5.rackcdn.com/20014/payment-type-paypal-b.svg?v=1794326459000"
      );
    }
    const dafPayElement = giveBySelectWrapper.querySelector("img.daf");
    if (dafPayElement) {
      dafPayElement.setAttribute(
        "src",
        "https://bd6ca9cefa6fb6e0adf1-c2f9aa1adb9f60a775f60074e4c86031.ssl.cf5.rackcdn.com/20014/payment-type-daf.svg?v=1794326459000"
      );
    }
    const bankElement = giveBySelectWrapper.querySelector("img.bank");
    if (bankElement) {
      bankElement.setAttribute(
        "src",
        "https://aaf18515da0e792f78-c27fdabe952dfc357fe25ebf5c8897ee.ssl.cf5.rackcdn.com/2184/payment-type-bank.svg?v=1794326459000"
      );
    }
    const venmoElement = giveBySelectWrapper.querySelector("img.venmo");
    if (venmoElement) {
      venmoElement.setAttribute(
        "src",
        "https://bd6ca9cefa6fb6e0adf1-c2f9aa1adb9f60a775f60074e4c86031.ssl.cf5.rackcdn.com/20014/payment-type-venmo.svg?v=1794326459000"
      );
    }
    const cardsElement = giveBySelectWrapper.querySelector(
      "img.credit-card-logos"
    );
    if (cardsElement) {
      cardsElement.setAttribute(
        "src",
        "https://bd6ca9cefa6fb6e0adf1-c2f9aa1adb9f60a775f60074e4c86031.ssl.cf5.rackcdn.com/20014/payment-type-cards.png?v=1794326459000"
      );
    }
  }

  // Mutation Observer for 4 seconds to check if "#ot-sdk-btn" appears, if it does, remove it's style attributes
  const otButton = document.querySelector("#ot-sdk-btn");
  const footer = document.getElementById("bottom-footer");
  if (otButton) {
    otButton.removeAttribute("style");
  } else if (footer) {
    const observer = new MutationObserver((mutationsList, observer) => {
      for (const mutation of mutationsList) {
        if (mutation.type === "childList") {
          const otSdkBtn = document.querySelector("#ot-sdk-btn");
          if (otSdkBtn) {
            otSdkBtn.removeAttribute("style");
            observer.disconnect();
            break;
          }
        }
      }
    });

    observer.observe(footer, {
      childList: true,
      subtree: true,
    });

    setTimeout(() => {
      observer.disconnect();
    }, 4000);
  }

  if (App.isThankYouPage()) {
    App.setBodyData("thank-you", "true");
  }

  App.setBodyData("client-js-loading", "finished");
};
