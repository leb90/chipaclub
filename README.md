# Chipa Club

Web de [@chipaclub.es](https://www.instagram.com/chipaclub.es/): las variedades de chipa congelada y un formulario de pedido (nombre, teléfono, dirección y cantidades).

Publicada en **https://leb90.github.io/chipaclub/**. Cada push a `main` la vuelve a publicar sola (GitHub Actions → Pages).

Hecha con [ArtScript](https://artscript.dev). Todo el sitio está en [src/app.art](src/app.art) y los estilos en [src/theme.css](src/theme.css).

## Activar los pedidos por email

El sitio es estático (GitHub Pages no tiene servidor), así que los pedidos se envían por email con [FormSubmit](https://formsubmit.co), que es gratis y no pide cuenta.

1. En [src/app.art](src/app.art), poné el email en la primera constante:
   ```
   const ORDERS_EMAIL = "pedidos@chipaclub.es"
   ```
2. Hacé push a `main` y esperá a que se publique (un par de minutos).
3. Hacé un pedido de prueba desde la web. FormSubmit manda a ese email un mensaje **"Activate Form"**: hay que abrirlo y confirmar. Desde ahí, cada pedido llega como email con una tabla: código, productos, total, nombre, teléfono (con link directo a WhatsApp), dirección, notas y fecha.
4. Opcional: en el email de activación FormSubmit da un alias aleatorio (algo como `a1b2c3d4...`). Si lo ponés en `ORDERS_EMAIL` en lugar del email, la dirección no queda visible en el código de la página.

Mientras `ORDERS_EMAIL` esté vacío, o si el envío falla, el pedido no se pierde: se copia al portapapeles y se le pide al cliente que lo mande por DM de Instagram.

## Cambiar productos o precios

Están en la lista `PRODUCTS` de [src/app.art](src/app.art). Para agregar una variedad, sumá una entrada y poné su foto en [public/photos/](public/photos/). Queso azul y nuez y Longaniza de Pascua usan por ahora ilustraciones ([public/illustrations/](public/illustrations/)); cuando tengan foto, cambiá el `photo` de esas entradas.

## Fotos

| Archivo | Qué es |
|---|---|
| `chipa-chorizo-colorado.jpg` | Póster de la chipa de chorizo colorado (imagen para compartir el link) |
| `chipa-chorizo-colorado-detalle.jpg` | Recorte del póster, sin texto (foto del producto) |
| `chipa-clasica-mano.jpg` | Chipa clásica en la mano (portada y producto) |
| `chipa-frases.jpg` | Las 4 ilustraciones "Chipa es amor y tradición" (recortadas de la captura) |
| `chipa-frases-captura.jpg` | La captura original del móvil |
| `carta-variedades.jpg` | La carta con precios |
| `chipa-tenes-un-problema.jpg` | Post "¿Tenés un problema?" |
| `logo-chipa-club.png` | Logo con fondo transparente (sacado de la carta) |

## Desarrollo

```
npm install
npm run dev          # http://localhost:3000
npx art check        # tipos y errores
npx art test         # tests de los flujos principales
npm run build:pages  # lo mismo que publica GitHub Actions, en dist/
```
