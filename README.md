# Chipa Club

Web de [@chipaclub.es](https://www.instagram.com/chipaclub.es/): las variedades de chipa congelada y un formulario de pedido (nombre, teléfono, dirección y cantidades).

Publicada en **https://chipaclub.es**. Cada push a `main` la vuelve a publicar sola (GitHub Actions → Pages).

El dominio está en Hostinger y solo apunta a GitHub Pages (en Hostinger no se sube nada). Registros DNS:

| Tipo | Nombre | Contenido |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | leb90.github.io |

Hecha con [ArtScript](https://artscript.dev). Todos los `.art` de `src/` forman un solo programa (no hacen falta imports):

| Archivo | Qué tiene |
|---|---|
| [src/config.art](src/config.art) | **Lo que se cambia seguido:** email de pedidos, variedades y precios, aviso de envíos, pasos, preguntas frecuentes (`FAQS`) |
| [src/app.art](src/app.art) | La página: las secciones en orden |
| [src/sections/](src/sections/) | Una sección por archivo: `Nav`, `Hero`, `Products`, `HowItWorks`, `Club`, `Faq`, `OrderSection` (formulario, envío y confirmación), `Footer`, `FloatingCart` |
| [src/ui/](src/ui/) | Piezas reutilizables: `SectionHead`, `Stepper`, `ProductCard`, `AddressField` (dirección con sugerencias) y `AddressMap` (mapa con el pin) |
| [src/cart.art](src/cart.art) | El carrito y el formato de precios |
| [src/address.art](src/address.art) | Búsqueda de direcciones (CartoCiudad) y teselas del mapa (IGN) |
| [src/order.art](src/order.art) | Código de pedido, texto para DM, envío por email y los límites contra pedidos repetidos |
| [src/tests.art](src/tests.art) | Tests de los flujos principales |
| [src/theme.css](src/theme.css) | Colores, tipografías y estilos |

## Activar los pedidos por email

Los pedidos llegan a **chipaclub.es@gmail.com**. El sitio es estático (GitHub Pages no tiene servidor), así que se envían con [FormSubmit](https://formsubmit.co), que es gratis y no pide cuenta.

Para cambiar el destino:

1. En [src/config.art](src/config.art), poné el email en la primera constante:
   ```
   const ORDERS_EMAIL = "chipaclub.es@gmail.com"
   ```
2. Hacé push a `main` y esperá a que se publique (un par de minutos).
3. Hacé un pedido de prueba desde la web. FormSubmit manda a ese email un mensaje **"Activate Form"**: hay que abrirlo y confirmar. Desde ahí, cada pedido llega como email con una tabla: código, productos, total, nombre, teléfono (con link directo a WhatsApp), dirección, notas y fecha.
4. Opcional: en el email de activación FormSubmit da un alias aleatorio (algo como `a1b2c3d4...`). Si lo ponés en `ORDERS_EMAIL` en lugar del email, la dirección no queda visible en el código de la página.

Mientras `ORDERS_EMAIL` esté vacío, o si el envío falla, el pedido no se pierde: se copia al portapapeles y se le pide al cliente que lo mande por DM de Instagram.

## Dirección de entrega

La dirección se elige de una lista de sugerencias, no se escribe libre (lo libre, como piso y puerta, va en Notas):

- Las sugerencias salen de [CartoCiudad](https://www.cartociudad.es), el buscador oficial de direcciones de España (Instituto Geográfico Nacional): gratis, sin clave y con número de portal. Solo se ofrecen portales dentro de la zona de envío; sin número, la web lo pide.
- Al elegir, aparece el mapa del IGN con el pin en la dirección. El pedido llega con la dirección normalizada, el código postal y un link a Google Maps con la ubicación exacta.
- La zona de envío está en [src/config.art](src/config.art): `DELIVERY_CITY` y `DELIVERY_MUNI_CODES` (46250 es València ciudad). Para sumar otro municipio, agregá el `muniCode` que devuelve CartoCiudad para una dirección de ahí.
- Si el buscador no responde, se puede escribir la dirección a mano y el pedido llega marcado "sin verificar", para no perder ventas.

## Pedidos repetidos o en masa

La web frena, desde el navegador de quien pide:

- enviar a los pocos segundos de abrir la página (lo que hace un bot), con un aviso para volver a tocar Enviar;
- el mismo pedido (mismo teléfono y mismas cantidades) dentro de 30 minutos;
- más de 3 pedidos por hora;
- datos fuera de medida (nombre de más de 80 caracteres, teléfono fuera de 9–15 cifras, dirección de más de 200, notas de más de 500).

Los números están arriba de [src/order.art](src/order.art). Esto corta el abuso hecho desde la página, pero no a alguien que mande pedidos directo a FormSubmit con un programa: para eso, el primer paso es usar el alias de FormSubmit en `ORDERS_EMAIL` (así el Gmail no aparece en el código), y si igual llegan pedidos basura, poner una verificación anti-bots (Cloudflare Turnstile) con un pequeño servidor que la compruebe antes de reenviar el email.

## Cambiar productos o precios

Están en la lista `PRODUCTS` de [src/config.art](src/config.art). Para agregar una variedad, sumá una entrada y poné su foto en [public/photos/](public/photos/).

El aviso de envíos ("Envíos solo en Valencia") es la constante `SHIPPING` del mismo archivo: aparece en la franja de arriba, la portada, las variedades, el formulario y el pie.

## Fotos

La página usa las versiones `.webp` (más livianas, del tamaño en que se muestran); los `.jpg` y `.png` son los originales, y el póster de chorizo es la imagen al compartir el link.

| Archivo | Qué es |
|---|---|
| `chipa-chorizo-colorado.jpg` | Póster de la chipa de chorizo colorado (imagen para compartir el link) |
| `chipa-chorizo-colorado-detalle.jpg` | Recorte del póster, sin texto (foto del producto) |
| `chipa-queso-azul-nuez.jpg` | Póster de la chipa de queso azul y nuez |
| `chipa-queso-azul-nuez-detalle.jpg` | Recorte del póster, sin texto (foto del producto) |
| `chipa-longaniza-pascua.jpg` | Póster de la chipa de longaniza de Pascua |
| `chipa-longaniza-pascua-detalle.jpg` | Recorte del póster, sin texto (foto del producto) |
| `chipa-clasica-mano.jpg` | Chipa clásica en la mano (portada y producto) |
| `chipa-frases.jpg` | Las 4 ilustraciones "Chipa es amor y tradición" (recortadas de la captura) |
| `chipa-frases-captura.jpg` | La captura original del móvil |
| `carta-variedades.jpg` | La carta con precios |
| `chipa-tenes-un-problema.jpg` | Post "¿Tenés un problema?" |
| `logo-chipa-club.png` | Logo con fondo transparente (sacado de la carta) |

El favicon (`public/favicon.png`) y el ícono para iPhone (`public/apple-touch-icon.png`) son el logo sobre fondo crema.

## Desarrollo

```
npm install
npm run dev          # http://localhost:3000
npx art check        # tipos y errores
npx art test         # tests de los flujos principales
npm run build:pages  # lo mismo que publica GitHub Actions, en dist/
```
