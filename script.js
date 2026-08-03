'use strict';

const CHECKOUT_URL = 'https://pay.kiwify.com.br/H9Mhu8I';
const PRODUCT = {
  id: 'biblioteca-marcenaria-volume-1',
  name: 'Biblioteca da Marcenaria - Volume 1',
  value: 24.90,
  currency: 'BRL'
};

function sendEvent(name, params = {}) {
  if (typeof window.gtag === 'function') {
    window.gtag('event', name, params);
  }
}

function buildCheckoutUrl() {
  const destination = new URL(CHECKOUT_URL);
  const currentParams = new URLSearchParams(window.location.search);
  const trackingKeys = [
    'utm_source', 'utm_medium', 'utm_campaign', 'utm_content',
    'utm_term', 'utm_id', 'fbclid', 'gclid'
  ];

  trackingKeys.forEach((key) => {
    const value = currentParams.get(key);
    if (value) destination.searchParams.set(key, value);
  });

  return destination.toString();
}

function checkoutWithTracking(event) {
  event.preventDefault();
  const destination = buildCheckoutUrl();

  sendEvent('begin_checkout', {
    currency: PRODUCT.currency,
    value: PRODUCT.value,
    items: [{
      item_id: PRODUCT.id,
      item_name: PRODUCT.name,
      price: PRODUCT.value,
      quantity: 1
    }]
  });

  if (typeof window.fbq === 'function') {
    window.fbq('track', 'InitiateCheckout', {
      content_ids: [PRODUCT.id],
      content_name: PRODUCT.name,
      content_type: 'product',
      value: PRODUCT.value,
      currency: PRODUCT.currency
    });
  }

  window.setTimeout(() => {
    window.location.assign(destination);
  }, 250);
}

document.querySelectorAll('[data-checkout]').forEach((button) => {
  button.href = CHECKOUT_URL;
  button.addEventListener('click', checkoutWithTracking);
});

const trackedScrolls = new Set();
window.addEventListener('scroll', () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  if (scrollable <= 0) return;
  const percent = Math.round((window.scrollY / scrollable) * 100);

  [50, 90].forEach((mark) => {
    if (percent >= mark && !trackedScrolls.has(mark)) {
      trackedScrolls.add(mark);
      sendEvent(`scroll_${mark}`, { percent_scrolled: mark });
      if (typeof window.fbq === 'function') {
        window.fbq('trackCustom', `Scroll${mark}`, { percent_scrolled: mark });
      }
    }
  });
}, { passive: true });

const offerSection = document.querySelector('#oferta');
if (offerSection && 'IntersectionObserver' in window) {
  let offerTracked = false;
  const observer = new IntersectionObserver((entries) => {
    if (!offerTracked && entries.some((entry) => entry.isIntersecting)) {
      offerTracked = true;
      sendEvent('view_offer', {
        item_id: PRODUCT.id,
        value: PRODUCT.value,
        currency: PRODUCT.currency
      });
      if (typeof window.fbq === 'function') {
        window.fbq('trackCustom', 'ViewOffer', {
          content_ids: [PRODUCT.id],
          value: PRODUCT.value,
          currency: PRODUCT.currency
        });
      }
      observer.disconnect();
    }
  }, { threshold: 0.35 });
  observer.observe(offerSection);
}

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();
