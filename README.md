# Biblioteca da Marcenaria V4 Definitiva

Landing page estática, mobile-first e pronta para publicação na Vercel.

## Integrações configuradas

- Checkout Kiwify: `https://pay.kiwify.com.br/H9Mhu8I`
- Meta Pixel: `2151654785649073`
- Google Analytics 4: `G-EBJL1W7YYT`
- Valor rastreado: `R$ 24,90`

## Eventos configurados

### GA4
- `page_view`
- `view_item`
- `view_offer`
- `scroll_50`
- `scroll_90`
- `begin_checkout`

### Meta Pixel
- `PageView`
- `ViewContent`
- `ViewOffer`
- `Scroll50`
- `Scroll90`
- `InitiateCheckout`

As UTMs, `fbclid` e `gclid` são preservados ao enviar o visitante para o checkout. O evento `Purchase` deve ser configurado na Kiwify ou na página de confirmação, não na landing.

## Publicação na Vercel

Envie o conteúdo desta pasta para a raiz do repositório no GitHub. Na Vercel, use Framework Preset **Other**, sem Build Command e sem Output Directory.
