# Chipa Club

Web de [@chipaclub.es](https://www.instagram.com/chipaclub.es/): las variedades de chipa congelada y un formulario de pedido (nombre, teléfono, dirección y cantidades).

Publicada en **https://leb90.github.io/chipaclub/**. Cada push a `main` la vuelve a publicar sola (GitHub Actions → Pages).

Hecha con [ArtScript](https://artscript.dev). Todos los `.art` de `src/` forman un solo programa (no hacen falta imports):

| Archivo | Qué tiene |
|---|---|
| [src/config.art](src/config.art) | **Lo que se cambia seguido:** email de pedidos, variedades y precios, aviso de envíos, pasos |
| [src/app.art](src/app.art) | La página: las secciones en orden |
| [src/sections/](src/sections/) | Una sección por archivo: `Nav`, `Hero`, `Products`, `HowItWorks`, `Club`, `OrderSection` (formulario, envío y confirmación), `Footer`, `FloatingCart` |
| [src/ui/](src/ui/) | Piezas reutilizables: `SectionHead`, `Stepper`, `ProductCard` |
| [src/cart.art](src/cart.art) | El carrito y el formato de precios |
| [src/order.art](src/order.art) | Código de pedido, texto para DM y envío por email |
| [src/tests.art](src/tests.art) | Tests de los flujos principales |
| [src/theme.css](src/theme.css) | Colores, tipografías y estilos |

Los archivos se cargan en orden alfabético, así que el estado compartido no puede usar al arrancar datos de un archivo que va después (por eso el carrito empieza vacío).

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

## Cambiar productos o precios

Están en la lista `PRODUCTS` de [src/config.art](src/config.art). Para agregar una variedad, sumá una entrada y poné su foto en [public/photos/](public/photos/).

El aviso de envíos ("Envíos solo en Valencia") es la constante `SHIPPING` del mismo archivo: aparece en la franja de arriba, la portada, las variedades, el formulario y el pie.

## Fotos

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
