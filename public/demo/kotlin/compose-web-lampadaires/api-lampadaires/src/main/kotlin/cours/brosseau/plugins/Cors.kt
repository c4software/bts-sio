package cours.brosseau.plugins

import io.ktor.http.HttpHeaders
import io.ktor.server.application.Application
import io.ktor.server.application.install
import io.ktor.server.plugins.cors.routing.CORS

fun Application.installCors() {
    install(CORS) {
        // Les pages web autorisées à appeler l'API : la page Vue.js (port 5500)…
        allowHost("localhost:5500")
        allowHost("127.0.0.1:5500")
        // … et l'application Compose pour le web (port 8081)
        allowHost("localhost:8081")
        allowHost("127.0.0.1:8081")
        // Le navigateur doit pouvoir envoyer du JSON (POST)
        allowHeader(HttpHeaders.ContentType)
    }
}
