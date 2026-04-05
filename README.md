# Casa Roldós

Hamburguesas Artesanales — Santiago de Cuba

Sitio web oficial de Casa Roldós. Catálogo digital interactivo con sistema de pedidos por WhatsApp.

## Sitio Web

[roldos.tiendly.lat](https://roldos.tiendly.lat)

## Descripción

Página web estática para restaurante y cafetería ubicado en Santiago de Cuba, Cuba. El sitio funciona como catálogo digital donde los clientes pueden explorar el menú, agregar productos a un carrito y enviar pedidos directamente por WhatsApp.

### Funcionalidades

- Catálogo de productos con hamburguesas, sándwiches, bebidas, postres y combos
- Filtros por categoría y búsqueda en tiempo real
- Carrito de compras con contador y resumen visual
- Pedidos por WhatsApp con formato automático
- Código QR del menú para compartir
- Diseño responsivo para móvil, tablet y escritorio
- Animación de fondo con canvas geométrico
- Navegación con estilo liquid glass

## Tecnologías

- HTML5, CSS3, JavaScript vanilla
- Tailwind CSS (CDN)
- QRCode.js (CDN)
- Google Fonts: Bebas Neue + Libre Franklin

## Estructura

```
roldos/
├── index.html              # Aplicación principal
├── mockup-generator.html   # Generador de mockups para productos
├── products.json           # Catálogo de productos
├── logo.jpeg               # Logo del restaurante
├── CNAME                   # Dominio personalizado
├── .nojekyll               # Desactiva Jekyll en GitHub Pages
└── README.md               # Documentación del proyecto
```

## Despliegue Local

### Con Python

```bash
python -m http.server 8000
```

### Con Node.js

```bash
npx serve .
```

### Directamente

Abrir `index.html` en el navegador.

## Despliegue en GitHub Pages

El sitio está configurado para desplegarse en `roldos.tiendly.lat` vía GitHub Pages con dominio personalizado.

## Contacto

- WhatsApp: +53 63807214
- Ubicación: Santiago de Cuba, Cuba

## Licencia

Uso privado para Casa Roldós.
