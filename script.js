// Cole aqui o link real do checkout antes de publicar.
const CHECKOUT_URL = "https://pay.kiwify.com.br/4n4MIx9";

document.querySelectorAll('.js-checkout').forEach((button) => {
  button.addEventListener('click', (event) => {
    if (CHECKOUT_URL.includes('SEU-CHECKOUT-AQUI')) {
      event.preventDefault();
      alert('Configure o link do checkout no arquivo script.js antes de publicar.');
      return;
    }
    button.href = CHECKOUT_URL;
  });
});

document.getElementById('year').textContent = new Date().getFullYear();
