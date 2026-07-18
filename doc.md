# API de entradas del blog HAIC

## Crear una entrada

```http
POST /api/admin/posts
Content-Type: application/json
Cookie: better-auth.session_token=<SESIÓN_LOCAL>
```

El endpoint requiere un usuario autenticado y activo con rol `editor`, `admin` o `superadmin`. La cookie la establece Better Auth al iniciar sesión y no debe copiarse a documentación, repositorios o logs.

### Cuerpo JSON

```json
{
  "title": "Clasificación de imágenes con TensorFlow",
  "slug": "clasificador-imagenes-tensorflow",
  "excerpt": "Proyecto introductorio para comprender cómo una red neuronal aprende a clasificar imágenes.",
  "content": "En este proyecto exploramos el flujo completo de deep learning: preparación de datos, definición de una red neuronal, entrenamiento y evaluación.\n\nComo referencia de código utilizamos TensorFlow Model Garden, un repositorio público con implementaciones y buenas prácticas mantenidas por la comunidad de TensorFlow.\n\nLa sesión complementaria presenta visualmente qué son las neuronas, las capas, los pesos y las activaciones antes de llevar estos conceptos al código.",
  "category": "Deep Learning",
  "status": "published",
  "requiredAccessLevel": 1,
  "githubUrl": "https://github.com/tensorflow/models",
  "youtubeUrl": "https://www.youtube.com/watch?v=aircAruvnKk"
  ,"coverImageUrl": "/projects/clasificacion-tensorflow-poster-v2-1200.avif"
  ,"showOnHome": true
}
```

### Ejemplo con `curl`

Inicia sesión en `http://localhost:3000` y sustituye el marcador por una cookie local válida. No guardes su valor en archivos.

```bash
curl --request POST 'http://localhost:3000/api/admin/posts' \
  --header 'Content-Type: application/json' \
  --header 'Cookie: better-auth.session_token=<SESIÓN_LOCAL>' \
  --data '{
    "title": "Clasificación de imágenes con TensorFlow",
    "slug": "clasificador-imagenes-tensorflow",
    "excerpt": "Proyecto introductorio para comprender cómo una red neuronal aprende a clasificar imágenes.",
    "content": "Preparación de datos, definición de la red, entrenamiento y evaluación.",
    "category": "Deep Learning",
    "status": "published",
    "requiredAccessLevel": 1,
    "githubUrl": "https://github.com/tensorflow/models",
    "youtubeUrl": "https://www.youtube.com/watch?v=aircAruvnKk"
  }'
```

También puede ejecutarse desde la consola del navegador con la sesión actual, sin manipular la cookie:

```js
const response = await fetch("/api/admin/posts", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    title: "Clasificación de imágenes con TensorFlow",
    slug: "clasificador-imagenes-tensorflow",
    excerpt: "Proyecto introductorio para comprender cómo una red neuronal aprende a clasificar imágenes.",
    content: "Preparación de datos, definición de la red, entrenamiento y evaluación.",
    category: "Deep Learning",
    status: "published",
    requiredAccessLevel: 1,
    githubUrl: "https://github.com/tensorflow/models",
    youtubeUrl: "https://www.youtube.com/watch?v=aircAruvnKk"
    ,coverImageUrl: "/projects/clasificacion-tensorflow-poster-v2-1200.avif"
    ,showOnHome: true
  })
});

console.log(response.status, await response.json());
```

### Respuesta correcta

Código `201 Created`:

```json
{
  "post": {
    "id": "<UUID>",
    "title": "Clasificación de imágenes con TensorFlow",
    "slug": "clasificador-imagenes-tensorflow",
    "status": "published",
    "requiredAccessLevel": 1
  }
}
```

El objeto real incluye también el contenido, URLs, autor y fechas.

### Normalización aplicada por el servidor

- `title` es obligatorio y se limita a 180 caracteres.
- `slug` se normaliza a minúsculas, sin acentos y con guiones; si se omite, se deriva del título.
- Sólo `published` publica inmediatamente; cualquier otro valor crea un borrador.
- `requiredAccessLevel` se limita al rango de 0 a 100 y su valor predeterminado es 1.
- El servidor toma `authorId` de la sesión; nunca del cuerpo enviado.
- `showOnHome` acepta `true` desde JSON o `"on"` desde el formulario administrativo.
- Una entrada sólo aparece en HOME cuando está publicada y `showOnHome` es verdadero.
- `youtubeUrl` es obligatorio y debe apuntar a un video de YouTube mediante una URL HTTPS compatible (`watch`, `youtu.be`, `embed`, `shorts` o `live`).
- El detalle convierte el enlace validado a `youtube-nocookie.com/embed/<ID>`; nunca usa una URL arbitraria como `src` del iframe.
- `coverImageUrl` es obligatorio. Acepta rutas de la biblioteca `/projects/` o una URL HTTPS que termine en JPG, PNG, WebP o AVIF.
- La creación genera el evento `post.create` en `audit_logs`.

### Errores esperados

| Código | Situación | Respuesta |
|---|---|---|
| `400` | Falta el título | `{ "error": "El título es obligatorio." }` |
| `400` | Falta el video o la URL de YouTube no es válida | `{ "error": "Agrega una URL válida de YouTube para la clase." }` |
| `403` | Sin sesión, usuario inactivo o rol insuficiente | `{ "error": "Sin permiso." }` |
| `500` | Conflicto de slug u otro error no controlado | Respuesta de error del servidor |

## Recursos usados en la entrada de ejemplo

- Repositorio: [TensorFlow Model Garden](https://github.com/tensorflow/models), proyecto público con modelos y ejemplos de TensorFlow.
- Video: [But what is a neural network? — 3Blue1Brown](https://www.youtube.com/watch?v=aircAruvnKk), introducción visual a redes neuronales y deep learning.

Estos enlaces son referencias educativas externas; HAIC no reclama autoría sobre ellos.
