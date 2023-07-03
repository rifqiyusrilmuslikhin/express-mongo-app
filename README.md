<!-- Menambahkan stylesheet Swagger UI -->
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/3.50.0/swagger-ui.css">

<!-- Menambahkan elemen HTML untuk menampilkan Swagger UI -->
<div id="swagger-ui"></div>

<!-- Menambahkan skrip JavaScript untuk menginisialisasi Swagger UI -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/3.50.0/swagger-ui-bundle.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/3.50.0/swagger-ui-standalone-preset.js"></script>
<script>
  const ui = SwaggerUIBundle({
    url: "./openapi.json", // Ganti dengan path ke openapi.json Anda
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "BaseLayout"
  })
</script>
