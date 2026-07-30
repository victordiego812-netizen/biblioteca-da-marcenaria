# Landing Page - Biblioteca da Marcenaria

Landing page estática pronta para GitHub + Vercel.

## Publicação

1. Crie um repositório no GitHub.
2. Envie todos os arquivos desta pasta para a raiz do repositório.
3. Na Vercel, clique em **Add New > Project**.
4. Importe o repositório.
5. Framework Preset: **Other**.
6. Não é necessário comando de build.
7. Clique em **Deploy**.

## Antes de publicar

Abra `script.js` e substitua:

```js
const CHECKOUT_URL = "https://pay.kiwify.com.br/4n4MIx9";
```

pelo link real do checkout.

## Preço

A oferta está configurada visualmente como:

- De R$ 95,80
- Por R$ 47,90

Edite o bloco `price-card` no `index.html` caso o preço final seja diferente.

## Pixel Meta

Insira o código base do Pixel antes do fechamento de `</head>` no `index.html`.
O clique de checkout pode ser rastreado adicionando um evento no `script.js`.
