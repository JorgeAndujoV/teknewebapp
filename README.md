# Tekne · sitio web

Sitio estático (HTML, CSS y JavaScript sin dependencias ni paso de compilación) listo para GitHub Pages.

## Estructura

```
index.html              Inicio: hero, problema, qué es Tekne, iniciativas, fundadores, apoyo, contacto
como-apoyar.html        Dona, voluntariado, alianzas, comparte
iniciativas/
  agora.html
  pharos.html
  sporos.html
  _plantilla.html       Plantilla para nuevas iniciativas (no indexada por buscadores)
assets/
  css/styles.css        Todos los estilos; la paleta está en :root al inicio
  js/main.js            Menú móvil y animaciones al hacer scroll
  img/logo.svg          Logo vectorial (favicon)
  img/logo-tekne.png    Logo original
```

## Ver el sitio en tu computadora

Abre `index.html` en el navegador, o levanta un servidor local:

```bash
python3 -m http.server 8000
# http://localhost:8000
```

## Publicar en GitHub Pages

1. En GitHub: **Settings → Pages**.
2. En *Build and deployment*, elige **Deploy from a branch**, rama `main`, carpeta `/ (root)`.
3. El sitio queda en `https://jorgeandujov.github.io/teknewebapp/`.

Todas las rutas son relativas, así que el sitio funciona igual en esa dirección y en un dominio propio.

### Dominio propio (cuando lo compren)

1. En **Settings → Pages → Custom domain**, escribe el dominio (ej. `tekne.org`). GitHub crea el archivo `CNAME`.
2. En el proveedor del dominio, crea los registros DNS que indica la
   [guía de GitHub](https://docs.github.com/es/pages/configuring-a-custom-domain-for-your-github-pages-site).
3. Activa **Enforce HTTPS**.

## Agregar una iniciativa nueva

1. Copia `iniciativas/_plantilla.html` como `iniciativas/<nombre>.html`.
2. Reemplaza `NOMBRE` por el nombre de la iniciativa y llena los textos.
   Borra la línea `<meta name="robots" content="noindex">`.
3. Elige su color en `<body data-accent="...">`: `azure`, `navy`, `green`, `sand` o `clay`.
4. Borra las secciones marcadas como OPCIONAL que no uses.
5. En `index.html`, sección **Iniciativas**, copia una tarjeta `<a class="initiative-card">` y
   cambia `data-accent`, `href`, nombre, lema y descripción.

No hace falta tocar el menú ni el pie de página: ambos enlazan a la sección de iniciativas.

## Reemplazar placeholders

- **Fotos:** guarda la imagen en `assets/img/` y cambia
  `<div class="ph ph--photo">Foto</div>` por `<img class="photo" src="..." alt="Nombre">`
  (en páginas dentro de `iniciativas/`, la ruta empieza con `../assets/img/`).
- **Logo de una iniciativa:** `<img class="page-hero-logo" src="..." alt="Logo de ...">`.
- **Logos de colaboradores:** `<li><img src="..." alt="Nombre"></li>` dentro de `<ul class="logos">`.

## Pendientes

Busca `pendiente` y `TODO` en el código:

- Año en que Alan Ruiz Silva se unió al proyecto (`index.html`).
- Datos bancarios o enlace de pago, y si se emiten recibos deducibles (`como-apoyar.html`).
- Enlace del formulario de voluntariado (`como-apoyar.html`); por ahora abre un correo.
- Redacción final de los tres pasos de Pharos (`iniciativas/pharos.html`).
- Colaboradores de Agora, Pharos y Sporos.
- Fotos de fundadores y líderes, y logos de cada iniciativa.

## Cambiar colores

Edita las variables al inicio de `assets/css/styles.css` (`--azure`, `--navy`, `--sand`, `--green`, `--clay`, `--paper`, `--cream`).
El logo en línea usa `currentColor`, así que toma el color del texto donde aparece.
